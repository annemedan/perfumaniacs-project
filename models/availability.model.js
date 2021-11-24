const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const availabilitySchema = new Schema({
  perfume: { type: Schema.Types.ObjectId, ref: 'Perfume' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Available', availabilitySchema);