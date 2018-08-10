var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var imagemin = require('gulp-imagemin');

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./dev"
  });

  gulp.watch("dev/scss/*.scss", ['sass']);
  gulp.watch("dev/**/*.html").on('change', browserSync.reload);
  gulp.watch("dev/js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("dev/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("dev/css"))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('compile-css', function() {
  return gulp.src("dev/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['> 5% in US'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest("dist/css"))
});

gulp.task('compile-html', function() {
  return gulp.src("dev/**/*.html")
    .pipe(gulp.dest("dist"))
});

gulp.task('compile-js', function() {
  return gulp.src("dev/js/*.js")
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
});

gulp.task('compile-images', function() {
  return gulp.src("dev/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
});

gulp.task('compile', ['compile-html', 'compile-css', 'compile-js', 'compile-images']);