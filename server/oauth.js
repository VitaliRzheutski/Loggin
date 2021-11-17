const router = require('express').Router()
const passport = require('passport')
module.exports = router

// Google authentication and login (GET /auth/google)
router.get('/', passport.authenticate('google', { scope: 'email' }));

// handles the callback after Google has authenticated the user (GET /auth/google/callback)
router.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/home', // or wherever
    failureRedirect: '/' // or wherever
  })
)