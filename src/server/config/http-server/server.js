/** @module config/http-server/server */

import express from 'express'
import React from 'react'
import bodyParser from 'body-parser'
import path from 'path'
import mongoose from 'mongoose'
import router from './router'
import {createMemoryHistory, match, RouterContext } from 'react-router'
import { errorHandler, enableCors, haltOnTimedout } from './middleware'
import clientRender from './clientRender'
import timeout from 'connect-timeout'

import { createStore } from 'redux'

const create = (databaseConfig, client) => {
  var app = express()

  app.use(bodyParser.json())

  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, './views'))

  // define the folder that will be used for static assets
  app.use(express.static(path.join(__dirname, 'static')))

  // enable cors for all origins.
  app.use(enableCors)

  // timeout middlewares
  app.use(timeout(10000))
  app.use(haltOnTimedout)

  // error mdidleware
  app.use(errorHandler)

  // Creating api routes.
  router.create(app)

  /**
  * Defining default route.
  * As we've been working in a SPA project, all browser's requests should enter here.
  */
  app.get('*', (req, res) => {
    let history = createMemoryHistory(location)
    let store = client.createStore()
    let location = history.createLocation(req.url)
    //https://github.com/ReactTraining/react-router/issues/2292

    match(
      { routes: client.routes, location },
      (error, redirectLocation, renderProps) => {
        let server = { req, res, history, location }
        return clientRender(server, store, client, error, redirectLocation, renderProps)
      })
    })

    startMongoose(databaseConfig)

    return app
  }

  const startMongoose = config => {
    // changing deprecated mongoose's promise (mpromise) to ES6's promises.
    mongoose.Promise = global.Promise

    let  options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

console.log(config.URI)
    mongoose.connect(config.URI, options);
    let conn = mongoose.connection

    conn.on('error', () => {
      console.error.bind(console, 'connection error:')
      console.log(`Connection string: ${config.URI}`)
    })
  }

  export default { create }
