const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["loader", "truckOwner"],
    required: true,
  },
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
