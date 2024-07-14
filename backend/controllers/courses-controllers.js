const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Course = require("../models/course-model");
const User = require("../models/user-model");

const getCourseById = async (req, res, next) => {
  const cid = req.params.cid;
  let course;

  try {
    course = await Course.findById(cid).populate('userId').populate('posts'); // Populate user and posts
  } catch (err) {
    const error = new HttpError("Fetching course failed, please try again.", 500);
    return next(error);
  }

  if (!course) {
    const error = new HttpError("Could not find a course for the provided id.", 404);
    return next(error);
  }

  res.json({ course: course.toObject({ getters: true }) });
};

const getCoursesByUserId = async (req, res, next) => {
  const uid = req.params.uid;
  let userWithCourses;

  try {
    userWithCourses = await User.findById(uid).populate('courses');
  } catch (err) {
    const error = new HttpError("Fetching courses failed, please try again.", 500);
    return next(error);
  }

  if (!userWithCourses || userWithCourses.courses.length === 0) {
    const error = new HttpError("Could not find courses for the provided user id.", 404);
    return next(error);
  }

  res.json({ courses: userWithCourses.courses.map(course => course.toObject({ getters: true })) });
};

const createCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { userId, image, code, name, schedule, instructor, section } = req.body;

  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError("Creating course failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  const createdCourse = new Course({
    userId,
    image,
    code,
    name,
    schedule,
    instructor: user.name,
    section,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdCourse.save({ session: sess });
    user.courses.push(createdCourse);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating course failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ course: createdCourse });
};

const updateCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { cid } = req.params;
  const { image, code, name, schedule, instructor, section } = req.body;
  let course;

  try {
    course = await Course.findById(cid);
  } catch (err) {
    const error = new HttpError("Fetching course failed, please try again.", 500);
    return next(error);
  }

  if (!course) {
    const error = new HttpError("Could not find a course for the provided id.", 404);
    return next(error);
  }

  course.image = image;
  course.code = code;
  course.name = name;
  course.schedule = schedule;
  course.instructor = instructor;
  course.section = section;

  try {
    await course.save();
  } catch (err) {
    const error = new HttpError("Updating course failed, please try again.", 500);
    return next(error);
  }

  res.status(200).json({ course: course.toObject({ getters: true }) });
};

const deleteCourse = async (req, res, next) => {
  const { cid } = req.params;

  let course;
  try {
    course = await Course.findById(cid).populate('userId').populate('posts');
  } catch (err) {
    const error = new HttpError("Fetching course failed, please try again.", 500);
    return next(error);
  }

  if (!course) {
    const error = new HttpError("Could not find a course for the provided id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await course.remove({ session: sess });
    course.userId.courses.pull(course);
    for (let post of course.posts) {
      await post.remove({ session: sess });
    }
    await course.userId.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Deleting course failed, please try again.", 500);
    return next(error);
  }

  res.status(200).json({ message: "Course deleted." });
};

exports.getCourseById = getCourseById;
exports.getCoursesByUserId = getCoursesByUserId;
exports.createCourse = createCourse;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;
