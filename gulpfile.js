'use strict';

const gulp = require('gulp');
const config = require('./gulp.config')();


const eslint = require('gulp-eslint');
const tslint = require('gulp-tslint');

const nodemon = require('gulp-nodemon');
const env = require('gulp-env');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const plumber = require('gulp-plumber');
const karma = require('karma').Server;
const join = require('path').join;

const tsc = require('gulp-typescript');
const tscOptions = tsc.createProject('tsconfig.json');
const inlineNg2Template = require('gulp-inline-ng2-template');
const assets = require('gulp-assets');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

const del = require('del');

gulp.task('source', () => {
    env('.env.json');
});

gulp.task('clean', (cb) => {
    return del(['./dist'],cb);
});

gulp.task('copy-assets',['compile-css','compress-lib'], function() {
    return gulp.src(['src/client/assets/**/*'], {
          base: 'src'
      }).pipe(gulp.dest('dist'));
});

gulp.task('compile-css',['clean'],function(){
       gulp.src('src/client/assets/styles/*.scss')
              .pipe(sass().on('error', sass.logError))
              .pipe(gulp.dest('src/client/assets/styles'));
});

gulp.task('compress-lib', function() {
  gulp.src(['node_modules/jquery/dist/jquery.min.js',
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/http.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'src/client/assets/js/edge.5.0.1.min.js'])
              .pipe(concat('concat.js'))
              .pipe(gulp.dest('./dist/client'))
              .pipe(rename('lib.js'))
              .pipe(minify())
              .pipe(gulp.dest('./dist/client'));
});

gulp.task('compile',function(){
    //compile client files, use ng2template for now to support unit tests, should be separated later
    let tsResult = gulp.src(['./src/client/**/**/*.ts'])
        .pipe(inlineNg2Template({ base: '//src' }))
        .pipe(tsc(tscOptions));

    tsResult.js.pipe(gulp.dest('./dist/client'));

    // compile assets
    gulp.src(['./src/*.html','./src/**/*.html'])
    .pipe(assets({
        js: true,
        css: false
    }))
    .pipe(gulp.dest('./dist/client'));
});

gulp.task('watch', function() {
    gulp.watch(['./src/client/*', './src/client/**/*','./src/client/**/**/*'], ['compile']);
});

gulp.task('start', ['source', 'copy-assets','compile','watch'], (cb) => {
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

gulp.task('tslint', function(){
      return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
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
        .pipe(plumber())
        .pipe(mocha())
        .pipe(istanbul.writeReports({
            dir: './coverage',
            reporters: ['lcovonly', 'html'],
            reportOpts: { dir: './coverage' }
        }));
    // Enforce a coverage of at least 90%
    // .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('test-watch', () => {
    gulp.watch(['./src/server/**/**/*.spec.js', './src/server/**/**/*.js'], ['test']);
});

gulp.task('test-ui', ['compile'], function (done) {
    karma.start({
      configFile: join(process.cwd(), 'karma.conf.js'),
      singleRun: true
    }, done);
});

gulp.task('default', ['start']);
gulp.task('lint', ['eslint', 'tslint']);
