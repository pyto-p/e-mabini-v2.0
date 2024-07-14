const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Post = require("../models/post-model");
const Course = require("../models/course-model");
const User = require("../models/user-model");

const getPostById = async (req, res, next) => {
  const pid = req.params.pid;
  let post;

  try {
    post = await Post.findById(pid).populate('userId').populate('courseId');
  } catch (err) {
    const error = new HttpError("Fetching post failed, please try again.", 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Post with id " + pid + " not found.", 404);
    return next(error);
  }

  res.json({ post: post.toObject({ getters: true }) });
};

const getPostsByCourseId = async (req, res, next) => {
  const cid = req.params.cid;
  let posts;

  try {
    posts = await Post.find({ courseId: cid });
  } catch (err) {
    const error = new HttpError("Fetching posts failed, please try again.", 500);
    return next(error);
  }

  if (posts.length === 0) {
    const error = new HttpError("Posts of course with id " + cid + " not found.", 404);
    return next(error);
  }

  res.json({ posts: posts.map(post => post.toObject({ getters: true })) });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { userId, courseId, code, date, author, header, content, typePost } = req.body;

  let course;
  let user;

  try {
    course = await Course.findById(courseId);
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Creating post failed, please try again.", 500);
    return next(error);
  }

  if (!course || !user) {
    const error = new HttpError("Could not find course or user for provided id.", 404);
    return next(error);
  }

  const createdPost = new Post({
    userId,
    courseId,
    code,
    date,
    author: user.name,
    header,
    content,
    typePost
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPost.save({ session: sess });
    course.posts.push(createdPost);
    user.posts.push(createdPost);
    await course.save({ session: sess });
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating post failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ post: createdPost });
};

const updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { pid } = req.params;
  const { code, date, author, header, content, typePost } = req.body;
  let post;

  try {
    post = await Post.findById(pid);
  } catch (err) {
    const error = new HttpError("Fetching post failed, please try again.", 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Post with id " + pid + " not found.", 404);
    return next(error);
  }

  post.code = code;
  post.date = date;
  post.author = author;
  post.header = header;
  post.content = content;
  post.typePost = typePost;

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError("Updating post failed, please try again.", 500);
    return next(error);
  }

  res.status(200).json({ post: post.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
  const { pid } = req.params;

  let post;
  try {
    post = await Post.findById(pid).populate('userId').populate('courseId');
  } catch (err) {
    const error = new HttpError("Fetching post failed, please try again.", 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Post with id " + pid + " not found.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    post.courseId.posts.pull(post);
    post.userId.posts.pull(post);
    await post.courseId.save({ session: sess });
    await post.userId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Deleting post failed, please try again.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Post deleted." });
};

exports.getPostById = getPostById;
exports.getPostsByCourseId = getPostsByCourseId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
