const passport = require('passport');
const passportJWT = require("passport-jwt");
const mongoose = require('mongoose');

const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy = passportJWT.Strategy;

const User = require('../models/user');

module.exports = function (passport) {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'rugby_kat'
    },
     (jwtPayload, done) => {
        
        User.findById(jwtPayload.user._id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
    ));
};