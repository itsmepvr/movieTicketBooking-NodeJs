
require('./config');
var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

const port = process.env.PORT;

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
var movies = require('./routes/movies');
app.use('/', index);
app.use('/signup', signup);
app.use('/profile', profile);
app.use('/forgetpass', forgotpass);
app.use('/signin', signin);
app.use('/movies', movies);
var movieModel = require('./models/movies');

//API to post details of movie
router.post('/movies', async (req, res) => {
  try {
    let screen = new movieModel(req.body);
    await screen.save();
    res.send();
  } catch (e) {
      res.status(400).send(e);
  }
});

//API to get the show timings and avaiable seats in a given screen
router.get('/movies/:movieName/hallName', async (req, res) => {
  let seat = [];
  try {
    movieModel.findOne({movieName: req.params.movieName}, function(err, obj){
      if(!err){
        seat = obj.nested;
        for(var i=0;i<seat.length;i++){
          if(seat['hallName'] == req.params.hallName){
            res.send(`Movie: `+req.params.movieName+`
              hallName: `+req.params.hallName+`
              Show Timings: `+seat['showTimings']+`
              Available Seats: `+seat['availableSeats']+`
            `);
          }
        }
      }
    })
  } catch (e) {
      res.status(400).send(e);
  }
});

//API to reserve tickets for given seats in a given screen
router.post('/movies/:movieName/hallName/seat', async (req, res) => {
  let seat = [];
  try {
    movieModel.findOne({movieName: req.params.movieName}, function(err, obj){
      if(!err){
        seat = obj.nested;
        for(var i=0;i<seat.length;i++){
          if(seat['hallName'] == req.params.hallName){
            seat = seat['availableSeats'];
          }
        }
      }
    })
    movieModel.update({movieName: req.params.movieName}, {availableSeats: seats});
    res.send(`Movie: `+req.params.movieName+`
              hallName: `+req.params.hallName+`
              Seat No: `+req.params.seat+`
              Ticket Booked.
    `);
  } catch (e) {
      res.status(400).send(e);
  }
});

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


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};