const {users, orders, removePassword} = require('../data');

const Query = {
  // NEW!!
  getUsers: safeGuard(() => users.map(removePassword)),
  getOrders: safeGuard(() => orders),
  getUser: safeGuard((_, {id}) => removePassword(users[+id])),
  whoami: safeGuard((_, __, {pizzaUser}) => {
    return pizzaUser ? removePassword(users[pizzaUser]) : undefined;
  }),
};

module.exports = Query;
