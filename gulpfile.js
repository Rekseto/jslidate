const gulp = require('gulp');
const pump = require('pump');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
const eslint = require('gulp-eslint');
var gulpCopy = require('gulp-copy');
const runSequence = require('run-sequence');

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', function () {
    return gulp
        .src('dist/datatraffic.js')
        .pipe(gulpCopy('test/app/static'));
});

gulp.task('watch', function () {
    gulp.watch('dist/', ['build']);
});


gulp.task('start', function () {
    runSequence('build', 'lint', function () {
        console.log('gulp has ended tasks');
    });
})