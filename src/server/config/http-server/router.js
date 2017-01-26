/** @module config/http-server/router */

import genericRepository from '../..//util/mongoDB/genericRepository';
import notes from '../../notes';
import categories from '../../categories';

const create = app => {
  let apiPrefix = '/api';
  notes.create(app, apiPrefix, genericRepository);
  categories.create(app, apiPrefix, genericRepository);
}

export default { create }
