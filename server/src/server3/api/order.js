const { users, orders } = require('../data');

const Order = {
  orderBy(order) {
    return users[order.orderBy];
  }
};

module.exports = Order;
