'use strict';

let  mongoose = require('mongoose');

let  RepoSchema = mongoose.Schema({
    repoId: String,
    repo: String,
    ownerId: String,
    owner: String,
    gist: String,
    token: String
});

RepoSchema.index({
    repo: 1,
    owner: 1
}, {
    unique: true
});

let  Repo = mongoose.model('Repo', RepoSchema);

module.exports = Repo;
