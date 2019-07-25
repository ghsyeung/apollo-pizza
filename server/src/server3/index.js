const { ApolloServer } = require('apollo-server-express');
const { gql } = require('apollo-server');
const express = require('express');

const schema = require('./schema');
const Query = require('./api/query');
const Mutation = require('./api/mutation');
const Order = require('./api/order');

const PORT = process.env.PORT || 4000;

function run() {
  const typeDefs = schema;

  const resolvers = {
    Query,
    Mutation,
    Order,
  };

  const app = express();

  // In the most basic sense, the ApolloServer can be started
  // by passing type definitions (typeDefs) and the resolvers
  // responsible for fetching the data for those types.
  const server = new ApolloServer({ typeDefs, resolvers });

  server.applyMiddleware({app});

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.
  app.listen(PORT, () => {
    console.log(`🚀  Server ready at localhost:${PORT}`);
    console.log(`🚀  Playground ready at localhost:${PORT}/graphql`);
  });
}

module.exports = {
  run
};
