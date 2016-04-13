'use strict';

let mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    uuid: Number,
    name: String,
    emails: String,
    token: String
});

UserSchema.index({
    name: 1
}, {
    unique: true
});

let User = mongoose.model('User', UserSchema);

module.exports = User;
