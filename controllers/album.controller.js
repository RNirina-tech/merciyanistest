const AlbumModel = require("../models/album.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllAlbums = async (req, res) => {
    const albums = await AlbumModel.find().select();
    res.status(200).json(albums);
}