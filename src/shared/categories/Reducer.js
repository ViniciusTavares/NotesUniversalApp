/** @module categories/reducer */

import { RECEIVE_CATEGORIES } from './actions'

const categoryReducer =  (state = { data: [] }, action)  => {
  switch(action.type){
    case RECEIVE_CATEGORIES:
    return {...state, data: action.categories}
    default:
    return state
  }
}

export default  categoryReducer
