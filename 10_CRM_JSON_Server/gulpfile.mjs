/* Importar funciones de gulp */
import gulp from "gulp";
const { src, dest, watch, parallel, series } = gulp;

//Plugins HTML
import htmlMin from "gulp-htmlmin"; // Minifica HTML

//Plugins para CSS
import postcss from "gulp-postcss"; // Procesa CSS con PostCSS
import autoprefixer from "autoprefixer"; // Agrega prefijos de proveedores a las reglas de CSS
import purgecss from "@fullhuman/postcss-purgecss"; // Limpia estilos CSS no usados
import cssnano from "cssnano"; // Minifica CSS
import tailwindcss from "tailwindcss"; // Framework CSS

// Plugins para JS
import terser from "gulp-terser"; // Minifica JavaScript
// import babel from "gulp-babel"; // Transpila JavaScript con Babel (OPCIONAL)

// Plugins extra
import plumber from "gulp-plumber"; // Maneja errores sin detener el proceso de Gulp
import concat from "gulp-concat"; // Concatena archivos en uno solo
import cacheBust from "gulp-cache-bust"; // Agrega una marca de tiempo a los archivos para evitar problemas de caché
import sourcemaps from "gulp-sourcemaps"; // Genera sourcemaps para facilitar la depuración de código minificado
import browserSync from "browser-sync"; // Crea un servidor de desarrollo y recarga el navegador automáticamente cuando los archivos cambian

const bs = browserSync.create(); // Crea una instancia de BrowserSync

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
    .pipe(plumber())
    .pipe(htmlMin(options))
    .pipe(cacheBust(cacheOptions))
    .pipe(dest(`public/`))
    .pipe(bs.stream()); // Recarga el navegador automáticamente cuando los archivos HTML cambian

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

  const cssPlugins = [
    tailwindcss(`./tailwind.config.js`),
    autoprefixer(),
    purgecss(purgeOptions),
    cssnano(),
  ];

  src(`src/styles/**/*.css`)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(concat(`styles.css`))
    .pipe(postcss(cssPlugins))
    .pipe(sourcemaps.write(`.`))
    .pipe(dest(`public/styles`))
    .pipe(bs.stream()); // Recarga el navegador automáticamente cuando los archivos CSS cambian

  done();
}

/** JS
 * Minifica y genera sourcemaps para todos los archivos JS en `src/js` y los pasa a `public/js`.
 */
export function js(done) {
  /*   const options = {
    presets: ["@babel/preset-env"],
  }; */

  src(`src/js/**/*.js`)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    //.pipe(babel(options))
    .pipe(terser())
    .pipe(sourcemaps.write(`.`))
    .pipe(dest(`public/js`))
    .pipe(bs.stream()); // Recarga el navegador automáticamente cuando los archivos JS cambian

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
