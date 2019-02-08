const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const del = require('del');

const config = {
    sourcePath: './src/**/*',
    destinationPath: './dist/'
};

function clean(cb) {
    del([config.destinationPath]);
    cb();
};

function serve(cb) {
    browserSync.init({
        server: {
            baseDir: config.destinationPath
        }
    });
    cb();
};

function reload(cb) {
    browserSync.reload();
    cb();
};

function copy(cb) {
    gulp.src(config.sourcePath)
        .pipe(gulp.dest(config.destinationPath));
    cb();
};

function watch(cb) {
    gulp.watch(config.sourcePath, gulp.series(copy, reload));
    cb();
};

exports.default = gulp.series(clean, copy, serve, watch);
