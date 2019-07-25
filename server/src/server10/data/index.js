function removePassword(user) {
  return {
    ...user,
    password: undefined,
  };
}

// NEW!!
const users = [
  {
    name: "Gary",
    email: "gary@red.com",
    password: "$2a$10$4T4qP2cX/HdPHtoO8Ln/ReiBDRx1xDrA/ufw3uT6TH4WHPQ4kuN4q",
  },
  {
    name: "Bob",
    email: "bob@red.com",
    password: "$2a$10$adVGh5tB4K7OzQG6mV62veVuexTnzOpurkBQQa3OuDU6FA99/P07W",
  },
];

const orders = [
  { 
    orderBy: 1,
    toppings: ["pinapple", "ham"],
    isCompleted: false,
  }
];


module.exports = {
  users,
  orders,
  removePassword,
};
