const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

function createExpressApp() {
  const app = express();
  app.use(cookieParser());

  /* only need this when we use a different frontend */
  /*
  if (process.env.NODE_ENV === 'development') {
    const corsConfig = {
      // FIXME: change this when we have a fixed client
      origin: '*',
      credentials: true
    };
    app.set('CORS_CONFIG', corsConfig);
    // Allow requests from dev server address
    app.use(cors(corsConfig));
  }
  */

  return app;
}

const tokenConfig = {
  secret:process.env.JWT_SECRET || 'keyboardcat',
  name: 'pizzaUserToken',
};

module.exports = {
  createExpressApp,
  tokenConfig,
};
