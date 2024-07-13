const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let DUMMY_POSTS = [
  {
    postId: "1",
    courseId: "c1",
    userId: "u1",
    code: "csc 101",
    date: "2022-01-01",
    author: "Author 1",
    header: "Header 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam nulla porttitor. In nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Congue quisque egestas diam in arcu. Sem nulla pharetra diam sit amet nisl. Non blandit massa enim nec dui nunc. Nibh venenatis cras sed felis eget velit aliquet. ",
    typePost: "Announcement"
  },
  {
    postId: "2",
    courseId: "c2",
    userId: "u2",
    code: "csc 101",
    date: "2022-02-01",
    author: "Author 2",
    header: "Header 2",
    content: "Malesuada proin libero nunc consequat interdum varius. Feugiat vivamus at augue eget arcu dictum varius. Id volutpat lacus laoreet non. Enim sed faucibus turpis in eu mi. Dignissim cras tincidunt lobortis feugiat vivamus at. Id consectetur purus ut faucibus pulvinar elementum integer. Arcu vitae elementum curabitur vitae nunc sed velit. Lectus urna duis convallis convallis tellus id interdum. ",
    typePost: "Assignment"
  },
  {
    postId: "5",
    courseId: "c2",
    userId: "u4",
    code: "csc 101",
    date: "2022-02-01",
    author: "Author 2",
    header: "Header 2",
    content: "Malesuada proin libero nunc consequat interdum varius. Feugiat vivamus at augue eget arcu dictum varius. Id volutpat lacus laoreet non. Enim sed faucibus turpis in eu mi. Dignissim cras tincidunt lobortis feugiat vivamus at. Id consectetur purus ut faucibus pulvinar elementum integer. Arcu vitae elementum curabitur vitae nunc sed velit. Lectus urna duis convallis convallis tellus id interdum. ",
    typePost: "Assignment"
  },
  {
    postId: "3",
    courseId: "c3",
    userId: "u3",
    code: "web 102",
    date: "2022-03-01",
    author: "Author 3",
    header: "Header 3",
    content: "Magna sit amet purus gravida quis blandit turpis. Ac turpis egestas sed tempus. Viverra mauris in aliquam sem fringilla ut morbi tincidunt. Integer quis auctor elit sed vulputate mi sit amet mauris. Luctus venenatis lectus magna fringilla urna.",
    typePost: "Exam"
  },
];

const getPostById = (req, res, next) => {
  const pid = req.params.pid;
  const post = DUMMY_POSTS.find((p) => p.postId === pid);

  if (!post) {
    throw new HttpError("Post with id " + pid + " not found.", 404);
  }

  res.json(post);
};

const getPostsByCourseId = (req, res, next) => {
  const cid = req.params.cid;
  const posts = DUMMY_POSTS.filter((p) => p.courseId === cid);

  if (posts.length === 0) {
    throw new HttpError("Posts of course with id " + cid + " not found.", 404);
  }

  res.json(posts);
};

const createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { courseId, userId, code, date, author, header, content, typePost } = req.body;

  const createdPost = {
    postId: uuidv4(),
    courseId,
    userId,
    code,
    date,
    author,
    header,
    content,
    typePost,
  };

  DUMMY_POSTS.push(createdPost);

  res.status(201).json({ post: createdPost });
};

const updatePost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { pid } = req.params;
  const { header, content, typePost } = req.body;

  const postIndex = DUMMY_POSTS.findIndex((p) => p.postId === pid);
  if (postIndex === -1) {
    return next(new HttpError("Could not find a post for the provided id.", 404));
  }

  const updatedPost = {
    ...DUMMY_POSTS[postIndex],
    header,
    content,
    typePost
  };

  DUMMY_POSTS[postIndex] = updatedPost;

  res.status(200).json({ post: updatedPost });
};

const deletePost = (req, res, next) => {
  const { pid } = req.params;
  DUMMY_POSTS = DUMMY_POSTS.filter((p) => p.postId !== pid);

  res.status(200).json({ message: "Post deleted." });
};

exports.getPostById = getPostById;
exports.getPostsByCourseId = getPostsByCourseId;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
