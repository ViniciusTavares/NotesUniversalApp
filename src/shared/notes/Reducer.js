/** @module notes/reducer */

import {REQUEST_NOTES, RECEIVE_NOTES ,NOTE_GOT_SELECTED, NOTE_SAVED } from './actions'

const noteReducer =  (state = {data: [], loading: false, count: 0, firstLoad: true }, action)  => {
  switch(action.type){
    case REQUEST_NOTES:
    return {...state,
      loading: action.loading
    }
    case RECEIVE_NOTES:
    return {
      ...state,
      data: action.notes,
      formTitle: '',
      selectedNote: {},
      loading: action.loading,
      count: action.count,
      firstLoad: action.firstLoad
    }
    case NOTE_GOT_SELECTED:
    return {
      ...state,
      selectedNote: action.selectedNote,
      formTitle: action.formTitle
    }
    case NOTE_SAVED:
    return {
      ...state
    }
    default:
    return state
  }
}

export default  noteReducer
