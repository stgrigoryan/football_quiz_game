const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');


const index = require('./routes/index');
const user = require('./routes/users');


const Question = require('./models/question');
const Answer = require('./models/question');

require('./config/auth')(passport);

const app = express();

//Define a port
const port = process.env.PORT || 8000;

//Using bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Serve static files
app.use(express.static(path.join(__dirname, '/public')));

// Passport middleware
app.use(passport.initialize());

//Create MongoDB connection
mongoose.connect('mongodb://localhost:27017/footballDB', {
    useNewUrlParser: true
}
)
    .then(() => { console.log('MongoDB connected') })
    .catch(err => { console.log(err) });

//Define routes
app.use('/', index);
//app.use('/user', user);
app.use('/user', passport.authenticate('jwt', {session: false}), user);

//Start server
app.listen(port, () => { console.log(`Server started on port ${port}`) });

fs.readFile('questions.json', 'utf-8', (err, data) => { 
    if (err) {
        if (err.code === 'ENOENT') {
            console.error('File does not exist');
            return;
        } else {
            throw err;
        }
    } else {
        const obj = JSON.parse(data);
        const questions = {
            question_1: {
                content : obj.question_1.content,
                queueNumber: obj.question_1.queueNumber
            },
            question_2: {
                content : obj.question_2.content,
                queueNumber: obj.question_2.queueNumber
            },
            question_3: {
                content : obj.question_3.content,
                queueNumber: obj.question_3.queueNumber
            },
            question_4: {
                content : obj.question_4.content,
                queueNumber: obj.question_4.queueNumber
            },
            question_5: {
                content : obj.question_5.content,
                queueNumber: obj.question_5.queueNumber
            },
        };
        Question.insertMany([
            questions.question_1,
            questions.question_2,
            questions.question_3,
            questions.question_4,
            questions.question_5,
        ]).then ((doc) => {
            Answer.insertMany([
                { question: doc[0]._id, answer: obj.question_1.answer_1.answer, correct: obj.question_1.answer_1.correct },
                { question: doc[0]._id, answer: obj.question_1.answer_2.answer, correct: obj.question_1.answer_2.correct },
                { question: doc[0]._id, answer: obj.question_1.answer_3.answer, correct: obj.question_1.answer_3.correct },
                { question: doc[1]._id, answer: obj.question_2.answer_1.answer, correct: obj.question_2.answer_1.correct },
                { question: doc[1]._id, answer: obj.question_2.answer_2.answer, correct: obj.question_2.answer_2.correct },
                { question: doc[1]._id, answer: obj.question_2.answer_3.answer, correct: obj.question_2.answer_3.correct },
                { question: doc[2]._id, answer: obj.question_3.answer_1.answer, correct: obj.question_3.answer_1.correct },
                { question: doc[2]._id, answer: obj.question_3.answer_2.answer, correct: obj.question_3.answer_2.correct },
                { question: doc[2]._id, answer: obj.question_3.answer_3.answer, correct: obj.question_3.answer_3.correct },
                { question: doc[3]._id, answer: obj.question_4.answer_1.answer, correct: obj.question_4.answer_1.correct },
                { question: doc[3]._id, answer: obj.question_4.answer_2.answer, correct: obj.question_4.answer_2.correct },
                { question: doc[3]._id, answer: obj.question_4.answer_3.answer, correct: obj.question_4.answer_3.correct },
                { question: doc[4]._id, answer: obj.question_5.answer_1.answer, correct: obj.question_5.answer_1.correct },
                { question: doc[4]._id, answer: obj.question_5.answer_2.answer, correct: obj.question_5.answer_2.correct },
                { question: doc[4]._id, answer: obj.question_5.answer_3.answer, correct: obj.question_5.answer_3.correct },
            ]).then ((doc) => {
                fs.unlink('questions.json', (err) => {
                    if (err) throw err;
                    console.log('file was deleted');
                }); 
            })
        })
        .catch ( err => {console.log(err)});
    }
    
})