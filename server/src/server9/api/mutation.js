const jwt = require('jsonwebtoken');
const {setCookie, unsetCookie} = require("./util");
const {AuthenticationError} = require('apollo-server');
const {tokenConfig} = require("../config");
const {users, orders} = require('../data');

function generateToken(user, secret) {
  const {id, email,} = user; // Omit the password from the token
  return jwt.sign({id, email,}, secret, {
    expiresIn: '2h'
  });
}

const Mutation = {
  addOrder(_, {newOrder}, {pizzaUser}) {
    if (pizzaUser) {
      orders.push({
        orderBy: +pizzaUser,
        toppings: newOrder.toppings,
        isCompleted: false,
      });
      return orders[orders.length - 1];
    }
    throw new AuthenticationError("Cannot add order unless you are logged in");
  },
  signUp(_, {name, email, password}) {
    users.push({
      name, email, password
    });
    return users[users.length - 1];
  },
  login(_, {email, password}, {req}) {
    // NEW!!
    const userId = users.findIndex(u => u.email === email && u.password === password);
    if (userId !== -1) {
      setCookie({
        name: tokenConfig.name,
        value: generateToken({...users[userId], id: userId}, tokenConfig.secret,),
        res: req.res,
      })
      ;
      return true;
    }
    throw new AuthenticationError("Invalid login!");
  },
  logout(_, __, {req}) {
    unsetCookie({name: tokenConfig.name, res: req.res});
    unsetCookie({name: 'timesBaked', res: req.res});
    return true;
  },
  bake(_, __, {req}) {
    const newTimesBaked = (+req.cookies.timesBaked || 0) + 1;
    setCookie({
      name: 'timesBaked',
      value: newTimesBaked,
      res: req.res,
    });
    return newTimesBaked;
  }
};

module.exports = Mutation;
