import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import modRewrite from './jspm_packages/npm/connect-modrewrite@0.8.2/index.js';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task( 'html', function () {
    return gulp.src('src/sections/*.html')
    .pipe($.minifyHtml({conditionals: true, loose: true}))
    .pipe(gulp.dest('dist/sections'));
});

gulp.task('styles', () => {
    return gulp.src('src/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 5% in DE', 'last 2 versions']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}))
    .pipe($.minifyCss({compatibility: '*'}))
    .pipe(gulp.dest('dist/styles'));
});

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

gulp.task('fonts', () => {
    return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy:extras', () => {
    return gulp.src([
        'src/*.*',
        '!src/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('js:lint', () => {
    return gulp.src(['src/**/*.js', '!src/jspm_packages/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
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

gulp.task( 'js:bundle', () => {
    return gulp.src('src/app.js')
    .pipe($.jspm({selfExecutingBundle: true}))
    .pipe($.uglify({ mangle: false}))
    .pipe( gulp.dest( 'dist' ));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));



function browserSyncInit(baseDir) {
    browserSync.instance = browserSync.init({
        startPath: '/',
        server: {
            baseDir: baseDir,
            middleware: modRewrite([ '^[^\\.]*$ /index.html [L]' ]),
            routes: {
                '/jspm_packages': 'jspm_packages',
                '/config.js': 'config.js'
            }
        },
        browser: 'Google Chrome'
    });
}

gulp.task('serve', ['js:inject', 'styles', 'fonts'], () => {
    browserSyncInit(['.tmp', 'src']);

    gulp.watch([
        'src/**/*.html',
        'src/**/*.js',
        'src/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch(['src/html/**/*.html', '!src/index.html'], ['html']);
    gulp.watch('src/index.html', ['js:inject']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/fonts/**/*', ['fonts']);
    gulp.watch('src/**/*.js', ['js:lint']);
});

gulp.task('serve:dist', () => {
    browserSyncInit('dist');
});

gulp.task('build', ['js:lint', 'js:inject:dist', 'js:bundle', 'html', 'styles', 'images', 'fonts', 'copy:extras'], () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('deploy', ['build'], function() {
    return gulp.src('./dist/**/*')
    .pipe($.ghPagesCname({ cname: 'www.walkwithme.berlin' }));
});

gulp.task('default', ['clean'], () => {
    gulp.start('serve');
});
