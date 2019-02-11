import browserSync from 'browser-sync';
import del from 'del';
import sass from 'gulp-sass';
import {
    src,
    dest,
    watch,
    parallel
} from 'gulp';

const config = {
    distPath: './dist',
    htmlSource: './src/**/*.html',
    styleSource: './src/sass/**/*.scss',
    styleDestination: './dist/css/'
};

browserSync.create();

const serveSync = () => {
    browserSync.init({
        server: {
            baseDir: config.distPath
        },
        notify: false
    });
};

export const clean = () => del([config.distPath]);

const buildHtml = () => src(config.htmlSource)
    .pipe(dest(config.distPath))
    .pipe(browserSync.stream());

const buildStyle = () => src(config.styleSource)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(dest(config.styleDestination))
    .pipe(browserSync.stream());

const watchChanges = () => {
    watch(config.htmlSource, buildHtml);
    watch(config.styleSource, buildStyle);
};

const build = cb => parallel(buildHtml, buildStyle, serveSync, watchChanges)(cb);

export default build; 
