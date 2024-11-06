import { exit } from "node:process";
import db from "../config/db";

/* This is for testing, function to remove all rows in database */
const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log("data removed success");
    exit(0);
  } catch (error) {
    console.log();
    exit(1);
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}
