const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const User = require('../models/user-model');
const { signupValidation, loginValidation } = require('../validators/user-validator');

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { email, password, role, name, idNumber } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ $or: [{ email }, { idNumber }] });
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }

  if (existingUser) {
    return next(new HttpError('User exists already, please login instead.', 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError('Could not create user, please try again.', 500));
  }

  const newUser = new User({
    email,
    password: hashedPassword,
    role,
    name,
    idNumber
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError('Signing up failed, please try again later.', 500));
  }

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

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email, idNumber });
  } catch (err) {
    return next(new HttpError('Logging in failed, please try again later.', 500));
  }

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

const getUserById = async (req, res, next) => {
  const uid = req.params.uid;
  let user;

  try {
    user = await User.findById(uid);
  } catch (err) {
    return next(new HttpError('Fetching user failed, please try again later.', 500));
  }

  if (!user) {
    return next(new HttpError('User not found.', 404));
  }

  res.json(user.toObject({ getters: true }));
};

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    return next(new HttpError('Fetching users failed, please try again later.', 500));
  }

  res.json({ users: users.map(user => user.toObject({ getters: true })) });
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
