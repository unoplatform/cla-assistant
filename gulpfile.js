'use strict';

let gulp = require('gulp');
let eslint = require('gulp-eslint');
let nodemon = require('gulp-nodemon');
let env = require('gulp-env');

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

});

gulp.task('default', ['start']);
