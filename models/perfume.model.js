const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const perfumeSchema = new Schema(
  {
    name: {type: String, unique: true, required: true},
    manufacturer: {type: String},
    fragrance: {type: [String]},
    composition: {type: [String]},
    image: {type: String, default: "https://cdn4.iconfinder.com/data/icons/beauty-makeup/100/spray_-_perfume-512.png"}
  },
);

const Perfume = mongoose.model("Perfume", perfumeSchema);

module.exports = Perfume;

