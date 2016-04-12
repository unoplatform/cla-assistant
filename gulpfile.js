'use strict';

let gulp = require('gulp');
let eslint = require('gulp-eslint');
let nodemon = require('gulp-nodemon');
let env = require('gulp-env');
let mocha = require('gulp-mocha');

gulp.task('source', () => {
    env('.env.json');
});

gulp.task('start', ['source'], (cb) => {
    require('./app.js');
    process.on('SIGINT', () => {
        process.exit();
        cb();
    });
});

gulp.task('restart', ['source'], () => {
    let stream = nodemon({
        script: './app.js',
        exec: 'node-inspector & node --debug',
        watch: 'src',
        ext: 'js json'
    }).on('restart', () => {
        console.log('restarted');
    });
    return stream;
});

gulp.task('eslint', () => {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('test', () => {
    gulp.src(['./src/**/*.spec.js'], {
        read: false
    })
    .pipe(mocha({
        reporter: 'spec',
        timeout: 2000
    }));
});

gulp.task('default', ['start']);
