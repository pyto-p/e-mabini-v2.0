const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

let DUMMY_USERS = [
  {
    id: 'u1',
    idNumber: "123456789",
    email: 'student@example.com',
    password: 'password1',
    role: 'student',
    name: 'Student One'
  },
  {
    id: 'u2',
    idNumber: "987654321",
    email: 'professor@example.com',
    password: 'password2',
    role: 'professor',
    name: 'Professor One'
  }
];

const { signupValidation, loginValidation } = require('../validators/user-validator');

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { email, password, role, name, idNumber } = req.body;

  const existingUser = DUMMY_USERS.find(u => u.email === email || u.idNumber === idNumber);
  if (existingUser) {
    return next(new HttpError('User exists already, please login instead.', 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Could not create user, please try again.', 500));
  }

  const newUser = {
    id: uuidv4(),
    email,
    password: hashedPassword,
    role,
    name,
    idNumber
  };

  DUMMY_USERS.push(newUser);

  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }

  res.status(201).json({ userId: newUser.id, email: newUser.email, name: newUser.name, idNumber: newUser.idNumber, token });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { email, idNumber, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(u => u.email === email && u.idNumber === idNumber);
  if (!identifiedUser) {
    return next(new HttpError('Could not identify user, credentials seem to be wrong.', 403));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password);
  } catch (err) {
    return next(new HttpError('Could not log you in, please check your credentials and try again.', 500));
  }

  if (!isValidPassword) {
    return next(new HttpError('Invalid credentials, could not log you in.', 403));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: identifiedUser.id, email: identifiedUser.email, role: identifiedUser.role },
      'supersecret_dont_share',
      { expiresIn: '1h' }
    );
  } catch (err) {
    return next(new HttpError('Logging in failed, please try again later.', 500));
  }

  res.json({ userId: identifiedUser.id, email: identifiedUser.email, name: identifiedUser.name, idNumber: identifiedUser.idNumber, token });
};

const getUserById = (req, res, next) => {
  const uid = req.params.uid;
  const user = DUMMY_USERS.find(u => u.id === uid);

  if (!user) {
    return next(new HttpError('User not found.', 404));
  }

  res.json(user);
};

const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

exports.signup = [
  signupValidation,
  signup
];

exports.login = [
  loginValidation,
  login
];

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
