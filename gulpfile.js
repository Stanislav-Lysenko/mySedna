'use strict';

var gulp = require('gulp'),
prefixer = require('gulp-autoprefixer'),
sass = require('gulp-sass'),
imagemin = require('gulp-imagemin'),
sourcemaps = require('gulp-sourcemaps'),
replace = require('gulp-replace'),
cssnano = require('gulp-cssnano'), //с gulp-minify-css читает оригинальные пути
//uglify = require('gulp-uglify'),
//cssmin = require('gulp-minify-css'),
browserSync = require('browser-sync'),
reload = browserSync.reload;

var path = {
	build: { //Готовые пути, куда будет складываться продакшн
		html: 'build/',
		css: 'build/css/',
		img: 'build/img/',
		webfonts: 'build/webfonts/',
		js: 'build/js/'

	},
	src: { // пути исходных файлов
		html: 'src/*.html',
		style: 'src/sass/main.scss',
		img: 'src/img/*.*',
		js: 'src/js/main.js'
	},
	watch: { //пути файлов за изменениями будем следить
		html: 'src/*.html',
		style: 'src/sass/**/*.scss',
		img: 'src/img/*.*',
		js: 'src/js/**/*.js'
	}
}

var config = { //настройка локального сервера
	server: {
		baseDir: './build'
	},
	tunnel: true,
	host: 'localhost',
	port: 3000,
	logPrefix: 'my trainee project'
}

gulp.task('build:webfonts-awesome', function() {
	return gulp.src('bower_components/Font-Awesome/webfonts/*.*')
	.pipe(gulp.dest(path.build.webfonts));
});

gulp.task('build:webfonts-etline', function() {
	return gulp.src('bower_components/etlinefont-bower/fonts/*.*')
	.pipe(gulp.dest(path.build.webfonts));
});

gulp.task('build:html', async function(){
	console.log('html changed');
	return gulp.src(path.src.html) // выбор исходных файлов html;
	.pipe(gulp.dest(path.build.html))
	.pipe(reload({stream: true}));
})
//
//.pipe(cssmin()) //также извлекается импорты в main.scss
gulp.task('build:css', async function(){
	console.log('css changed');
	return gulp.src(path.src.style)
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(prefixer())
	.pipe(cssnano()) //также извлекается импорты в main.scss cssmin()
	.pipe(replace('(fonts/', '(../webfonts/')) //для корректности путей на файлы шрифтов
	.pipe(sourcemaps.write('./')) // ./ для создания map файла
	.pipe(gulp.dest(path.build.css))
	.pipe(reload({stream: true}))
})

gulp.task('build:images', async function () {
	console.log('images compressed');
	gulp.src(path.src.img) //Выберем наши картинки
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		})
	]))
	.pipe(gulp.dest(path.build.img)) //И бросим в build
	.pipe(reload({stream: true}));
});


gulp.task('browser-sync', async function(){
	browserSync(config);
})

gulp.task('watch', function() {
	gulp.watch(path.watch.html, gulp.parallel('build:html'));
	gulp.watch(path.watch.style, gulp.parallel('build:css'));
	gulp.watch(path.watch.img, gulp.parallel('build:images'));
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
