const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const ejs = require('ejs');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const mongosession = require('connect-mongodb-session')(session)
const {secretKey} = require('./api/middlewares/config')
const { body, validationResult } = require('express-validator');
require('dotenv').config();


const app = express()

// MongoDB Config
const url = 'mongodb://127.0.0.1:27017/ProtoType'

const connectDB = async (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Storing session to mongo dataabase.
const store = new mongosession({
  uri : url,
  collection : 'mysessions',
})

app.use(session({
  secret : secretKey ,
  cookie : {maxAge : 60000},
  resave : false,
  saveUninitialized : false,
  store : store
}))

// set templating Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// routes
const authRoute = require('./api/routes/auth.routes');
const { cloudinaryConfig } = require('./api/config/cloudinaryConfig');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('*', cloudinaryConfig);


app.get('/', (req, res) => {
  res.render('index')
})
app.get('/test', (req, res)=> {
  res.json({message : 'pass!'})
})
app.use('/', authRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500 );
  console.log(err)
  res.render('error', {
    status : err.status || 500,
    message : err.message
  });

});


module.exports = {app, url, connectDB}