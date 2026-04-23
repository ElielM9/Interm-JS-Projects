/* Importar funciones de gulp */
import gulp from "gulp";
const { src, dest, watch, parallel, series } = gulp;

// Plugins HTML
import htmlMin from "gulp-htmlmin";

// Plugins de SCSS
import gulpSass from "gulp-sass";
import * as dartSass from "sass-embedded";
const sass = gulpSass(dartSass);

import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import purgecss from "@fullhuman/postcss-purgecss";
import cssnano from "cssnano";

// Plugins JS
import terser from "gulp-terser";

// Plugins extra
import plumber from "gulp-plumber";
import cacheBust from "gulp-cache-bust";
import sourcemaps from "gulp-sourcemaps";

// Plugin para el servidor de desarrollo
import browserSync from "browser-sync";
const server = browserSync.create();

// Funciones

/** Browser Server
 * Inicia un servidor de desarrollo con BrowserSync que sirve los archivos desde la carpeta `public` y recarga el navegador automáticamente cuando los archivos cambian.
 * @param done - Es una función callback que indica a gulp cuando la tarea terminó.
 */
export function browserServer(done) {
  server.init({
    server: {
      baseDir: "public",
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
    .pipe(server.stream());

  done();
}

/** SCSS
 * Toma todos los archivos SCSS en la carpeta src/scss, los compila y concatena en un solo archivo styles.css, agrega prefijos de proveedores  a las reglas de CSS, minifica, y escribe un sourcemap en la carpeta public/styles
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

  src(`src/scss/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss(cssPlugins))
    .pipe(sourcemaps.write(`.`))
    .pipe(dest(`public/styles`))
    .pipe(server.stream());

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
    .pipe(server.stream());

  done();
}

/** Watchers
 * Observa los cambios en los archivos HTML, SCSS, JS, y las imágenes, y ejecuta las tareas correspondientes (html, styles, js, img, vWebp, vAvif) cada vez que se detecta un cambio. Además, recarga el navegador automáticamente cuando los archivos cambian.
 * @param done - Es una función callback que indica a gulp cuando la tarea terminó.
 */
export function watchers(done) {
  watch(`src/views/**/*.html`, html);
  watch(`src/scss/**/*.scss`, styles);
  watch(`src/js/**/*.js`, js);

  done();
}

/* Exportaciones finales */

/** Build
 * Ejecuta las tareas de procesamiento de archivos (html, styles, js) en paralelo para optimizar el rendimiento. Esta tarea se puede ejecutar con el comando `gulp build` o `npm run build` para preparar los archivos para producción.
 */
export const build = series(parallel(html, styles, js));

/** Default
 * Ejecuta la tarea de build para procesar los archivos, luego inicia el servidor de desarrollo con BrowserSync y los watchers para observar los cambios en los archivos. Esta tarea se puede ejecutar con el comando `gulp` o `npm run dev` para iniciar el entorno de desarrollo.
 */
export default series(build, parallel(browserServer, watchers));
