const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: {
      type: String,
      ref: "Role",
      String, enum: ['user', 'admin'], default: 'user'
    }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  console.log('----------->', this.email, this.password)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  console.log('Login ----------->', this.username, this.email)
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

