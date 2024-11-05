import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.bgGreen.bold("Successfull Database connection"));
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed.white("Error to try the Database connection"));
  }
}
connectDB();
const server = express();

server.use(express.json());

server.use("/api/products", router);

export default server;
