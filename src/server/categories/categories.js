/** @module categories/categories */

import path from 'path';
import express from 'express';
import model from './model';
import socket from '../config/socket';

const router = express.Router();
const socketInstance = new socket();

const create =  (app, apiPrefix, genericRepository) => {
  let modelCreated = model.create();
  let repository = new genericRepository(modelCreated);

  router.route('/')
  .get((req, res) => {
    let promise = repository.find({}, true);

    promise.then(data => {
      if(data.length) {
        res.send(data);
      }
      else {
        res.status(404).send('Not found');
      }
    });
  })
  .put((req, res) => {
    let category = req.body;

    let promise =  repository.update(category);

    promise.then(data => {
      socketInstance.registerAnEmission('a-category-has-been-saved', data);
      return res.status(204).send();
    }, err => {
      return res.status(500).send(err)
    });
  })
  .post((req, res) => {
    let category = req.body;
    let promise = repository.create(category);

    promise.then(data => {
      socketInstance.registerAnEmission('a-category-has-been-saved', data);
      res.status(201).send(data);
    }, err => {
      res.status(500).send(err);
    });
  });

  router.route('/:id').get((req, res) => {
    let promise  = repository.findById(req.params.id);

    promise.then(data => {
      if(data) {
        return res.send(data);
      }
      else {
        res.status(404).send('Not found');
      }
    }, err => {
      return res.status(500).send(err);
    });
  });

  app.use(apiPrefix + '/categories', router);
}

export default {  create }
