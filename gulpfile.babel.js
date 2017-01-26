import gulp from 'gulp'
import babel from 'gulp-babel'
import connect from 'gulp-connect'
import gutil from 'gulp-util'
import nodemon from 'gulp-nodemon'
import clean from 'gulp-clean'
import webpack from 'webpack'
import webPackWebConfig from './webpack.client.config'
import webPackServerConfig  from './webpack.server.config.js'
import runSequence from 'run-sequence'
import del from 'del'
import path from 'path'

const config = {
  serverEntry: './src/server/**/*.js',
  dest: './build',
  staticFiles: './build/static',
  views: './build/views',
  'bundleScript': './build/bundle.js'
}

gulp.task('clean', () => {
  return del([config.dest]);
})

gulp.task('copy-views', () => {
  gulp.src('./src/server/views/*.ejs')
  .pipe(gulp.dest(config.views))
})

// Copy all static files and views to build folder.
gulp.task('copy-files', ['copy-views'], () => {
  gulp.src('./src/client/static/**/*.*')
  .pipe(gulp.dest(config.staticFiles))
})

// Transpile the ES6 code and generate the server bundle.
gulp.task('build-server', callback => {
  let myConfig = Object.create(webPackServerConfig)

  webpack(myConfig, (err, stats) => {
    if (err)  {
      throw new gutil.PluginError('webpack', err)
    }
    gutil.log('[webpack]', stats.toString({
      colors: true
    }))
    callback()
  })
})

// Transpile the ES6 code and generate the server bundle.
gulp.task('build-web', callback => {
  let myConfig = Object.create(webPackWebConfig)

  webpack(myConfig, (err, stats) => {
    if (err)  {
      throw new gutil.PluginError('webpack', err)
    }
    gutil.log('[webpack]', stats.toString({
      colors: true
    }))
    callback()
  })
})

gulp.task('start-server', () => {
  console.log(path.join(__dirname, 'build', 'bundle.js'))

  let stream = nodemon({
    script: config.bundleScript
    , ext: 'js'
  })

  stream.on('restart', function () {
    console.log('Server has been restarted!')
  })
  .on('crash', function() {
    console.error('Application has crashed!\n')
    stream.emit('restart', 10)
  })
})


gulp.task('default', callback => {
  runSequence('clean', 'copy-files', ['build-web', 'build-server'], 'start-server', callback);

  gulp.watch('./src/shared/**/*.js',['build-web', 'build-server'])
  gulp.watch('./src/server/**/*.js',['build-server'])
})
