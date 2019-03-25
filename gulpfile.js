const gulp = require('gulp');
const browsersync = require("browser-sync").create();
const del = require("del");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass");
const newer = require("gulp-newer");
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
const header = require('gulp-header');
const package = require('./package.json');

//BrowserSync
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: "app"
		},
		port: 3000
	});
	done();
}

// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}

// CSS task
function css() {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("app/css/"))
    .pipe(browsersync.stream());
}

//production

var banner = {
	full:
		'/*!\n' +
		' * <%= package.author %>\n' +
		' * <%= package.name %> v<%= package.version %>\n' +
		' * <%= package.description %>\n' +
		' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
		' * <%= package.license %> License\n' +
		//' * <%= package.repository.url %>\n' +
		' */\n\n'
};

var staticData = ["fonts", "libs", "*.html"]

function copyStatic(done) {
	for (var element of staticData) {
		if (element.includes(".")) {
			gulp.src("app/" + element)
			.pipe(gulp.dest("dist/"));
		} else {
			gulp.src("app/" + element + "/**/*")
			.pipe(gulp.dest("dist/" + element));
		}
	}

	done();
}

function production(done) {
	clean();
	distCss();
	distImages();
	distJs();
	copyStatic(done);

	done();
}

function distCss() {
	return gulp
    .src("app/css/**/*.css")
    .pipe(plumber())
    .pipe(autoprefixer({
			browsers: ['last 2 version', '> 0.25%'],
			cascade: true,
			remove: true
		}))
    .pipe(header(banner.full, { package : package }))
    .pipe(gulp.dest("dist/css/"))
    .pipe(browsersync.stream());
}

// Optimize Images
function distImages() {
	return gulp
	.src("app/images/**/*")
	.pipe(newer("dist/images"))
	.pipe(
		imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.jpegtran({ progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
				{
					removeViewBox: false,
					collapseGroups: true
				}
				]
			})
			])
		)
	.pipe(gulp.dest("dist/images"));
}

//As of now just copy. Then - lint, webpack, etc.
function distJs() {
	return gulp
	.src("app/js/**/*.js")
	.pipe(gulp.dest("dist/js"));
}

function clean() {
	return del(["dist/*"]);
}


/////////////////////////////////////////////////

function watchFiles() {
	gulp.watch("app/scss/**/*.{scss,sass}", css);
	gulp.watch("app/jsNext/**/*.js", browserSyncReload);
	gulp.watch("app/*.html", browserSyncReload);
}

const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.distImages = distImages;
exports.css = css;
exports.distCss = distCss;
exports.clean = clean;
exports.wa = watch;
exports.copyStatic = copyStatic;
exports.distJs = distJs;
exports.production = production;
exports.clean = clean;