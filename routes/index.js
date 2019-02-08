const express = require('express');
const router = express.Router();

router.get ('/', (req, res) => {
    res.render('login');
})

router.get ('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/play', (req, res) => {
    res.render('play');
})

module.exports = router;