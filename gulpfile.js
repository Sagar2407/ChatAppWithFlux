'use strict';

const gulp = require('gulp');
var $ = require('gulp-load-plugins')();
const path = require('path');
const fs = require('fs');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

// Settings
const RELEASE = !!argv.release;                     // Minimize and optimize during a build?
const AUTOPREFIXER_BROWSERS = [                     // https://github.com/ai/autoprefixer
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

const DEST = './wwwroot';
const src = {};
let watch = false;
let browserSync;

// Clean output directory
gulp.task('clean', function () {
  if (!fs.existsSync(DEST)) {
    fs.mkdirSync(DEST);
  }
  return gulp
    .src(DEST, {read: false})
    .pipe($.rimraf());
});

// Compile Html
gulp.task('pug', () => {
  return gulp
    .src('app/public/index.pug')
    .pipe($.newer(`${DEST}`))
    .pipe($.pug({ locals: null, pretty: true }))
    .pipe(gulp.dest(`${DEST}`));
});

// 3rd party libraries
gulp.task('vendor', function () {
  return gulp.src([
    'node_modules/bootstrap/dist/fonts/**',
    'node_modules/font-awesome/fonts/**'
  ])
    .pipe(gulp.dest(`${DEST}/fonts`));
});

// 3rd Party JavaScript
gulp.task('js', function() {
  src.js = 'app/assets/js/**';
  return gulp.src(src.js)
    .pipe($.if(RELEASE, $.uglify()))
    .pipe(gulp.dest(`${DEST}/js`))
    .pipe($.size({title: 'js'}));
});

gulp.task('fonts', function () {
  return gulp.src([
    'app/assets/fonts/**',
    'node_modules/bootstrap/dist/fonts/**',
    'node_modules/font-awesome/fonts/**'
  ])
    .pipe(gulp.dest(`${DEST}/fonts`));
});

// Static files
gulp.task('assets', function () {
  src.assets = [
    'app/public/*'
  ];
  return gulp.src(src.assets)
    .pipe($.changed('wwwroot'))
    .pipe(gulp.dest('wwwroot'))
    .pipe($.size({title: 'public'}));
});

// Images
gulp.task('images', function() {
  src.images = 'app/assets/images/**';
  return gulp.src(src.images)
    .pipe($.changed(`${DEST}/images`))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(`${DEST}/images`))
    .pipe($.size({title: 'images'}));
});

// CSS style sheets
gulp.task('styles', function () {
  src.styles = 'app/assets/styles/app.less';

  return gulp
    .src(src.styles)
    .pipe($.plumber())
    .pipe($.less({
      sourceMap: !RELEASE,
      sourceMapBasepath: __dirname
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.csscomb())
    .pipe($.if(RELEASE, $.cleanCss()))
    .pipe(gulp.dest(`${DEST}/css`))
    .pipe($.size({title: 'styles'}));
});

// Bundle
gulp.task('bundle', function (cb) {
  let started = false;
  const config = require('./config/webpack.config.js');
  const bundler = webpack(config);

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    !!argv.verbose && $.util.log('[webpack]', stats.toString({colors: true}));

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// Launch a Node.js/hapi server
gulp.task('serve', ['build:watch'], function (cb) {
  src.server = ['app/www/**/*'];

  let started = false;
  const cp = require('child_process');

  let server = (function startup() {

    const child = cp.fork('bin/www', {
      env: Object.assign({NODE_ENV: 'development'}, process.env)
    });

    child.once('message', function (message) {
      if (message.match(/^online$/)) {
        if (browserSync) {
          browserSync.reload();
        }
        if (!started) {
          started = true;

          gulp.watch(src.server, function () {
            $.util.log('Restarting development server.');
            server.kill('SIGTERM');
            server = startup();
          });
          cb();
        }
      }
    });
    return child;
  })();

  process.on('exit', function () {
    server.kill('SIGTERM');
  });
});

// Launch BrowserSync development server
gulp.task('sync', ['serve'], function (cb) {
  browserSync = require('browser-sync');

  browserSync({
    notify: false,
    https: false,
    proxy: 'localhost:8001',
    port: 5001,
  }, cb);

  process.on('exit', function () {
    browserSync.exit();
  });

  gulp.watch(['wwwroot/**/*.*'].concat(
    src.server.map(function (file) {
      return '!' + file;
    })
  ), function (file) {
    browserSync.reload(path.relative(__dirname, file.path));
  });
});

// Build the app from source code
gulp.task('build', ['clean'], function (cb) {
  runSequence(['pug', 'assets', 'js', 'images', 'vendor', 'fonts', 'styles', 'bundle'], cb);
});

// Build and start watching for modifications
gulp.task('build:watch', function (cb) {
  watch = true;
  runSequence('build', function () {
    gulp.watch(src.images, ['images']);
    gulp.watch(src.fonts, ['fonts']);
    gulp.watch(src.styles, ['styles']);
    gulp.watch(src.js, ['js']);
    cb();
  });
});

// The default task
gulp.task('default', ['sync']);
