const { AuthenticationError } = require('apollo-server');
const { users, orders } = require('../data');

// NEW!!
function setCookie({ name, value, res }) {
	res.cookie(name, value, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 1000 * 60 * 60 * 2 // 2h
	});
}

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
  login(_, {email, password}) {
    if(users.some(u => u.email === email &&
      u.password === password)) {
      return true;
    }
    throw new AuthenticationError("Invalid login!");
  },
  bake(_, __, { req, timesBaked }) {
    const newTimesBaked = (+timesBaked || 0) + 1;
    setCookie({
      name: 'timesBaked',
      value: newTimesBaked,
      res: req.res,
    });
    return newTimesBaked;
  }
};

module.exports = Mutation;
