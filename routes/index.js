const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');

const Question = require('../models/question');
const Answer = require('../models/answer');

router.get ('/', (req, res) => {
    res.render('login');
});

router.get ('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/play', (req, res) => {
    let content;

    Question.findOne({queueNumber: 1})
    .then(doc  => {
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
    Answer.findOne({answer: answer})
    .then (doc => {
        if (doc.correct === true) {
            Question.findOne({queueNumber: ++queueNumber})
            .then(doc  => {
                content = doc.content;
                fs.readdir(`../public/images/${queueNumber}`, (err, files) => {
                    if (err) throw err;
                    images = files;
                    console.log(files);
                })
                console.log(content);
                res.json({ username: 'Shmavon',
                    content: content,
                    images: images
                });
            });
        } else {
            res.json({ username : "Argam",
                content: 'Answer is not correct',
                images: images
            });
        }
    });
});

module.exports = router;