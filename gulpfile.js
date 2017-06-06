var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var gulpsync = require('gulp-sync')(gulp);
var jscs = require('gulp-jscs');
const babel = require('gulp-babel');

console.log(jscs);

gulp.task('merge', function() {
	return gulp.src('./src/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('compress', function (cb) {
	pump([
		gulp.src('js/*.js'),
		uglify(),
		gulp.dest('dist')
	],
	cb
	);
});

gulp.task('compress:merge', function (cb) {
	pump([
		gulp.src('dist/all.js'),
		uglify(),
		gulp.dest('dist')
	],
	cb
	);
});

gulp.task('merge:ugly', gulpsync.sync(['merge', 'compress:merge']));

gulp.task('lint', function() {
	return gulp.src('./src/*.js')
		.pipe(jscs())
		.pipe(jscs.reporter());
});

gulp.task('fix', function() {
	return gulp.src('./src/*.js')
		.pipe(jscs({fix: true}))
		.pipe(jscs.reporter())
		.pipe(jscs.reporter('fail'))
		.pipe(gulp.dest('src'));
});

