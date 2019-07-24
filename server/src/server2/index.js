const { ApolloServer, gql } = require('apollo-server');

function run() {
  const users = [
    {
      name: "Gary",
      email: "gary@red.com",
      password: "garyrocks",
    },
    {
      name: "Bob",
      email: "bob@red.com",
      password: "ohbob",

    },
  ];

  const orders = [
    { 
      orderBy: 1,
      toppings: ["pinapple", "ham"],
      isCompleted: false,
    }
  ];

  const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type User {
    name: String
    email: String
  }

  type Order {
    orderBy: User
    toppings: [String]
    isCompleted: Boolean
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    getUsers: [User]
    getOrders: [Order]
    getUser(id:ID): [User]
  }

  input NewOrder {
    "ID of the user creating the order"
    orderBy: ID!

    "Toppings on the pizza"
    toppings: [String]!
  }

  type Mutation {
    addOrder(newOrder: NewOrder!): Order

    # NEW!!
    signUp(name: String!, email: String!, password: String!): User
  }
`;

  // Resolvers define the technique for fetching the types in the
  // schema.  We'll retrieve books from the "books" array above.
  const resolvers = {
    Query: {
      getUsers: () => users,
      getOrders: () => orders,
      getUser: (id) => users[id],
    },
    Mutation: {
      addOrder(_, {newOrder}) {
        orders.push({
          orderBy: newOrder.orderBy,
          toppings: newOrder.toppings,
          isCompleted: false,
        });
        return orders[orders.length - 1];
      },

      // NEW!!
      signUp(_, {name, email, password}) {
        users.push({
          name, email, password
        });
        return users[users.length - 1];
      }
    },
    Order: {
      orderBy(order) {
        return users[order.orderBy];
      }
    },
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
