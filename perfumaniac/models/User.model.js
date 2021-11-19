const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {type: { type: String, unique: true}},
    store: { type: Boolean },
    password: {type: String},
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
