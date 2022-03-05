//Mongo DB Atlas config and connect
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://fullstack_advanced:ebX7h4pUcETqz8IF@cluster0.akapp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = {
  maxPoolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options).catch((error) => {
  console.log(error);
});

mongoose.connection.on("connected", () =>
  console.log("\033[32m 'Mongo DB + Atlas connected OK!'")
);
mongoose.connection.on("error", (err) => console.log("\033[31m " + err));
