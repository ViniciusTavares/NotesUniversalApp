/** @module config/http-server/middleware */

const notFound = (req, res) => {
  res.status(404).render('errors/notFound');
}

const enableCors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
}

const  errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    message: err.message,
    error: (process.env.NODE_ENV === 'development' ? err : {})
  });
  next(err);
};

const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) {
    next()
  }
}

export {
  notFound,
  errorHandler,
  enableCors,
  haltOnTimedout
}
