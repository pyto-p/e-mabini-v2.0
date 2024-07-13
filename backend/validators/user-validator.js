const { body } = require('express-validator');

exports.signupValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['student', 'professor']),
  body('name').notEmpty(),
  body('idNumber').isLength({ min: 9, max: 15 })
];

exports.loginValidation = [
  body('email').isEmail(),
  body('idNumber').isLength({ min: 9, max: 15 }),
  body('password').isLength({ min: 6 })
];
