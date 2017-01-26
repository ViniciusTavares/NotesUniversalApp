// @module config/config

class config {
  constructor() {

  }

  static get express(){
    return {
      port :  process.env.PORT || 3000,
      env :  process.env.NODE_ENV || 'production'
    }
  }

  static get database() {
    return {
      address: process.env.MONGO.address || 'localhost',
      port: process.env.MONGO.port || '27017',
      database: process.env.MONGO.database || 'LiveFeed'
    }
  }
}

export default config;
