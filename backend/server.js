const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const coursesRoutes = require('./routes/courses-routes');
const postsRoutes = require('./routes/posts-routes');
const usersRoutes = require('./routes/users-routes'); // Add user routes
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/courses', coursesRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes); // Use user routes

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect('mongodb+srv://admin:CEaAmgkZxwGrvMzz@cluster0.mq8qb0b.mongodb.net/lms?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
