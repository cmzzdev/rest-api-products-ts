import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";

export async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    // console.log(colors.bgGreen.bold("Successfull Database connection"));
  } catch (error) {
    console.log(error);
    console.log(colors.bgRed.white("Error to try the Database connection"));
  }
}

connectDB();
const server = express();

// Allow connections
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    console.log(process.env.FRONTEND_URL);
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("CORS Error"));
    }
  },
};

server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan("dev"));

server.use("/api/products", router);

// Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
