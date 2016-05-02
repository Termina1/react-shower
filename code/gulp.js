gulp.task(‘default’, function() {
  return gulp.src(lessDirs)
    .pipe(less())
    .pipe(gulp.dest(buildDest));
});
