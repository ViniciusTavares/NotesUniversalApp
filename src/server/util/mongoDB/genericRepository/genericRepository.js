/** @module util/mongoDB/genericRepository */

import mongoose from 'mongoose'

let defaultLimit = 10
let defaultPage = 1

class genericRepository {
  constructor(model, populations) {
    this.model = model
    this.populations = populations
    this.connectionFailedMsg = 'Failed to connection to mongoDB'
  }

  findById (id, isLean)  {
    return this.findOne({ _id : id }, isLean)
  }

  findOne (params, isLean) {
    let query = this.model.findOne(params)

    return this.executeFilteringQuery(query, isLean)
  }

  find(params, isLean, limit, page)  {
    limit = limit ? limit * 1 : 10
    page = page ? page * 1 : 1

    let query = this.model.find(params)

    return this.executeFilteringQuery(query, isLean, limit, page)
  }

  create(obj)  {
    obj._id = mongoose.Types.ObjectId()
    return this.update(obj, true)
  }

  update (obj) {
    let promise = new Promise( (resolve, reject) => {
      if(this.validateConnection()) {
        let query = this.model.findOneAndUpdate({'_id': obj._id  },
        obj, {
          setDefaultsOnInsert: true,
          populate: this.populations ? this.populations : '',
          runValidators: true,
          upsert: true,
          new: true
        })

        query.then( (data) => {
          resolve(data)
        }, err => {
          reject(err)
        })
      } else {
        reject(this.connectionFailedMsg)
      }
    }, err => {
      reject(err)
    })
    return promise
  }

  delete (id) {
    return this.model.remove({'_id' : id})
  }

  count(params) {
    if(!this.validateConnection()) {
      return new Promise( (resolve, reject) => {
        reject(this.connectionFailedMsg)
      })
    }

    return this.model.count(params).exec()
  }

  /**
   * It executes queries dynamically returning a promise
   * @param  query  [mongoose's query object]
   * @param  isLean [should return lean data?
   * @param  limi   [pagination limit]
   * @param  page   [pagination current page]
   * @return        [promise]
   */
  executeFilteringQuery(query, isLean, limit, page)  {
    if(!this.validateConnection()) {
      return new Promise( (resolve, reject) => {
        reject(this.connectionFailedMsg)
      })
    }
    limit = limit > 0 ? limit : defaultLimit
    page  = page > 0 ? page : defaultPage
    // page should begins in 1 not 0
    let skip = (limit * page) - limit

    query = this.fillPopulations(query)

    if(isLean) {
      query = query.lean()
    }

    query = query.limit(limit).skip(skip)

    return query.exec()
  }

  /**
  * Fills the populate method through the context populations.
  * @param  query [mongoose's query object]
  * @return       [query]
  */
  fillPopulations(query) {
    if(this.populations && this.populations.length) {
      this.populations.forEach(function (populateObj) {
        query = query.populate(populateObj)
      })
    }

    return query
  }

  validateConnection() {
    return mongoose.connection.readyState > 0 ? true : false
  }
}

export default genericRepository
