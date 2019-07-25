const {ApolloServer} = require('apollo-server-express');
const {tokenConfig, createExpressApp} = require('./config');

// NEW!!
const {schemaDirectives}  = require("./api/custom-directives");

const PORT = process.env.PORT || 4000;

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

  const app = createExpressApp();

  // In the most basic sense, the ApolloServer can be started
  // by passing type definitions (typeDefs) and the resolvers
  // responsible for fetching the data for those types.
  const server = new ApolloServer({
    typeDefs, resolvers,

    // NEW!!
    schemaDirectives,

    context: ({req}) => ({
      req,
      [tokenConfig.name]: req.cookies[tokenConfig.name],
    }),
  });

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
