/** @module notes/middleware */

import io from 'socket.io-client'
import { updateNotesArray } from './actions'
import { isServerRendering, getBaseUrl } from '../common'

let eventsInitialized = false

const middleware = store => next => action => {

  if(!eventsInitialized) {
    let socket = io.connect(getBaseUrl())

    socket.on('a-note-has-been-saved', note => {

      store.dispatch(updateNotesArray(note))
    })

    eventsInitialized = true
  }

  return next(action)
}

export default middleware
