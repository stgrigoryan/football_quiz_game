const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const path = require('path');
const ejs = require('ejs');
const routes = require('./routes/index');

const app = express();

//Define a port
const port = process.env.PORT || 8000;

//View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Serve static files
app.use(express.static(path.join(__dirname, '/public')));

//Create MongoDB connection
mongoose.connect('mongodb://localhost:27017/footballDB', {
    useNewUrlParser: true
    }
)
.then(() => {console.log('MongoDB connected')})
.catch(err => {console.log(err)});

//Define routes
app.use('/', routes);

//Start server
app.listen(port, () => {console.log(`Server started on port ${port}`)});