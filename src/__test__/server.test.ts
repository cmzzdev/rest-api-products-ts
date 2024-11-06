import request from "supertest";
import server, { connectDB } from "../server";
import db from "../config/db";

describe("GET /api", () => {
  it("Should send back a json response", async () => {
    const res = await request(server).get("/api");
    const mockJson = JSON.stringify({ msg: "from API" });
    expect(res.text).toBe(mockJson);
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).not.toBe(404);
    expect(res.text).not.toBe("abcdefghijklmnopqrstuvwxyz");
  });
});

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
