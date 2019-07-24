const { AuthenticationError } = require('apollo-server');
const { users, orders } = require('../data');

const Mutation = {
  addOrder(_, {newOrder}) {
    orders.push({
      orderBy: newOrder.orderBy,
      toppings: newOrder.toppings,
      isCompleted: false,
    });
    return orders[orders.length - 1];
  },
  signUp(_, {name, email, password}) {
    users.push({
      name, email, password
    });
    return users[users.length - 1];
  },
  // NEW!!
  login(_, {email, password}) {
    if(users.some(u => u.email === email &&
      u.password === password)) {
      return true;
    }
    throw new AuthenticationError("Invalid login!");
  }
};

module.exports = Mutation;
