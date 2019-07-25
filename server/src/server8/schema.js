const { gql } = require('apollo-server');
const schema = gql`
  # NEW!!
  directive @peek on FIELD_DEFINITION
  directive @auth on FIELD_DEFINITION

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
    # NEW!!
    getUsers: [User] 
    getOrders: [Order] @auth
    getUser(id:ID!): User
    whoami: User
  }

  input NewOrder {
    "Toppings on the pizza"
    toppings: [String]!
  }

  type Mutation {
    addOrder(newOrder: NewOrder!): Order
    signUp(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Boolean
    logout: Boolean
    
    # Just for fun
    bake: Int @peek
  }
`;

module.exports = schema;
