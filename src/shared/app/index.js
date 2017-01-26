import React from 'react';
import {render} from 'react-dom';
import AppRoutes from '../route/AppRoutes';
import io from 'socket.io-client';
import createStore from './store';
import {Provider} from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

window.onload = () => {
  let store

  if (window.__PRELOADED_STATE__) {
    try {
      // Grab the state from a global variable injected into the server-generated HTML
      const preloadedState = JSON.parse(unescape(window.__PRELOADED_STATE__))
      // configurar createStore aqui
      store = createStore(preloadedState)
    } catch (e) {
      console.error(e)
    }
  } else {
    store = createStore()
  }

  //const store = configureStore(reduxState)

  render(
    <Provider store={store}>
      {AppRoutes(browserHistory) }
    </Provider>,
    document.getElementById('main')
  )
}
