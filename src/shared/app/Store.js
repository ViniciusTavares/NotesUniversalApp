/** @module app/store */

import { applyMiddleware, createStore } from 'redux'

import thunk from 'redux-thunk'
import notesMiddleware from '../notes/Middleware'
import reducers from './Reducers'

const middleware = [thunk, notesMiddleware];

const create = initialState => {
  let appliedMiddleware = applyMiddleware(...middleware)
  return createStore(reducers, initialState, appliedMiddleware)
}

export default create
