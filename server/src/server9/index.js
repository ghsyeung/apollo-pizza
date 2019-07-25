const {ApolloServer} = require('apollo-server-express');
const {tokenConfig, createExpressApp} = require('./config');
const {schemaDirectives}  = require("./api/custom-directives");
const jwt = require('jsonwebtoken');

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
    schemaDirectives,

    context: ({req}) => {
      // NEW!!
      const jwtToken = req.cookies[tokenConfig.name];
      const pizzaUser = jwt.decode(jwtToken, tokenConfig.secret);

      // This is what passed into the 3rd argument of all resolvers
      return {
        req,
        // we pass both the token and the decoded user to all resolvers
        // - note that the token may be expired, which we will check in
        //   the @auth directive
        [tokenConfig.name]: req.cookies[tokenConfig.name],
        pizzaUser,
      };
    },
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
