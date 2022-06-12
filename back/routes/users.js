const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!user) return res.status(401).send("email ou mot de passe incorrecte");
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return res.header("auth-token", token).json({ token, user });
});

router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) return res.status(409).send("l'email deja existe");
  const newUser = new User({
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const userAdded = await newUser.save();
    res.send(userAdded);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
