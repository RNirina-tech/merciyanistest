const router = require("express").Router();
const albumContoller = require("../controllers/album.controller");

router.get("/", albumContoller.getAllAlbums);

module.exports = router;
