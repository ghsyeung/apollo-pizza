const {users, orders, removePassword} = require('../data');

const Query = {
  // NEW!!
  getUsers: (_, __, {pizzaUser}) => {
    if (pizzaUser) {
      return users.map(removePassword);
    }
    throw new AuthenticationError("Cannot get users unless you are logged in");
  },
  // NEW!!
  getOrders: (_, __, {pizzaUser}) => {
    if (pizzaUser) {
      return orders;
    }
    throw new AuthenticationError("Cannot get orders unless you are logged in");
  },
  getUser: (_, {id}) => removePassword(users[+id]),
  whoami: (_, __, {pizzaUser}) => {
    return pizzaUser ? removePassword(users[pizzaUser]) : undefined;
  },
};

module.exports = Query;
