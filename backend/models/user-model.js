const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  idNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  role: { type: String, required: true },
  name: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Add reference to courses
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] // Add reference to posts
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
