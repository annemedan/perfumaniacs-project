const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const perfumeSchema = new Schema(
  {
    name: {type: String, unique: true, required: true},
    manufacturer: {type: String},
    fragrance: {type: [String]},
    composition: {type: [String]},
    image: {type: String, default: "https://i.pinimg.com/736x/2d/de/97/2dde976ee4e7840dd025dbf86ea633b2.jpg"}
  },
);

const Perfume = mongoose.model("Perfume", perfumeSchema);

module.exports = Perfume;

