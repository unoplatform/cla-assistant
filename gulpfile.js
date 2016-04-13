'use strict';

let gulp = require('gulp');
let eslint = require('gulp-eslint');
let nodemon = require('gulp-nodemon');
let env = require('gulp-env');
let mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

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

gulp.task('pre-test', function () {
  return gulp.src(['src/server/**/*.js', '!./src/**/*.spec.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
    gulp.src(['./src/server/**/*.spec.js'], {
        read: false
    })
    .pipe(mocha())
    .pipe(istanbul.writeReports({
        dir: './coverage',
        reporters: [ 'lcovonly', 'html'],
        reportOpts: { dir: './coverage' }
    }))
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('default', ['start']);
