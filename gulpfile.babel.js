import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('default',        $.shell.task(['npm start']));
gulp.task('build',          $.shell.task(['npm run build -s']));
gulp.task('deploy', ['build'], function() {
    return gulp.src('./dist/**/*')
    .pipe($.ghPagesCname({ cname: 'www.walkwithme.berlin' }));
});
