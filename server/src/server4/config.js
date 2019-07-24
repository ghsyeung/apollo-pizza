const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

function createMiddleware() { 
  const app = express();
  app.set('JWT_SECRET', process.env.JWT_SECRET || 'keyboardcat')
  app.set('JWT_COOKIE_NAME', 'pizza-token')

  app.use(cookieParser())

  if (process.env.NODE_ENV === 'development') {
    const corsConfig = {
      // FIXME: change this when we have a fixed client
      origin: '*',
      credentials: true
    }
    app.set('CORS_CONFIG', corsConfig)
    // Allow requests from dev server address
    app.use(cors(corsConfig))
  }

  return app;
}

module.exports = {
  createMiddleware,
};
