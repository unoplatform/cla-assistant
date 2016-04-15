'use strict';

let api = require('./api');
let assert = require('assert');
let app = require('express')();
let router = require('express').Router();
let request = require('supertest');



const testData = require('../../testData');

describe('api', () => {
    describe('post repo', () => {
        it('should CREATE new repo if there is no', () => {
            let req = { args: { repoId: testData.repo.id, ownerId: testData.repo.owner.id } };


        });
    });
});