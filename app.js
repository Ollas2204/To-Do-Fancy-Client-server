var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

require('dotenv').config();
const cors = require('cors');

var indexRouter = require('./routes/index')
var todoRouter = require('./routes/todos');
var usersRouter = require('./routes/users');

var app = express();
mongoose.connect('mongodb://Ollas2204:asd123@ds255347.mlab.com:55347/tododb', (err, response) => {
  if (err) {
    console.log(err);
  }
  console.log('connect database');
});
// MLAB
// mongoose.connect('mongodb://Xxxxxxxxx4:Xxxxxxxxx4@ds145121.mlab.com:45121/todofancy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/todos', todoRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500).json(err);
});

module.exports = app;
