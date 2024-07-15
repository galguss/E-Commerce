const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const port = 3000;

app.use(session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname ,'../public')));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.listen(port, (req, res) => {
    console.log(`The server is running on port: ${port}....`);
});

mongoose.connect(process.env.mongoDB);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log(`Now listening on port ${port}`);
});

app.get('/', (req, res) => {
    res.render('Index', { isLogged: req.session.isLogged });
});

const users = require('./routes/user_R');
app.use('/user', users);