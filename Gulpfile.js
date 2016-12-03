//IMPORTANT - You will need to change the browserSync proxy to the base URL of your local site. By default, this is "localhost" (line 13).
//IMPORTANT - Any references to 'my-theme' will need to be changed to your theme name.

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var cleanCSS        = require('gulp-clean-css');
var autoprefixer    = require('gulp-autoprefixer');
var runSequence     = require('run-sequence');
var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

gulp.task('default', ['sass', 'browserSync'], function() {
    var sassFiles = ["./dev/sass/*.scss", "./dev/sass/partials/*.scss", "./dev/sass/partials/*.sass"];

    gulp.watch(sassFiles, ['compile-sass']);
})

gulp.task('browserSync', function() {
    var files = ['./my-theme/*.css', './my-theme/*.php'];

    browserSync.init(files, {
        proxy: "uptest.dev:8888",
        notify: false
    });
})

gulp.task('sass', function() {
    return gulp.src('./dev/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dev/sass/compiled/'));
});

gulp.task('prefix', function() {
    return gulp.src('./dev/sass/compiled/style.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dev/sass/compiled/prefixed'));
})

gulp.task('clean', function() {
    return gulp.src('./dev/sass/compiled/prefixed/style.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./my-theme/'))
    .pipe(reload({stream:true}));
})

gulp.task('compile-sass', function() {
    runSequence('sass', 'prefix', 'clean');
})



