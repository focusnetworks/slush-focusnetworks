var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    run     = require('gulp-run');

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['*.html','css/**', 'js/**'], ['html']);
});

gulp.task('front-doc', function () {
  run('frontend-md').exec()  // prints "Hello World\n".
  .pipe(gulp.dest('output'))    // Writes "Hello World\n" to output/echo.
})


gulp.task('default', ['front-doc', 'connect', 'watch']);
