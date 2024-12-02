const userModel = require('../models/userModel'); // Import model

// Get all users from the database
exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(users);
  });
};

exports.addUser   = (req, res) => {
  const { name, description } = req.body;
  userModel.addUser (name, description, (err, user) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).json(user); // Respond with the newly created user
  });
};