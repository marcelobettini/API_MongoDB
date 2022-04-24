//Mongo DB Atlas config and connect
const mongoose = require("mongoose");

const db_uri = process.env.db_uri;

const options = {
    maxPoolSize: 10,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(db_uri, options, (err) => {
    err ? console.log("\033[31m " + err) : console.log("\033[32m 'Mongo DB + Atlas connected OK!'")
})