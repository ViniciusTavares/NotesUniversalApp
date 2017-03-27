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
      URI:  process.env.MONGO.URI || 'mongodb://localhost:27017/NotesLiveApp'
    }
  }
}

export default config;
