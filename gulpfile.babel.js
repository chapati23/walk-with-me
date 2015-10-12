// generated on 2015-08-14 using generator-gulp-websrc 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import ngAnnotate from 'ng-annotate';
import browserSync from 'browser-sync';
import del from 'del';
import injectTemplates from 'angular-inject-templates';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let config = {
    ngAnnotateOptions          : {
        remove        : false,
        add           : true,
        single_quotes : true // jscs:disable
    },
}

gulp.task('html', () => {
    const assets = $.useref.assets({searchPath: ['.tmp', 'src', '.']});

    return gulp.src('src/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('inject:js', function () {
    let scripts = `
        <script src="jspm_packages/system.js"></script>
        <script src="config.js"></script>
        <script>System.import('./app');</script>
    `
    return gulp.src('src/index.html')
    .pipe($.injectString.after('<!-- inject:js -->', scripts))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('inject:js:dist', function(){
    gulp.src('src/index.html')
    .pipe($.injectString.after('<!-- inject:js -->', "\n\t<script src='app.bundle.js'></script>\n"))
    .pipe(gulp.dest('dist'));
});

gulp.task( 'unbundle', $.shell.task( [ 'jspm unbundle' ], { cwd : 'src' } ));

gulp.task( 'bundle-sfx', [ 'unbundle' ], () => {
    let appJsFilter = $.filter( 'app.js' );
    return gulp.src('src/**/*.js')
    // .pipe(injectTemplates())
    .pipe( appJsFilter )
    .pipe($.jspm({selfExecutingBundle: true}))
    .pipe( gulp.dest( 'dist' ));

    // $.shell.task( ['jspm bundle-sfx dist/app.js dist/app.js'] )
});

gulp.task( 'bundle-templates', function () {
    $.shell.task( [ 'mkdir dist/sections' ]);
    return gulp.src('src/sections/*.html')
    .pipe(gulp.dest('dist/sections'));
});

gulp.task( 'minify-js', function () {
    console.log( 'Minifying (ngAnnotating and uglifying) javascript files' );

    let appJsFilter = $.filter( 'src/app.js' );
    return gulp.src(['src/app.js', 'dist/app.js'])
    .pipe( appJsFilter )
    .pipe( ngAnnotate() )
    .pipe( appJsFilter.restore())
    .pipe( $.uglify())
    .pipe( gulp.dest( 'dist' ));
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
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('styles:dist', () => {
    return gulp.src('src/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe($.minifyCss({compatibility: '*'}))
    .pipe(gulp.dest('dist/styles'));
});


function lint(files, options) {
    return () => {
        return gulp.src(files)
        .pipe(reload({stream: true, once: true}))
        .pipe($.eslint(options))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
    };
}
const testLintOptions = {
    env: {
        mocha: true
    }
};

gulp.task('lint', lint(['src/scripts/**/*.js', '!**/*.min.js']));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));


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

gulp.task('extras', () => {
    return gulp.src([
        'src/*.*',
        '!src/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['inject:js', 'styles', 'fonts'], () => {
    browserSync({
        notify: false,
        port: 9000,
        browser: 'google chrome',
        server: {
            baseDir: ['.tmp', 'src']
        }
    });

    gulp.watch([
        'src/**/*.html',
        'src/**/*.js',
        'src/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/fonts/**/*', ['fonts']);
});

gulp.task('serve:dist', () => {
    browserSync({
        notify: false,
        port: 9000,
        browser: 'google chrome',
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('build', ['lint', 'inject:js:dist', 'bundle-sfx', 'bundle-templates', 'styles:dist', 'images', 'fonts', 'extras'], () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('deploy', ['build'], function() {
    return gulp.src('./dist/**/*')
    .pipe($.ghPagesCname({ cname: 'www.walkwithme.berlin' }));
});

gulp.task('default', ['clean'], () => {
    gulp.start('serve');
});
