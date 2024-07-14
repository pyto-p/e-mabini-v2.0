const express = require('express');
const { check } = require('express-validator');
const coursesControllers = require('../controllers/courses-controllers');

const router = express.Router();

router.get('/:cid', coursesControllers.getCourseById);
router.get('/user/:uid', coursesControllers.getCoursesByUserId);

router.post(
  '/',
  [
    check('userId').not().isEmpty(),
    check('image').not().isEmpty(),
    check('code').not().isEmpty(),
    check('name').not().isEmpty(),
    check('schedule').not().isEmpty(),
    check('section').not().isEmpty()
  ],
  coursesControllers.createCourse
);

router.patch(
  '/:cid',
  [
    check('image').not().isEmpty(),
    check('code').not().isEmpty(),
    check('name').not().isEmpty(),
    check('schedule').not().isEmpty(),
    check('section').not().isEmpty()
  ],
  coursesControllers.updateCourse
);

router.delete('/:cid', coursesControllers.deleteCourse);

module.exports = router;
