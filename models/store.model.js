const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    name: [ { type: Schema.Types.ObjectId, ref: "Perfume" }],
    availability: {type: Boolean},
    size: {type: [Number]},
  },
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;

