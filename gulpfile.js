'use strict';

let gulp = require('gulp');
let config = require('./gulp.config')();

let eslint = require('gulp-eslint');
let tslint = require('gulp-tslint');

let nodemon = require('gulp-nodemon');
let env = require('gulp-env');
let mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

let tsc = require('gulp-typescript');
let inlineNg2Template = require('gulp-inline-ng2-template');
let clean = require('gulp-clean');
let assets = require('gulp-assets');

gulp.task('source', () => {
    env('.env.json');
});

gulp.task('start', ['source','compile'], (cb) => {
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


gulp.task('tslint', function(){
      return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('compile', function(){

    // sourceRoot is not supported in this gulp tasks
    // apart from that this should resemble tsconfig.json
    var tscOptions = {
        "target": "ES5",
        "module": "commonjs",
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "removeComments": false,
        "noImplicitAny": false,
        "suppressImplicitAnyIndexErrors": true,
        "rootDir": "./src",
        "outDir": "./dist",
        "moduleResolution": "node"
    };

    gulp.src('./dist')
        .pipe(clean());

    //compile client files, use ng2template for now to support unit tests, should be separated later
    var tsResult = gulp.src(['./src/client/*.ts', './src/client/**/*.ts','./src/client/**/**/*.ts'])
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

    //compile server files
    var tsResult = gulp.src(['./typings/tsd.d.ts','./src/server/*.ts','./src/server/**/*.ts'])
        .pipe(tsc(tscOptions));

    tsResult.js.pipe(gulp.dest('./dist/server'));
});
gulp.task('default', ['start']);
