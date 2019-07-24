const { users, orders } = require('../data');

const Query = {
  getUsers: () => users,
  getOrders: () => orders,
  getUser: (id) => users[id],
};

module.exports = Query;
