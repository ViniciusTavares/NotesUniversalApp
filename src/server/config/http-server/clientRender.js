/** @module config/http-server/clientRender */

import { renderToString } from 'react-dom/server'
import React from 'react'
import { Provider } from 'react-redux'
import { RouterContext } from 'react-router'

const INITIAL_FUNCTION = 'fetchData'

/**
* Returns the initial function of current component
*/
const getComponentInitialFunction = (store, renderProps, history) => {
  let { query } = renderProps.router.location
  let { params  } = renderProps

  let comp = renderProps.components[renderProps.components.length - 1]

  if(comp[INITIAL_FUNCTION]) {
    return comp.fetchData({ query, params, store, history });
  }
  return null
}

/** Get the appropriate response with markup and store state  */
const getResponseWithCurrentStoreState = (res, store, renderProps) => {
  let currentState =   escape(JSON.stringify(store.getState()))

  let markup = renderToString(
    <Provider store={store}>
      { <RouterContext {...renderProps}/> }
    </Provider>
  )


  return res.render('index', {markup, currentState })
}

/** Used for NotFound routes. */
const getResponseForNotFoundRoute = (res, store, NotFoundPage, ) => {
  let currentState =   escape(JSON.stringify(store.getState()))
  let markup = renderToString(<NotFoundPage />)

  return res.status(404).render('index', { markup, currentState })
}


/**
* Executes the initial function as a promise
*/
const executeInitialFunctionAsAPromise = (promise, res, store, renderProps) => {
  promise.then( () => {
    getResponseWithCurrentStoreState(res, store, renderProps)
  })
}

/**
* Execute the initial function normally
*/
const executeInitialFunction = (fn, res, store, renderProps) => {
  fn()

  getResponseWithCurrentStoreState(store, renderProps)
}

/**
* Sends the appropriate response for the requester, processing the markup and the initial state of the Redux store.
* @param  server [a object containing response and request, as well history and location objects]
* @param  store [Redux store already created]
* @param  client [A client config object]
* @param  error [react router error arg]
* @param  redirectLocation [react router redirectLocation arg]
* @param  renderProps [react router renderProps arg]
*/
const sendResponse = (server, store, client, error, redirectLocation, renderProps) =>  {
  let markup

  if (redirectLocation) {
    return server.res.redirect(301, redirectLocation.pathname + redirectLocation.search)
  } else if (error) {
    return server.res.status(500).send(error.message)
  } else if (renderProps == null) {
    return getResponseForNotFoundRoute(server.res, store, client.NotFoundPage)
  } else {
    let initialFunction = getComponentInitialFunction(store, renderProps, server.history)

    if(initialFunction) {
      if(typeof initialFunction.then == 'function') {
        return executeInitialFunctionAsAPromise(initialFunction, server.res, store, renderProps)
      } else {
        return executeInitialFunction(initialFunction, server.res, store, renderProps)
      }
    } else {
      return getResponseWithCurrentStoreState(server.res,store, renderProps)
    }
  }
}

export default sendResponse
