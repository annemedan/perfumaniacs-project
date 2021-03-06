const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const perfumeSchema = new Schema(
  {
    name: {type: String, unique: true, required: true},
    manufacturer: {type: String},
    fragrance: {type: [String]},
    composition: {type: [String]},
    image: {type: String }
  },
);

const Perfume = mongoose.model("Perfume", perfumeSchema);

module.exports = Perfume;

