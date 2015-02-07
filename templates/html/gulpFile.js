var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    shell     = require('gulp-shell');

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

gulp.task('front-doc', shell.task([
  'frontend-md'
]));

gulp.task('default', ['front-doc', 'connect', 'watch']);
