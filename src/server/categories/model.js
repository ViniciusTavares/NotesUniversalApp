/** @module categories/model */

import mongoose, { Schema } from 'mongoose';

const model = new Schema({
    name: {
      type: String,
      required: true
    }
});

const create = () => {
   return mongoose.model('categories', model);
}

export default { create };
