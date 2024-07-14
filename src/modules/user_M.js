const mongoose = require('mongoose');

const UsersDB = mongoose.Schema({
    Email:{
        require: true,
        unique: true,
        type: String,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    Password:{
        require: true,
        type: String
    },
    Full_Name:{
        require: true,
        type: String
    },
    Role:{
        require: true,
        type: String 
    },
    Address:{
        require: true,
        type: String
    },
    Phone_Number:{
        require: true,
        type: String
    }
})

module.exports = mongoose.model('Users', UsersDB);