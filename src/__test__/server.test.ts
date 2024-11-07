import { connectDB } from "../server";
import db from "../config/db";

jest.mock("../config/db");
describe("connectDB", () => {
  it("Should handle database connection error", async () => {
    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Error to try the Database connection"));
    const consoleSpy = jest.spyOn(console, "log");
    await connectDB();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error to try the Database connection")
    );
  });
});
