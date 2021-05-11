const express = require("express");
const albumRoutes = require('./routes/album.routes')
require("dotenv").config();
require('./db')

const PORT = process.env.PORT || 5000;
const app = express();



//Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"),
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
  next();
})

//routes
app.use('/api/albums', albumRoutes);

//server
app.listen(PORT, () => {
  console.log(`Le server est lancé sur le port : ${PORT}`);
});
