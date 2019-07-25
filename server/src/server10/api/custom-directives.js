const {SchemaDirectiveVisitor, AuthenticationError} = require("apollo-server");
const {tokenConfig} = require('../config');
const {unsetCookie} = require('./util');
const jwt = require('jsonwebtoken');

class DebugMethodDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {name, type, resolve} = field;
    console.log(`== Loading schema... ${name} ${type}`);

    field.resolve = async function (...args) {
      console.log(`== Calling ${name}...`)

      // call the ORIGINAL resolve method
      const result = await resolve.apply(this, args);

      console.log(`== Called ${name}...returns ${JSON.stringify(result, undefined, 2)}`);
      return result;
    };
  }
}

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {name, resolve} = field;
    field.resolve = async function (...args) {
      const [_, __, { pizzaUserToken }] = args;
      // NEW!!
      const isUserAuthenticated = pizzaUserToken !== undefined
        && jwt.verify(pizzaUserToken, tokenConfig.secret);

      // Check if user is authenticated
      if (!isUserAuthenticated) {
        throw new AuthenticationError(`Not Authenticated: ${name}`);
      }


      // call the ORIGINAL resolve method
      return await resolve.apply(this, args);
    };
  }
}

const schemaDirectives = {
  peek: DebugMethodDirective,
  auth: AuthDirective,
};

module.exports = {
  schemaDirectives,
};