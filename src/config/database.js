const mongoose = require("mongoose"),
    { db } = require("./infoConfig");

const URI = process.env.MONGODB_URI;

mongoose
    .connect(URI, { useNewUrlParser: true })
    .then(db => console.log("DB is connected"))
    .catch(err => console.error(err));

module.exports = mongoose;
