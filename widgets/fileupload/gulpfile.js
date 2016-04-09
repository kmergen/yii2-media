/**
 * Fileupload Widget gulpfile.js
 * 
 * @author Klaus Mergen <kmergen.web@gmail.com>
 */

// Required gulp packages
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    cssnano = require('gulp-cssnano');

/**
 * @var string The directory of the distribution
 */
var distributionDir = '../../vendor/bower';

/**
 * @var string The public directory or the assets directory that will published.
 */
var publicDir = 'assets';


/**
 * @var array The full fileupload js files.
 * With these files you can build the ui with validation, image resizing and all other features of blueimp fileupload.
 */
var fileuplodFullJs = [
    distributionDir + '/blueimp-load-image/js/load-image.all.min.js',
    distributionDir + '/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
    distributionDir + '/blueimp-tmpl/js/tmpl.min.js',
    distributionDir + '/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
    distributionDir + '/blueimp-file-upload/js/jquery.iframe-transport.js',
    distributionDir + '/blueimp-file-upload/js/jquery.fileupload.js',
    distributionDir + '/blueimp-file-upload/js/jquery.fileupload-process.js',
    distributionDir + '/blueimp-file-upload/js/jquery.fileupload-image.js',
    distributionDir + '/blueimp-file-upload/js/jquery.fileupload-audio.js',
    distributionDir + '/blueimp-file-upload/js/jquery.fileupload-video.js',
    distributionDir + '/blueimp-file-upload/js/jquery.fileupload-validate.js',
    distributionDir + '/blueimp-file-upload/js/jquery.fileupload-ui.js'
];
/**
 * @var array The fileupload css files.
 */
var fileuplodCss = [
    distributionDir + '/blueimp-file-upload/css/jquery.fileupload.css',
    distributionDir + '/blueimp-file-upload/css/jquery.fileupload-ui.css'
];



//################################ Fileupload CSS Tasks ########################################

gulp.task('build-fileupload-css', ['build-fileupload-custom-css'], function () {

    var src = fileuplodCss;
    src.push('build/css/**/*.css');

    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(concat('fileupload.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(publicDir + '/css')).on('error', gutil.log)
        .pipe(concat('fileupload.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest(publicDir + '/css')).on('error', gutil.log);

});

gulp.task('build-fileupload-custom-css', function () {

    return gulp.src('build/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('build/css'));

});

//################################ Fileupload Js Tasks ########################################

gulp.task('build-fileupload-js', function () {

    var src = fileuplodFullJs;
    
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(concat('fileupload.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(publicDir + '/js')).on('error', gutil.log)
        .pipe(concat('fileupload.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(publicDir + '/js')).on('error', gutil.log);

});

//################################ Build Task ########################################

gulp.task('build', ['build-fileupload-css', 'build-fileupload-js']);


//################################ Default Task ########################################

gulp.task('default', ['watch']);

gulp.task('watch', function () {
    gulp.watch('build/fileupload/less/**/*.less', ['build-fileupload-css']);
    gulp.watch('build/fileupload/js/**/*.js', ['build-fileupload-js']);
});

