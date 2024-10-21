var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const indexRouter = require('./routes/index');
const usersRouter  = require('./routes/users');



var app = express();
mongoose.set('runValidators', true);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open',() => {
  console.log("connect");
}).on('error',(error) => {
  console.log(error);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
const adminpaths = [
  { pathur1: '/login', routesFile: 'login' },
  { pathur2: '/register', routesFile: 'register' },
  ];


const resetPasswordPaths = [
  { path: '/changepassword', routesFile: 'changepassword' },
];


adminpaths.forEach((path) => {
  app.use('/admin' + path.pathur1, require('./routes/admin/' + path.routesFile));
  app.use('/admin' + path.pathur2, require('./routes/admin/' + path.routesFile));
  // app.use('/resetpassword' + path.pathur3, require('./routes/resetpassword/' + path.routesFile));
 });

 resetPasswordPaths.forEach(({ path, routesFile }) => {
  app.use('/admin/resetpassword' + path, require('./routes/admin/resetpassword/' + routesFile));
});

//  const resetpasswordpaths = [
//   { pathur3: '/changepassword', routesFile: 'changepassword' },
// ];

//  resetpasswordpaths.forEach((path1) => {
//     app.use('/resetpassword' + path1.pathur3, require('./routes/resetpassword/' + path1.routesFile));
//  });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
