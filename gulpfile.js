var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    assign     = require('lodash.assign'),
    babelify   = require('babelify'),
    browserify = require('browserify'),
    buffer     = require('vinyl-buffer'),
    source     = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    watchify   = require('watchify');

var buildOptions = {
  entries:    'assets/javascripts/app.jsx',
  extensions: ['.jsx'],
  debug:      true
};
var finalOptions = assign({}, watchify.args, buildOptions);
var builder = watchify(browserify(finalOptions))
  .transform(babelify);

function bundle() {
  return builder.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'));
}

builder.on('update', bundle);
builder.on('log', gutil.log);

gulp.task('build', bundle);
gulp.task('default', ['build']);
