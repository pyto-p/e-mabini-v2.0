const express = require("express");
const router = express.Router();

const HttpError = require("../models/http-error");
const coursesControllers = require("../controllers/courses-controllers");

router.get("/:cid", coursesControllers.getCourseById);

router.get("/user/:uid", coursesControllers.getCoursesByUserId);

router.post("/", coursesControllers.createCourse);

router.patch("/:cid", coursesControllers.updateCourse);

router.delete("/:cid", coursesControllers.deleteCourse); 

module.exports = router;
