const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const bcrypt = require('bcrypt');

const Question = require('../models/question');
const Answer = require('../models/answer');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
        res.send("All fields must be filled out!");
    }
    if (password !== confirmPassword) {
        res.send("Passwords must be identical!");
    }
    User.findOne({
        username: username
    })
        .then(user => {
            if (user) {
                res.send("Username is taken");
            } else {
                const newUser = new User({
                    username,
                    password
                });

                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                res.redirect('login');
                            })
                            .catch(err => (console.log(err)));
                    }));
            }
        });
});

router.post('/login', (req, res) => {
    console.log(req.body);
});

router.get('/play', (req, res) => {
    let content;

    Question.findOne({ queueNumber: 1 })
        .then(doc => {
            content = doc.content;
            console.log("ahahaha");
            res.render('play', {
                username: 'Shmavon',
                content: content
            });
        })
});

router.post('/questions', (req, res) => {
    let content;
    const answer = req.body.path;
    let queueNumber = 1;
    let images;
    Answer.findOne({ answer: answer })
        .then(doc => {
            if (doc.correct === true) {
                ++queueNumber;
                Question.findOne({ queueNumber: queueNumber })
                    .then(doc => {
                        //console.log(queueNumber);
                        content = doc.content;
                        const filePath = path.join(__dirname + `../../public/images/${queueNumber}`);
                        //queueNumber = ++doc.queueNumber;
                        fs.readdirAsync = function (dirname) {
                            return new Promise(function (resolve, reject) {
                                fs.readdir(dirname, function (err, filenames) {
                                    if (err)
                                        reject(err);
                                    else
                                        resolve(filenames);
                                });
                            });
                        };
                        fs.readdirAsync(filePath).then(filenames => {
                            images = filenames;
                            console.log(images);
                            res.json({
                                username: 'Shmavon',
                                content: content,
                                queueNumber: queueNumber,
                                images: images
                            });
                            ++queueNumber
                            console.log(queueNumber);
                        });
                    });
            } else {

                //console.log(images);
                res.json({
                    username: "Argam",
                    content: 'Answer is not correct',
                });
            }
        });
});

module.exports = router;