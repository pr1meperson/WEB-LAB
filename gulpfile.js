const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const fileInclude = require('gulp-file-include');
const del = require('del');

// 🧹 Clean
const clean = () => del(['dist']);

// 📄 HTML
const html = () => src('app/index.html')
    .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());

// 🎨 Styles
const styles = () => src('app/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());

// 💻 Scripts
const scripts = () => src('app/js/script.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify().on('error', e => {
        console.log(e.toString());
        this.emit('end');
    }))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());

// 🖼 Images
const images = () => src('app/images/**/*')
    .pipe(imagemin())
    .pipe(dest('dist/images'));

// 🌟 Favicon
const favicon = () => src('app/favicon.ico', { allowEmpty: true })
    .pipe(dest('dist'));

// 🔄 Server
const sync = done => {
    browserSync.init({ server: { baseDir: 'dist' } });
    done();
};

// 👀 Watcher
const watcher = () => {
    watch('app/**/*.html', html);
    watch('app/scss/**/*.scss', styles);
    watch('app/js/**/*.js', scripts);
    watch('app/images/**/*', images);
};

// 🏁 Default
exports.default = series(
    clean,
    parallel(html, styles, scripts, images, favicon),
    sync,
    watcher
);
