/** @module notes/model */

import mongoose, { Schema } from 'mongoose';

const model = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true
  }
});

const create = () => {
  return mongoose.model('notes', model);
}

export default { create };
