const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
  code: { type: String, required: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  header: { type: String, required: true },
  content: { type: String, required: true },
  typePost: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);
