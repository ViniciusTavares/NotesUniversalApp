/** @module notes/actions */

import notesApi from './Api';
import Notifications from 'react-notification-system-redux';

/** ACTIONS  TYPES  */
export const RECEIVE_NOTES = 'RECEIVE_NOTES'
export const NOTE_GOT_SELECTED = 'NOTE_GOT_SELECTED'
export const REQUEST_NOTES = 'REQUEST_NOTES'
export const NOTE_SAVED = 'NOTE_SAVED'

const notesApiInstance = new notesApi()

const receiveNotes = (notes, count) => {
  return {
    type: RECEIVE_NOTES,
    loading:  false,
    notes: notes,
    count: count,
    firstLoad: false
  }
}

const selectNote = (note, formTitle) => {
  return {
    type: NOTE_GOT_SELECTED,
    selectedNote: {... note, category: note.category ? note.category._id : '' },
    formTitle: formTitle
  }
}

const requestNotes = () => {
  return {
    type: REQUEST_NOTES,
    loading: true
  }
}


/**
* Update the current Notes array
* @param note [note object to compare with current note's array]
* @return     [promise]
*/
const updateNotesArray = note => (dispatch, getState) => {
  let state = getState()
  let count = state.notes.count

  let promise = new Promise( (resolve, reject) => {
    let notes = state.notes.data
    let updateIndex
    let foundNote = notes.find( (item, index) => {
      updateIndex = index
      return item._id === note._id
    })

    if(!foundNote) {
      count++
      notes.push(note)
    } else {
      notes[updateIndex] = note
    }

    resolve(notes)
  })

  return promise.then(notes => {
    dispatch(receiveNotes(notes, count))
  })
}

/**
* Fetching notes
* @param   pagination  [an object that contains page and limit props.]
* @return              [promise]
*/
const fetchNotes = pagination => dispatch => {
  {
    dispatch(requestNotes())

    return notesApiInstance.fetch(pagination).then(response => {
      let { notes, count } = response.data

      dispatch(receiveNotes(notes, count))
    }).catch(error => {
      dispatch(receiveNotes([], 0))
      console.error(error)
    })
  }
}

/**
* Create or update the note
* @param   note         [note object to send to the API.]
* @return               [promise]
*/
const saveNote = note => dispatch => {
  let notificationOptions = {
    position: 'br'
  }

  if(!note._id) {
    return notesApiInstance.create(note).then(response =>  {
      notificationOptions.title = 'Succeed'
      notificationOptions.message = 'The note has been created'
      dispatch(Notifications.success(notificationOptions))
    }).catch(error => {
      notificationOptions.title = 'Error'
      notificationOptions.message = 'An error ocurred'
      dispatch(Notifications.error(notificationOptions))
    });
  } else {
    return notesApiInstance.update(note).then(response =>  {
      notificationOptions.title = 'Succeed'
      notificationOptions.message = 'The note has been updated'
      dispatch(Notifications.success(notificationOptions))
    }).catch(error => {
      notificationOptions.title = 'Error'
      notificationOptions.message = 'An error ocurred'
      dispatch(Notifications.error(notificationOptions))
    });
  }
}

export {
  saveNote,
  fetchNotes,
  selectNote,
  updateNotesArray
}
