const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  image: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  schedule: {
    day: { type: String, required: true },
    time: { type: String, required: true },
  },
  instructor: { type: String, required: true },
  section: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }] // Add reference to posts
});

module.exports = mongoose.model("Course", courseSchema);
