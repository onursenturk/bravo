var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    header = require('gulp-header')
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserSync = require('browser-sync'),
    argv = require('yargs').argv
    gutil = require('gulp-util'),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    chalk = require('chalk'),
    inject = require('gulp-inject');

/* pathConfig*/
var entryPoint = './src/js/index.js',
    browserDir = './',
    sassWatchPath = './src/scss/**/*.scss',
    jsWatchPath = './src/js/**/*.js',
    fontWatchPath = './src/font/**/*',
    imgWatchPath = './src/img/**/*',
    htmlWatchPath = './**/*.html';
/**/

gulp.task('sass', function () {
  return gulp.src(sassWatchPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        middleware: function (req, res, next) {
            if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() == 'POST') {
                console.log('[POST => GET] : ' + req.url);
                req.method = 'GET';
            }
            next();
        },
        https: true
    });
});

gulp.task('watch', function () {
    gulp.watch(sassWatchPath, ['sass']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});

gulp.task('dev', ['sass', 'watch', 'browser-sync']);
