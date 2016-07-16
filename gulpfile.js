'use strict'

let gulp = require('gulp')
let rimraf = require('gulp-rimraf')
let tsc = require('gulp-typescript')
let sourcemaps = require('gulp-sourcemaps')
let tslint = require('gulp-tslint')
let nodemon = require('gulp-nodemon')
let watch = require('gulp-watch')
var mocha = require('gulp-mocha')
var istanbul = require('gulp-istanbul')
var runSequence = require('run-sequence');

// /*  Variables */
let tsProject = tsc.createProject('tsconfig.json')
let sourceFiles = 'src/**/*.ts'
let testFiles = 'test/**/*.ts'
let outDir = require('./tsconfig.json').compilerOptions.outDir
let entryPoint = './build/src/server.js'
/**
 * Remove build directory.
 */
gulp.task('clean', function() {
  return gulp.src(outDir, { read: false })
  .pipe(rimraf())
})

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
  return gulp.src(sourceFiles)
  .pipe(tslint())
  .pipe(tslint.report('verbose'))
})

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task('compile', ['clean'], () => {
  let tsResult = gulp.src([sourceFiles, testFiles])
  .pipe(sourcemaps.init())
  .pipe(tsc(tsProject))
  return tsResult.js
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(outDir))
})

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function() {
  runSequence('test')
  watch([sourceFiles, testFiles, 'gulpfile.js'], function(e) {
    runSequence('compile', 'test')
  })
})

/**
 * Build the project.
 */
gulp.task('build', ['compile'], () => {
  console.log('Building the project ...')
})

/**
 * Watch for changes in build/test/**
 */
gulp.task('test', [], () => {
  gulp.src(['build/test/**/*.js'], { read: false })
  .pipe(mocha({ reporter: 'list' }));
  //.once('error', () => {
    //process.exit(1);
  //})
  //.once('end', () => {
    //process.exit();
  //});
})

gulp.task('nodemon', [], () => {
  nodemon({
    script: entryPoint,
    env: { 'NODE_ENV': 'development' }
  })
})
