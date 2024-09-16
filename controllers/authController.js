const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    username,
    email,
    password,
    role: "user",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const authUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: password,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user._id; // req.user debería estar poblado por el middleware de autenticación
    const user = await User.findById(userId).select("-password"); // Excluir el campo de password
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({
      _id: user._id,
      username: user.username,   // Información del usuario autenticado
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = (req, res) => {
  // Si estás utilizando cookies para manejar el token JWT
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Establecer la cookie para que expire inmediatamente
  });

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { registerUser, authUser, getUserInfo, logoutUser };

