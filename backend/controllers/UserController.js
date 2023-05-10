const users = require("../models/UserModel.js");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find({});
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const user = new users({
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await users.findById(req.params.id);
    if (user) {
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;

      const updatedUser = await user.save();
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await users.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
