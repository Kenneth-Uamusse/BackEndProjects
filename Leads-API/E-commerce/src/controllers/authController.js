const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  //POST /auth/register
  register: (req, res) => {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "Invalid fields!!" });
    }

    const user = usersModel.register(name, email, password);
    if (!user) return res.status(401).json({ message: "Email already in use" });

    res.status(200).json(user);
  },

  //POST /auth/login
  login: (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string")
      return res.status(400).json({ message: "Invalid Fields" });

    const user = usersModel.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found!!" });

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!!" });

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1d" });

    res.json({ token });
  },
};
