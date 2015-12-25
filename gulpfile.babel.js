import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();

gulp.task('clean',          $.shell.task(['npm run clean -s']));
gulp.task('copy:assets',    $.shell.task(['npm run copy:assets -s']));
gulp.task('copy:html',      $.shell.task(['npm run copy:html -s']));
gulp.task('js:bundle',      $.shell.task(['npm run bundle -s']));
gulp.task('js:inject:dev',  $.shell.task(['npm run js:inject:dev -s']));
gulp.task('js:inject:build',$.shell.task(['npm run js:inject:build -s']));
gulp.task('js:lint',        $.shell.task(['npm run js:lint -s']));
gulp.task('styles:dev',     $.shell.task(['npm run styles:dev -s']));
gulp.task('styles:build',   $.shell.task(['npm run styles:build -s']));
gulp.task('imagemin',       $.shell.task(['npm run imagemin -s']));

function browserSyncInit(baseDir) {
    browserSync.instance = browserSync.init({
        startPath: '/',
        server: {
            baseDir: baseDir,
            routes: {
                '/jspm_packages': 'jspm_packages',
                '/config.js': 'config.js',
                '/src': 'src'
            }
        },
        browser: 'Google Chrome',
        files: ['.tmp/styles/index.css', 'src/**/*.html', 'src/**/*.js', 'src/images/**/*']
    });
}

gulp.task('serve', ['js:inject:dev', 'styles:dev'], () => {
    browserSyncInit(['.tmp', 'src']);

    gulp.watch('src/index.html', ['js:inject:dev']);
    gulp.watch('src/styles/**/*.scss', ['styles:dev']);
    gulp.watch('src/**/*.js', ['js:lint']);
});

gulp.task('serve:dist', ['build'], () => {
    browserSyncInit('dist');
});

gulp.task('build', ['js:lint', 'js:inject:build', 'js:bundle', 'copy:html', 'styles:build', 'imagemin', 'copy:assets'], () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('deploy', ['build'], function() {
    return gulp.src('./dist/**/*')
    .pipe($.ghPagesCname({ cname: 'www.walkwithme.berlin' }));
});

gulp.task('default', ['clean'], () => {
    gulp.start('serve');
});
