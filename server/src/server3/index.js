const { ApolloServer, gql } = require('apollo-server');
const schema = require('./schema');
const Query = require('./api/query');
const Mutation = require('./api/mutation');
const Order = require('./api/order');

function run() {
  const typeDefs = schema;

  const resolvers = {
    Query,
    Mutation,
    Order,
  };

  // In the most basic sense, the ApolloServer can be started
  // by passing type definitions (typeDefs) and the resolvers
  // responsible for fetching the data for those types.
  const server = new ApolloServer({ typeDefs, resolvers });

  // This `listen` method launches a web-server.  Existing apps
  // can utilize middleware options, which we'll discuss later.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

module.exports = {
  run
};
