let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser')
let fileUpload = require('express-fileupload')

let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let uploadRouter = require('./routes/upload');
let albumRouter = require('./routes/album')
let aboutRouter = require('./routes/about')
let contactsRouter = require('./routes/contacts')

let isAuthorization = require("./middleware/authorization")

let app = express();

app.set('etag', false)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(fileUpload({}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Authorization
app.use(function (req, res, next) {
  let cookies = req.cookies.uuid
  let result = isAuthorization(cookies)
  res.locals = {
    isAuthor: result
  }
  global.isAuthor = result
  next()
})

app.use('/', indexRouter);
app.use('/delete-album', indexRouter);
app.use('/login', loginRouter)
app.use('/upload', uploadRouter)
app.use('/album', albumRouter)
app.use('/about', aboutRouter)
app.use('/contacts', contactsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
