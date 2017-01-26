/** @module categories/actions */

import categoriesApi from './api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

const categoriesApiInstance = new categoriesApi()

const receiveCategories = (response) => {
  return {
    type: RECEIVE_CATEGORIES,
    categories: response.data
  }
}

/**
 * Fetching the notes in database
 * @param   pagination         It should contains page and count props.
 * @return                     Retuns the promise of fetching the note list
 */
const fetchCategories = () => dispatch => {
  {
    return categoriesApiInstance.fetch().then(response => {
      dispatch(receiveCategories(response))
    })
  }
}


export  {
  fetchCategories
}
