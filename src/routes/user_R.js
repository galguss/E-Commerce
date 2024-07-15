const express = require('express');
const Router = express.Router();

const { showSignUp, signUp, showSignIn, signIn, logout} = require('../controllers/userController');

Router.get('/signup', showSignUp);
Router.post('/singup', signUp);
Router.get('/signin', showSignIn);
Router.post('/signin', signIn);
Router.get('/logout', logout);

module.exports = Router;
