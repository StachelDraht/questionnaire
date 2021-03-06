var cors = require('cors')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user.router')
const questionnaireRouter = require('./routes/questionnaire')
const questionRouter = require('./routes/question.router')
const answerRouter = require('./routes/answer.router')

var app = express();
const bodyParser = require('body-parser')

// connection to DB
let dev_db_url = 'mongodb://localhost:27017/questionnaire'
let mongoDB = process.env.MONGODB_URI || dev_db_url
mongoose.set('useCreateIndex', true)
mongoose.connect(mongoDB,{ useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection eror'))

// view engine setup
app.set('view engine', 'pug');

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter)
app.use('/questionnaire', questionnaireRouter)
app.use('/question', questionRouter);
app.use('/answer', answerRouter)

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
  //res.render('error',{error: err})
  res.json({error: err})
});

module.exports = app;
