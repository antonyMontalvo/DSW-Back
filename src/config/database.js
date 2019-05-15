const mongoose = require("mongoose"),
    { db } = require("./infoConfig");

const URI = `${db.dialect}://${db.host}:${db.port}/${db.database}`;

mongoose
    .connect(URI, { useNewUrlParser: true })
    .then(db => console.log("DB is connected"))
    .catch(err => console.error(err));

module.exports = mongoose;
