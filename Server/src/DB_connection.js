require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
// Sequelize ---
const { Sequelize } = require("sequelize");
const defineModelUser = require("./models/User");
const defineModelCharacter = require("./models/Character");

// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`,
  {logging: false, native:false}
);

// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log("Conexion a la DB OK :))");
//   } catch (error) {
//     console.log("No se pudo conectar :((");
//   }
// }

// testConnection();

// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.
defineModelUser(sequelize);
defineModelCharacter(sequelize);

// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
const { User, Character } = sequelize.models;

// N x M
User.belongsToMany(Character, { through: "user_favorite" });
Character.belongsToMany(User, { through: "user_favorite" });

module.exports = {
  User,
  Character,
  connectionTuki: sequelize,
};
