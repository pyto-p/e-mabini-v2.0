const express = require('express');
const { check } = require('express-validator');
const postsControllers = require('../controllers/posts-controllers');

const router = express.Router();

router.get('/:pid', postsControllers.getPostById);
router.get('/course/:cid', postsControllers.getPostsByCourseId);

router.post(
  '/',
  [
    check('userId').not().isEmpty(),
    check('courseId').not().isEmpty(),
    check('code').not().isEmpty(),
    check('date').not().isEmpty(),
    check('header').not().isEmpty(),
    check('content').not().isEmpty(),
    check('typePost').not().isEmpty()
  ],
  postsControllers.createPost
);

router.patch(
  '/:pid',
  [
    check('code').not().isEmpty(),
    check('date').not().isEmpty(),
    check('header').not().isEmpty(),
    check('content').not().isEmpty(),
    check('typePost').not().isEmpty()
  ],
  postsControllers.updatePost
);

router.delete('/:pid', postsControllers.deletePost);

module.exports = router;
