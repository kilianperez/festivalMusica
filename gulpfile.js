const {src, dest, watch, series} = require('gulp');
var sass = require('gulp-sass')(require('sass'));
sass.compiler = require('dart-sass');

const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// utilidades css

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// utilidades JS

const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
	carpetaImagenes: './src/img/**/*',
	destinoImagenes: './build/img',
	cambiosJs: './src/js/**/*.js',
	destinoJs: './build/js',
	carpetaSASS: './src/scss/app.scss',
	destinoSASS: './build/css',
	cambiosSASS: './src/scss/**/*.scss',
};

function compilarSASS() {
	return src(paths.carpetaSASS)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([autoprefixer(), cssnano()]))
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.destinoSASS));
}

// quito esta tarea porque he añadido el sourmap autoprefixer postcss cssnano que lo compilan correctamente
// function minificarSASS() {
// 	return src(paths.carpetaSASS)
// 		.pipe(
// 			sass({
// 				outputStyle: 'compressed',
// 			})
// 		)
// 		.pipe(dest(paths.destinoSASS));
// }
function compilarJavascript() {
	return src(paths.cambiosJs)
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
		.pipe(terser())
		.pipe(sourcemaps.write('.'))
		.pipe(rename({suffix: '.min'}))
		.pipe(dest(paths.destinoJs));
}

function images() {
	return src(paths.carpetaImagenes)
		.pipe(imagemin())
		.pipe(dest(paths.destinoImagenes))
		.pipe(notify({message: 'Imagen Minificada'}));
}
function versionWebp() {
	return src(paths.carpetaImagenes)
		.pipe(webp())
		.pipe(dest(paths.destinoImagenes))
		.pipe(notify({message: 'Version de imagen Webp lista'}));
}
function watchArchivos() {
	watch(paths.cambiosSASS, compilarSASS);
	watch(paths.cambiosJs, compilarJavascript);
}

// Para usar estas tareas ve a la consola y escribe  - gulp compilarSASS o la tarea que quieras

exports.compilarSASS = compilarSASS;
// exports.minificarSASS = minificarSASS;
exports.images = images;
exports.watchArchivos = watchArchivos;
exports.versionWebp = versionWebp;

// Funcion por defecto, solo tienes que escribir gulp en la consola para que comience, puedo cambiar series por parallel. Diferencias : - Series, hace tarea por tarea. - Parallel todas las tareas de golpe
exports.default = series(
	compilarSASS,
	compilarJavascript,
	images,
	versionWebp,
	watchArchivos
);
