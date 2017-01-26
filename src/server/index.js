import http from 'http';
import httpServer from './config/http-server';
import socket from './config/socket';
import config from './config';
import reducers from '../shared/app/reducers';
//import routes from '../shared/route/Routes';
import createStore from '../shared/app/store';
import routes from '../shared/route/Routes';
import NotFoundPage from '../shared/404/NotFoundPage'

const client ={
  createStore,
  reducers,
  routes,
  NotFoundPage
}

const app = httpServer.create(config.database, client);
const server = http.createServer(app);

// Initializing the socket passing the http server.
new socket().start(server);

server.listen(config.express.port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${config.express.port} [${config.express.env}]`);
});
