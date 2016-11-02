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
    ngAnnotate  = require('gulp-ng-annotate'),
    srcJsFile   = require('./config-js.json'),
    spaServer             = require('spa-server');

var server        = spaServer.create({
    path: './www',
    port: 8001,
    fallback: {
        'text/html' : '/index.html'
    }
});

//build js file
//исходники js фалов были вынесены в конфигурационный файл для того, что бы можно было собирать их в опеределённой последовательности как и в dev среде, так и в prod
gulp.task('build_js', function () {
    gulp.src(srcJsFile.src)
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

//img
gulp.task('img', function(){
    gulp.src('./app/assets/img/**')
        .pipe(gulp.dest('./www/img'));
});

//copy .htaccess
//нужен только в том случает если приложение открывается с сервера Apache
gulp.task('copy_htaccess', function(){
    gulp.src('./app/.htaccess')
        .pipe(gulp.dest('./www/'));
});

gulp.task('watch', ['build_js', 'copy_html', 'sass', 'copy_htaccess', 'img'], function() {
    liveReload({ start: true });

    server.start();

    gulp.watch('./app/**/*.html', ['copy_html']);
    gulp.watch('./app/assets/style/**', ['sass']);
    gulp.watch('./app/**/**', ['build_js']);

    gulp.watch('./www/**').on('change', function(file) {
        liveReload.changed(file.path);
    });
});