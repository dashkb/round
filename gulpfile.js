var del    = require('del'),
    gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    coffee = require('gulp-coffee'),
    rename = require('gulp-rename'),
    rjs    = require('requirejs');

gulp.task('clean', function() {
  return del(['build', 'dist']);
});
gulp.task('coffee', ['clean'], function() {
  return gulp.src('./assets/javascripts/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('build/'));
});
gulp.task('mustache', ['clean'], function() {
  return gulp.src('./assets/javascripts/**/*.mustache')
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest('build/'));
});
gulp.task('package', ['coffee', 'mustache'], function(cb) {
  rjs.optimize({
    appDir: '',
    baseUrl: 'build/',
    dir: 'dist/',
    name: 'main',
    paths: {
      'jquery': '../vendor/javascripts/jquery',
      'underscore': '../vendor/javascripts/underscore',
      'backbone': '../vendor/javascripts/backbone',
      'text': '../vendor/javascripts/text',
      'mustache': '../vendor/javascripts/mustache',
      'stache': '../vendor/javascripts/stache'
    }
  }, function(buildResponse) {
    console.log(buildResponse);
  }, cb);
});
gulp.task('watch', function() {
  gulp.watch('assets/javascripts/**/*', ['default']);
});

gulp.task('default', ['clean', 'coffee', 'mustache', 'package'])
