const { src, dest, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const { path } = require('./gulp/const')

// function copyVendorCss() {
//   return src(path.srcVendorCss)
//     .pipe(concat(path.vendorCss))
//     .pipe(dest(path.dest))
// }

// function copyVendorJs() {
//   return src(path.srcVendorJs)
//     .pipe(concat(path.vendorJs))
//     .pipe(dest(path.dest));
// }

function cleanDist() {
  return src(path.dest, { read: false, allowEmpty: true }).pipe(clean());
}

function copyHtml() {
  return src(path.srcHtml)
    .pipe(dest(path.dest));
}

function copyCss() {
  return src(path.srcCss)
    .pipe(concat(path.appCss))
    .pipe(dest(path.dest))
}

function copyJs() {
  return src(path.srcJs)
  .pipe(concat(path.appJs))
  .pipe(dest(path.dest));
}

// function copyImages() {
//   return src(path.jqueryUiImg)
//     .pipe(dest(`${path.dest}/images`));
// }

function watchFiles(done) {
  browserSync.init({
    server: {
        baseDir: "./dist",
    }
});

  watch(path.srcHtml, series(copyHtml, reloadBrowser));
  watch(path.srcCss, series(copyCss, reloadBrowser));
  watch(path.srcJs, series(copyJs, reloadBrowser));

  done();
}

function reloadBrowser(done) {
  browserSync.reload();
  done()
}

function taskBuild() {
  return series(
    cleanDist, 
    parallel(
      copyHtml, 
      copyCss, 
      copyJs, 
      // copyVendorCss, 
      // copyVendorJs,
      // copyImages,
    ),
  );
}

function taskServe() {
  return series(taskBuild(), watchFiles)
}

module.exports.build = taskBuild();
module.exports.serve = taskServe();