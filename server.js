var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose.connect('mongodb://localhost:27017/bookMyShow', { useNewUrlParser: true }, (err, client)=>{
  if(!err){
    console.log('Database connected');
    client.createCollection('users');
    client.createCollection('movies');
  }else{
    console.log('Unable to connect to database');
  }
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (err, db) {
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
var signup = require('./routes/signup');
var profile = require('./routes/profile');
var forgotpass = require('./routes/forgotpass');
var signin = require('./routes/signin');
app.use('/', index);
app.use('/signup', signup);
app.use('/profile', profile);
app.use('/forgetpass', forgotpass);
app.use('/signin', signin);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});
// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});

module.exports = app;