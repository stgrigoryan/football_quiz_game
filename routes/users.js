const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Question = require('../models/question');
const Answer = require('../models/answer');
const User = require('../models/user');



router.get('/play', (req, res) => {
    let content;

    Question.findOne({ queueNumber: 1 })
        .then(doc => {
            content = doc.content;
            res.render('play', {
                username: req.user.username,
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
                        content = doc.content;
                        const filePath = path.join(__dirname + `../../public/images/${queueNumber}`);
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
                            res.json({
                                username: req.user.username,
                                content: content,
                                queueNumber: queueNumber,
                                images: images
                            });

                        });
                    });
            } else {
                res.json({
                    username: req.user.username,
                    content: 'Answer is not correct',
                });
            }
        });
});

module.exports = router;