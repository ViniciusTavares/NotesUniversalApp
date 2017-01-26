/** @module notes/notes */

import path from 'path'
import express from 'express'
import model from './model'
import socket from '../config/socket'

const router = express.Router()
const socketInstance = new socket()

const create =  (app, apiPrefix, genericRepository) => {
  let modelCreated = model.create()
  let populations = [{ path: 'category' }]
  let repository = new genericRepository(modelCreated, populations)

  router.route('/')
  .get((req, res) => {
    let fetchPromise = repository.find({}, true, req.query.limit, req.query.page)
    let countPromise = repository.count({})

    Promise.all([fetchPromise, countPromise]).then( values => {
      let notes = values[0]
      let count = values[1]
      let result = count ?  res.send({notes, count}) : res.status(404).send('Not found')

      return result
    }).catch(err => {
      return res.status(500).send(err)
    })
  })
  .put((req, res) => {
    let note = req.body

    let promise =  repository.update(note)

    promise.then(data => {
      socketInstance.registerAnEmission('a-note-has-been-saved', data)
      return res.status(204).send()
    }, err => {
      return res.status(500).send(err)
    })
  })
  .post((req, res) => {
    let note = req.body
    let promise = repository.create(note)

    promise.then(data => {
      socketInstance.registerAnEmission('a-note-has-been-saved', data)
      return res.status(201).send(data)
    }, err => {
      return res.status(500).send(err)
    })
  })

  router.route('/:id').get((req, res) => {
    let promise  = repository.findById(req.params.id)

    promise.then(data => {
      if(data) {
        return res.send(data)
      }
      else {
        res.status(404).send('Not found')
      }
    }, err => {
      return res.status(500).send(err)
    })
  })

  app.use(apiPrefix + '/notes', router)
}

export default {  create }
