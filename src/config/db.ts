import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

//?ssl=true at the end of uri connection
const db = new Sequelize(process.env.DB_URL!, {
  models: [__dirname + "/../models/**/*"],
  logging: false,
});

export default db;
