import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();

gulp.task('js:lint', $.shell.task(['npm run lint']));

gulp.task('js:bundle', $.shell.task(['npm run bundle']));

gulp.task('clean', $.shell.task(['npm run clean']));

gulp.task('copy:assets', $.shell.task(['npm run copy:assets']));

gulp.task('copy:html', $.shell.task(['npm run copy:html']));

gulp.task('styles:dev', $.shell.task(['npm run styles:dev']));
gulp.task('styles:build', $.shell.task(['npm run styles:build']));

gulp.task('images', () => {
    return gulp.src('src/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
        console.log(err);
        this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('js:inject', function () {
    let scripts = `
        <script src="jspm_packages/system.js"></script>
        <script src="config.js"></script>
        <script>System.import('./app');</script>
    `;
    return gulp.src('src/index.html')
    .pipe($.injectString.after('<!-- inject:js -->', scripts))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('js:inject:dist', function(){
    gulp.src('src/index.html')
    .pipe($.injectString.after('<!-- inject:js -->', "\n\t<script src='app.bundle.js'></script>\n"))
    .pipe(gulp.dest('dist'));
});

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

gulp.task('serve', ['js:inject', 'styles:dev'], () => {
    browserSyncInit(['.tmp', 'src']);

    gulp.watch('src/index.html', ['js:inject']);
    gulp.watch('src/styles/**/*.scss', ['styles:dev']);
    gulp.watch('src/**/*.js', ['js:lint']);
});

gulp.task('serve:dist', ['build'], () => {
    browserSyncInit('dist');
});

gulp.task('build', ['js:lint', 'js:inject:dist', 'js:bundle', 'copy:html', 'styles:build', 'images', 'copy:assets'], () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('deploy', ['build'], function() {
    return gulp.src('./dist/**/*')
    .pipe($.ghPagesCname({ cname: 'www.walkwithme.berlin' }));
});

gulp.task('default', ['clean'], () => {
    gulp.start('serve');
});
