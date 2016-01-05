/**
 * Created by https://github.com/volkovpv on 01.2016.
 */
'use strict';

var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    liveReload  = require('gulp-livereload'),
    sass        = require('gulp-sass'),
    ngAnnotate  = require('gulp-ng-annotate');

//build js file
gulp.task('build_js', function () {
    gulp.src(['app/**/app.module.js', 'app/**/*.factory.js', 'app/**/*.module.js',  'app/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('./www/js/app.js'))
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('.'))
});

//copy html
gulp.task('copy_html', function(){
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./www/'));
});

//sass
gulp.task('sass', function () {
    return gulp.src('./app/assets/style/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('../source-map'))
        .pipe(gulp.dest('./www/style'));
});

//copy .htaccess
//нужен только в том случает если приложение открывается с сервера Apache
gulp.task('copy_htaccess', function(){
    gulp.src('./app/.htaccess')
        .pipe(gulp.dest('./www/'));
});

gulp.task('watch', ['build_js', 'copy_html', 'sass', 'copy_htaccess'], function() {
    liveReload({ start: true });

    gulp.watch('./app/**/*.html', ['copy_html']);
    gulp.watch('./app/assets/style/**', ['sass']);
    gulp.watch('./app/**/**', ['build_js']);

    gulp.watch('./www/**').on('change', function(file) {
        liveReload.changed(file.path);
    });
});