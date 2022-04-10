const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
const ejs = require('ejs');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const mongosession = require('connect-mongodb-session')(session)
const {secretKey} = require('./api/middlewares/config')
require('dotenv').config();

const PORT = process.env.PORT || 3000
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
  resave : false,
  saveUninitialized : false,
  store : store
}))

// set templating Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// routes
const authRoute = require('./api/routes/auth.routes')


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));


app.get('/', (req, res) => {
  res.render('index')
})
app.use('/', authRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500 );
  res.render('error', {
    status : err.status || 500,
    message : err.message
  });

});


const start = async () => {
  try {
    const db = await connectDB(url);
    if(db) console.log('connect to db')
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();