/** @module socket/socket */

import socketio from 'socket.io';

let instance = null;

class socket {
  constructor() {
    if(!instance){
      instance = this;
    }
    return instance;
  }

  start(server) {
    this.io = socketio(server);
  }

  registerAnEvent(eventName, cb) {
    this.io.on(eventName, cb);
  }

  registerAnEmission(emissionName, objToEmit) {
    this.io.emit(emissionName, objToEmit);
  };
}

export default socket;
