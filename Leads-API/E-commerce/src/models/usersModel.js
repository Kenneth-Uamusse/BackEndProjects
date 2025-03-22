const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

let users = [
  {
    id: uuidv4(),
    name: "Kenneth",
    email: "kenneth@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "Admin",
  },
  {
    id: uuidv4(),
    name: "John Doe",
    email: "jdoe@gmail.com",
    password: bcrypt.hashSync("000000", 10),
    role: "Client",
  },
];

module.exports = {
  getAllUsers: () => users,

  getUserById: (id) => users.find((user) => user.id === id),

  getUserByEmail: (email) => users.find((user) => user.email === email),

  register: (name, email, password) => {
    const userExists = users.find((user) => user.email === email);
    if (userExists) return null;

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role: "Client",
    };

    users.push(newUser);

    return newUser;
  },
};
