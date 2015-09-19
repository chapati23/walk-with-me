// generated on 2015-08-14 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;
const mainBowerFiles = require('main-bower-files');

gulp.task('styles', () => {
  return gulp.src('client/app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('client/.tmp/styles'))
    .pipe(reload({stream: true}));
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

gulp.task('lint', lint(['client/app/scripts/**/*.js', '!**/*.min.js']));
gulp.task('lint:test', lint('client/test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: ['client/.tmp', 'client/app', '.']});

  return gulp.src('client/app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('client/dist'));
});

gulp.task('images', () => {
  return gulp.src('client/app/images/**/*')
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
    .pipe(gulp.dest('client/dist/images'));
});

gulp.task('fonts', () => {
    return gulp.src(mainBowerFiles(
        {
            paths: {bowerDirectory: './client',
                    bowerJson: './client/bower.json'}
        },
        {
            filter: '**/*.{eot,svg,ttf,woff,woff2}'
        }
    ).concat('client/app/fonts/**/*'))
    .pipe(gulp.dest('client/.tmp/fonts'))
    .pipe(gulp.dest('app/dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'client/app/*.*',
    '!client/app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['client/.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    //browser: 'google chrome',
    server: {
      baseDir: ['client/.tmp', 'client/app'],
      routes: {
        '/bower_components': 'client/bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'client/.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'client/test',
      routes: {
        '/bower_components': 'client/bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('client/app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('client/app/styles'));

  gulp.src('client/app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('client/dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('deploy', ['build'], function() {
  return gulp.src('./client/dist/**/*')
    .pipe($.ghPagesCname({ cname: 'www.walkwithme.berlin' }));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
