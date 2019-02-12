const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const passportConf = require('../config/auth.js');
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
                                res.send('User saved');
                            })
                            .catch(err => (console.log(err)));
                    }));
            }
        });
});

router.post('/login', (req, res) => {
    User.findOne({username: req.body.username})
        .then(user => {
            if (!user) {
                return res.json({ message: 'Incorrect or not registered username.' });
            }
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const body = { _id : user._id};
                    const token = jwt.sign({ user : body },'rugby_kat', {expiresIn: 604800});
                    return res.json({token: token});
                } else {
                    return res.json({msg: 'Something went wrong'});
                }
            });
        });

});

module.exports = router;