var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');
var pngquant = require('imagemin-pngquant');
var panini = require('panini');
var debug = require('gulp-debug');

gulp.task('sass', function() {
  return gulp.src("./dev/scss/*.scss")
      .pipe(sass()).on('error', sass.logError)
      .pipe(browserSync.stream());
});

gulp.task('compile-css', function() {
  return gulp.src("./dev/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['defaults', 'iOS 10.2'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(gulp.dest("./dist/css"))
});

gulp.task('compile-html', function() {
  return gulp.src("./dev/pages/**/*.html")
    .pipe(panini({
      root: './dev/pages/',
      layouts: './dev/layouts/',
      partials: './dev/partials/',
      data: './dev/data/'
    }))
    .pipe(gulp.dest("./dist"))
});

gulp.task('compile-js', function() {
  return gulp.src("./dev/js/*.js")
    .pipe(minify())
    .pipe(gulp.dest("./dist/js"))
});

gulp.task('resize-images', function() {
  return gulp.src("./dev/images/to-size/*.{png,jpg}")
  .pipe(responsive({
    '*.jpg': [{
      width: 400,
      rename: { suffix: '-400px' },
    }, {
      width: 800,
      rename: { suffix: '-800px' },
    }, {
      // Compress, strip metadata, and rename original image
      rename: { suffix: '-original' },
    }],
    '*m.png': [{
      width: 400,
      rename: { suffix: '-400px' },
    }, {
      width: 800,
      rename: { suffix: '-800px' },
    }, {
      // Compress, strip metadata, and rename original image
      rename: { suffix: '-original' },
    }],
    '*d.png': [{
      width: 500,
      rename: { suffix: '-500px' },
    }, {
      width: 1000,
      rename: { suffix: '-1000px' },
    }, {
      // Compress, strip metadata, and rename original image
      rename: { suffix: '-original' },
    }],
  }))
  .pipe(imagemin([
    pngquant(),
  ], {
    verbose: true
  }))
  .pipe(gulp.dest("./dev/images"))
});

gulp.task('compile-images', gulp.series('resize-images', function() {
  return gulp.src([
    "./dev/images/*",
    "!./dev/images/to-size/*"
  ])
    .pipe(imagemin([imagemin.jpegtran({progressive: true}),{verbose: true}]))
    .pipe(gulp.dest("./dist/images"))
}));

gulp.task('copy-misc', function(){
  return gulp.src('./dev/favicon.ico')
    .pipe(gulp.dest('./dist/'));
})

gulp.task('compile-noimg', gulp.parallel('compile-html', 'compile-css', 'compile-js', 'copy-misc'));

gulp.task('compile', gulp.parallel('compile-noimg', 'resize-images', 'compile-images'));

gulp.task('serve', gulp.series('compile-noimg', function() {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch("./dev/scss/*.scss", gulp.series('sass'));
  gulp.watch("./dev/**/*.html").on('change', gulp.series('compile-html', browserSync.reload)) ;
  gulp.watch("./dev/js/*.js").on('change', gulp.series('compile-js', browserSync.reload));
}));

gulp.task('default', gulp.series('serve'));