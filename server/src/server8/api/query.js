const { users, orders, removePassword } = require('../data');

const Query = {
  getUsers: () => users.map(removePassword),
  getOrders: () => orders,
  getUser: (_, {id}) => removePassword(users[+id]),
  whoami: (_, __, {pizzaUser}) => {
    return pizzaUser ? removePassword(users[pizzaUser]) : undefined;
  },
};

module.exports = Query;
