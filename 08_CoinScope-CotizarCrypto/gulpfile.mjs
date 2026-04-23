/* Importar funciones de gulp */
import gulp from "gulp";
const { src, dest, watch, parallel, series } = gulp;

// Plugins HTML
import htmlMin from "gulp-htmlmin";

import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import purgecss from "@fullhuman/postcss-purgecss";
import cssnano from "cssnano";

// Plugins JS
import terser from "gulp-terser";

// Plugins extra
import plumber from "gulp-plumber";
import concat from "gulp-concat";
import cacheBust from "gulp-cache-bust";
import sourcemaps from "gulp-sourcemaps";

// Plugins para servidor de desarrollo
import browserSync from "browser-sync";
const bs = browserSync.create();

// Funciones

/** Browser Server
 * Inicia un servidor de desarrollo con BrowserSync que sirve los archivos desde la carpeta `public` y recarga el navegador automáticamente cuando los archivos cambian.
 * @param done - Es una función callback que indica a gulp cuando la tarea terminó.
 */
export function browserServer(done) {
  bs.init({
    server: {
      baseDir: "./public",
    },
  });

  done();
}

/** HTML
 * Toma todos los archivos HTML en la carpeta `src/views`, las minimiza, agrega una marca de tiempo al nombre del archivo, y los envía a la carpeta `public`
 * @param done - Esta es una función callback que le dice a gulp cuando la tarea se completó.
 */
export function html(done) {
  const options = {
    collapseWhitespace: true,
    removeComments: true,
  };
  const cacheOptions = {
    type: `timestamp`,
  };

  src(`src/views/**/*.html`)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(htmlMin(options))
    .pipe(cacheBust(cacheOptions))
    .pipe(sourcemaps.write(`.`))
    .pipe(dest(`public/`))
    .pipe(bs.stream());

  done();
}

/** CSS
 * Toma todos los archivos CSS en la carpetasrc/styles, los concatena en un solo archivo styles.css, agrega prefijos de proveedores  a las reglas de CSS, minifica, y escribe un sourcemap en la carpeta public/styles
 * @param done - Es una función callback que indica a gulp cuando la tarea terminó.
 */
export function styles(done) {
  const purgeOptions = {
    content: [`src/views/**/*.html`, `src/js/**/*.js`],
    safelist: {
      keyframes: true, // Mantiene las animaciones CSS
      variables: true, // Mantiene las variables CSS
    },
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [], // Extrae clases, IDs, y otros selectores de los archivos HTML y JS
  };

  const cssPlugins = [autoprefixer(), purgecss(purgeOptions), cssnano()];

  src(`src/styles/**/*.css`)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat(`styles.css`))
    .pipe(postcss(cssPlugins))
    .pipe(sourcemaps.write(`.`))
    .pipe(dest(`public/styles`))
    .pipe(bs.stream());

  done();
}

/** JS
 * Minifica y genera sourcemaps para todos los archivos JS en `src/js` y los pasa a `public/js`.
 */
export function js(done) {
  src(`src/js/**/*.js`)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(dest(`public/js`))
    .pipe(bs.stream());

  done();
}

/**
 * Observa los cambios en el HTML, CSS y las imágenes y corre las tareas respectivas para ejecutar los cambios detectados.
 * @param done - Es una función callback que indica a gulp cuando la tarea terminó.
 */
export function watchers(done) {
  watch(`src/views/**/*.html`, html);
  watch(`src/styles/**/*.css`, styles);
  watch(`src/js/**/*.js`, js);

  done();
}

/* Exportaciones finales */

// La tarea `build` corre las tareas de HTML, CSS, JS, y optimización de imágenes en paralelo, y luego corre la tarea de limpieza de CSS después de que todas las tareas anteriores hayan terminado.
export const build = series(parallel(html, styles, js));

// La tarea `default` corre la tarea de construcción y luego inicia el servidor de desarrollo y el observador de archivos en paralelo.
export default series(build, parallel(browserServer, watchers));
