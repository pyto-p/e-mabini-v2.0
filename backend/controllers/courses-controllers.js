const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let DUMMY_COURSES = [
	{
		courseId: "c1",
		userId: "u1",
		image:
			"https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=100&q=80",
		code: "CSC 101",
		name: "Introduction to Computer Science",
		schedule: {
			day: "T/TH/S",
			time: "9:00 AM - 12:00 PM",
		},
		instructor: "Dr. John Doe",
		section: "1-1",
	},
	{
		courseId: "c3",
		userId: "u1",
		image:
			"https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=100&q=80",
		code: "WEB 102",
		name: "Introduction to Artifical Intelligence",
		schedule: {
			day: "M/W/F",
			time: "1:00 PM - 5:00 PM",
		},
		instructor: "Prof. Tony Starks",
		section: "2-1",
	},
	{
		courseId: "c2",
		userId: "u2",
		image:
			"https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=100&q=80",
		code: "WEB 102",
		name: "Introduction to Web Development",
		schedule: {
			day: "M/W/F",
			time: "11:00 AM - 3:00 PM",
		},
		instructor: "Prof. Jane Doe",
		section: "1-1N",
	},
];

const getCourseById = (req, res, next) => {
  const cid = req.params.cid;
  const course = DUMMY_COURSES.find((c) => c.courseId === cid);

  if (!course) {
    throw new HttpError("Course with id " + cid + " not found.", 404);
  }

  res.json(course);
};

const getCoursesByUserId = (req, res, next) => {
  const uid = req.params.uid;
  const courses = DUMMY_COURSES.filter((c) => c.userId === uid);

  if (courses.length === 0) {
    throw new HttpError("Courses of user with id " + uid + " not found.", 404);
  }

  res.json(courses);
};

const createCourse = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { userId, image, code, name, schedule, instructor, section } = req.body;

  const createdCourse = {
    courseId: uuidv4(),
    userId,
    image,
    code,
    name,
    schedule,
    instructor,
    section,
  };

  DUMMY_COURSES.push(createdCourse);

  res.status(201).json({ course: createdCourse });
};

const updateCourse = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { cid } = req.params;
  const { image, code, name, schedule, section } = req.body;

  const courseIndex = DUMMY_COURSES.findIndex((c) => c.courseId === cid);
  if (courseIndex === -1) {
    return next(new HttpError("Could not find a course for the provided id.", 404));
  }

  const updatedCourse = {
    ...DUMMY_COURSES[courseIndex],
    image,
    code,
    name,
    schedule,
    section,
  };

  DUMMY_COURSES[courseIndex] = updatedCourse;

  res.status(200).json({ course: updatedCourse });
};

const deleteCourse = (req, res, next) => {
  const { cid } = req.params;
  DUMMY_COURSES = DUMMY_COURSES.filter((c) => c.courseId !== cid);
  res.status(200).json({ message: "Course deleted." });
};

exports.getCourseById = getCourseById;
exports.getCoursesByUserId = getCoursesByUserId;
exports.createCourse = createCourse;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;