const mongoose = require('mongoose');
const Perfume = require('./../models/perfume.model');
const perfumesData = require('./perfumes.json');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/perfumaniac";


mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    return Perfume.create(perfumesData);
  })
  .then((createdPerfumes) => {
    console.log(`Created ${createdPerfumes.length} documents in perfumes collection`);
    return mongoose.connection.close();
  })
  .then(() => console.log('connection closed!'))
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });