var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./dev"
  });

  gulp.watch("dev/scss/*.scss", ['sass']);
  gulp.watch("dev/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("dev/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("dev/css"))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);