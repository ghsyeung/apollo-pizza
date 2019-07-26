const {AuthenticationError} = require('apollo-server');

// NEW!!
function isTherePizzaUser(context) {
  const {pizzaUser} = context;
  if (!pizzaUser) {
    throw new AuthenticationError("No pizza user");
  }
  return true;
}

// NEW!!
function safeGuard(logic) {
  return (parent, args, context) => {
    isTherePizzaUser(context);
    return logic(parent, args, context);
  };
}

module.exports = {
  safeGuard,
};
