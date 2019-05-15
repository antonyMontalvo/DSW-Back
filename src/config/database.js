const mongoose = require("mongoose"),
    config = require("./config");

const URI = `${config.db.dialect}://${config.db.host}:${config.db.port}/${config.db.database}`;

mongoose
    .connect(URI, { useNewUrlParser: true })
    .then(db => console.log("DB is connected"))
    .catch(err => console.error(err));

module.exports = mongoose;
// {
//     "name": "Antony Abel",
//     "password": 987654321,
//     "credential": "admin"
//   }