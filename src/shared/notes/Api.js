/** @module notes/api */

import axios from 'axios'
import url from 'url'
import { isServerRendering, getBaseUrl } from '../common'

let instance = null;

class notesApi {
  constructor() {
    if(!instance){
      instance = this;
    }

    return instance;
  }


  webApiUrl = isServerRendering()
              ? `${getBaseUrl()}/api/notes`
              : '/api/notes'

  /**
  * [Fetch all notes passing pagination object]
  * @param  pagination [an object that contains page and limit props.]
  * @return            [promise]
  */
  fetch(pagination)  {
    return axios.get( `${this.webApiUrl}?page=${pagination.page}&limit=${pagination.limit}`)
  }

  create(note) {
    return axios.post(this.webApiUrl, note)
  }

  update(note){
    return axios.put(this.webApiUrl, note)
  }

}
export default notesApi;
