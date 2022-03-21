const mongoose = require('mongoose');

var userdb = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('userdb',userdb);
