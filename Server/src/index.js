require("dotenv").config(); // Agrega al objeto "process" en la prop "env" nuestras variables
const { PORT, DB_USER } = process.env;
const { connectionTuki } = require("./DB_connection");

const server = require("./app");

// Servidor ---> Base de datos
// server.listen(PORT, async () => {
//   await connectionTuki.sync({ force: true }); // EN CADA SYNC ELIMINA LAS TABLAS Y SUS REGISTROS Y LAS VUELVE A CREAR
//   // connectionTuki.sync({ alter: true }); // EN CADA SYNC ALTERA LAS TABLAS Y HACE SUS CAMBIOS (si por ej, agregamos un atributo)
//   console.log("DB SYNC");
//   console.log("Server raised in port: " + PORT);
// });

// Base de datos ---> Servidor
connectionTuki
  .sync({ alter: true })
  .then((value) => {
    server.listen(PORT, () => {
      console.log("Server & DDBB Running ✅");
    });
  })
  .catch((err) => console.error(err));
