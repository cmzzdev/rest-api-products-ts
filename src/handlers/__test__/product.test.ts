import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  it("Should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });
  it("Should create a new Product", async () => {
    const mockJson = {
      name: "Mouse - testing",
      price: 70,
    };
    const response = await request(server).post("/api/products").send(mockJson);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("error");
  });
});
