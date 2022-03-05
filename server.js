require("./config/db");
const express = require("express");
const PORT = process.env.PORT || 3000;
const usersRouter = require("./users/usersRouter");

const server = express();
server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

//Users Router
server.use("/users", usersRouter);

//Catch all
server.use((req, res, next) => {
  let error = new Error("Recurso no encontrado");
  error.status = 404;
  next(error);
});
//Error handler
server.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ status: err.status, message: err.message });
});

server.listen(PORT, (err) => {
  err
    ? console.log(`failed to connect`)
    : console.log(`server running on http://localhost:${PORT}`);
});
