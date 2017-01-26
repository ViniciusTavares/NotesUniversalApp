/** @module categories/api */

import axios from 'axios'

let instance = null;

class categoriesApi {
  constructor() {
    if(!instance){
      instance = this;
    }
    return instance;
  }


  webApiUrl = '/api/categories'

  /**
  * [Fetch all notes passing pagination object]
  * @param  {obj} pagination [An object containing the current page number and its counting]
  * @return {promise}            [returns a promise]
  */
  fetch()  {
    return axios.get( `${this.webApiUrl}`)
  }
}

export default categoriesApi;
