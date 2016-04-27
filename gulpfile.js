var gulp = require('gulp');
var crisper = require('gulp-crisper');
var gulpif = require('gulp-if');
var gulpbabel = require('gulp-babel');
var gulpbabel = require('gulp-babel');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var eslint = require('gulp-eslint');


var source = 'src/**/*.html'

gulp.task('default', ['linter'],function() {
  // place code for your default task here

});


gulp.task('transpile', function () {
  return gulp.src(source)
  .pipe(crisper({
    scriptInHead: false, // true is default
    onlySplit: false
  }))
  .pipe(gulpif('*.js', gulpbabel({
    presets: ['es2015']
  })))
  .pipe(gulp.dest('./'));
})


gulp.task('watch', ['transpile'], function () {

  watch(source, batch(function (events, done) {
        gulp.start('transpile', done);
    }));
})


gulp.task('linter', function () {
  return gulp.src(source)
  .pipe(crisper({
    scriptInHead: false, // true is default
    onlySplit: false
  }))
  .pipe(gulpif('*.js', eslint({
    extends: 'eslint:recommended',
    parserOptions: {
      "ecmaVersion": 6
    },
		ecmaFeatures: {
		    'modules': true
		},
		rules: {
			'strict': 2
		},
		globals: {
			'$':true,
      'Polymer': true,
      'Promise': true
		},
		envs: [
			'browser'
		]
	})))
  .pipe(gulpif('*.js', eslint.formatEach('compact', process.stderr) ))
  .pipe(eslint.failAfterError())
  .pipe(gulpif('*.js', gulpbabel({
    presets: ['es2015']
  })))
  .pipe(gulp.dest('./'));

})
