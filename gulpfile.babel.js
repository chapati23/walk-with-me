import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('default',        $.shell.task(['npm start']));
gulp.task('build',          $.shell.task(['npm run build -s']));
gulp.task('bump-version',   $.shell.task(['npm version patch']));
gulp.task('deploy', ['build', 'bump-version'], function() {
    return gulp.src('./dist/**/*')
    .pipe($.ghPagesCname({ cname: 'www.walkwithme.berlin' }));
});
