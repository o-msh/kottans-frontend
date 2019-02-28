import browserSync from 'browser-sync';
import del from 'del';
import sass from 'gulp-sass';
import {
    src,
    dest,
    watch,
    parallel,
    series
} from 'gulp';

const config = {
    distPath: './dist',
    htmlSource: './src/**/*.html',
    sassSource: './src/sass/**/*.scss',
    cssSource: './src/css/**/*.css',
    webFontsSource: './src/webfonts/**/*',
    webFontsDestination: './dist/webfonts',
    styleDestination: './dist/css/',
    imageSource: './src/img/**/*',
    imageDestination: './dist/img/'
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

const copyImages = () => src(config.imageSource)
    .pipe(dest(config.imageDestination))
    .pipe(browserSync.stream());

const buildHtml = () => src(config.htmlSource)
    .pipe(dest(config.distPath))
    .pipe(browserSync.stream());

const buildStyle = () => src(config.sassSource)
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(dest(config.styleDestination))
    .pipe(browserSync.stream());

const copyCss = () => src(config.cssSource)
    .pipe(dest(config.styleDestination));

const copyWebFonts = () => src(config.webFontsSource)
    .pipe(dest(config.webFontsDestination));

export const buildFontAwesome = cb => parallel(copyCss, copyWebFonts)(cb);

const watchChanges = () => {
    watch(config.htmlSource, buildHtml);
    watch(config.sassSource, buildStyle);
    watch(config.imageSource, copyImages);
};

const build = cb => series(clean, parallel(buildFontAwesome, buildHtml, buildStyle, copyImages, serveSync, watchChanges))(cb);

export default build; 
