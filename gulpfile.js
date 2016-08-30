'use strict'

let gulp = require('gulp')
let rimraf = require('gulp-rimraf')
let tsc = require('gulp-typescript')
let sourcemaps = require('gulp-sourcemaps')
let tslint = require('gulp-tslint')
let nodemon = require('gulp-nodemon')
let watch = require('gulp-watch')
//var mocha = require('gulp-mocha')
var lab = require('gulp-lab')
var istanbul = require('gulp-istanbul')
var runSequence = require('run-sequence');
var server  = require( 'gulp-develop-server' );
var shell = require('shelljs');

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


// =========== [ TEST ] ===========
gulp.task('test-watch', [], () => {
  process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    process.exit();
  });
  runSequence('compile', 'test')
  gulp.watch([sourceFiles, testFiles, 'gulpfile.js'], function(e) {
    runSequence(
      'compile',
      'test',
      'test-change'
    )
  })
})

/*
 * dirty hack that was needed because nodemon watch target interferes with
 * gulp.watch
 */
gulp.task('test-change', [], () => {
  //var foo = shell.ShellString('hello world');
  //foo.toEnd('change.js');
})

/**
 * Watch for changes in build/test/**
 */
gulp.task('test', [], () => {
  return gulp.src(['build/test/**/*.js'], { read: false })
    .pipe(lab([
      '--verbose',
      '--leaks',
      '--colors',
      '--coverage',
      '--reporter',
      'console',
      '--sourcemaps',
      '--coverage-path',
      'build/src',
      '--silence'
    ]));
})

gulp.task('nodemon', ['compile'], () => {
  nodemon({
    script: entryPoint,
    env: { 'NODE_ENV': 'development' },
    delay: 1000
  })
})
