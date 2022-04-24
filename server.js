require("dotenv").config()
require("./config/db");
const express = require("express");
const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

//Users Router
server.use("/users", require("./users/usersRouter"));
//Posts Router
server.use("/posts", require("./posts/postsRouter"))

//Catch all
server.use((req, res, next) => {
    let error = new Error("Resource not found");
    error.status = 404;
    next(error);
});
//Error handler
server.use((err, req, res, next) => {
    res.status(err.status);
    res.send({ status: err.status, message: err.message });
});

server.listen(PORT, (err) => {
    err
        ?
        console.dir(`failed to connect`) :
        console.dir(`server running on http://localhost:${PORT}`);
});