import browserSync from 'browser-sync';
import del from 'del';
import sass from 'gulp-sass';
import {
    series,
    src,
    dest,
    watch
} from 'gulp';

const config = {
    distPath: './dist',
    watchPath: './src/**/*',
    htmlSource: './src/**/*.html',
    styleSource: './src/sass/**/*.scss',
    styleDestination: './dist/css/'
};

browserSync.create();

const serveSync = cb => {
    browserSync.init({
        server: {
            baseDir: config.distPath
        }
    });
    cb();
};

const reloadBrowser = cb => {
    browserSync.reload();
    cb();
};

export const clean = () => del([config.distPath]);

const buildHtml = () => src(config.htmlSource)
    .pipe(dest(config.distPath));

const buildStyle = () => src(config.styleSource)
    .pipe(sass())
    .pipe(dest(config.styleDestination));

const watchChanges = () => watch(config.watchPath, series(buildHtml, buildStyle, reloadBrowser));

const build = cb => series(buildHtml, buildStyle, serveSync, watchChanges)(cb);

export default build; 
