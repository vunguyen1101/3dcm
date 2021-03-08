import { src, dest, watch, series, parallel } from 'gulp';
import twig from 'gulp-twig';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';

const server = browserSync.create();
const paths = {
    styles: {
        src: 'src/sass/style.scss',
        dest: 'assets/styles',
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'assets/scripts'
    },
};

export const styles = () => {
    return src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass( { outputStyle: 'expanded' } ).on('error', sass.logError))
        .pipe(postcss([ autoprefixer ]))
        .pipe(sourcemaps.write('./maps'))
        .pipe(dest(paths.styles.dest))
        .pipe(server.stream());
};

export const scripts = () => {
    return src(paths.scripts.src)
        .pipe(dest(paths.scripts.dest));
};

export const templates = () => {
    return src('./src/*.html')
        .pipe(twig())
        .pipe(dest('./'));
};

export const serve = done => {
    server.init({
        server: '',
    });
    done();
};

export const reload = done => {
    server.reload();
    done();
};

export const watchForChanges = () => {
    watch('src/sass/**/*.scss', styles);
    watch(paths.scripts.src, series(scripts, reload));
    watch('./src/**/*.html', series(templates, reload));
};

export const dev = series(parallel(templates, styles, scripts), serve, watchForChanges);

export default dev;