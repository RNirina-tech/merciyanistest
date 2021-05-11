const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  rating: Number,
  price: Number
});

const AlbumModel = mongoose.model("album", albumSchema);

module.exports = AlbumModel;
