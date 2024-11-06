import request from "supertest";
import server, { connectDB } from "../../server";

describe("POST /api/products", () => {
  it("Should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("Should validate that price is greather than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse - testing 1",
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it("Should validate that price numeric and greather than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse - testing 2",
      price: "string test",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(4);
  });

  it("Should create a new Product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse - testing 3",
      price: 70,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("GET /api/products", () => {
  it("Should check if api/products url exists", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).not.toBe(404);
  });
  it("GET JSON response with products", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(3);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  it("Should return a 404 message for a non-existent product", async () => {
    const productId = 2987;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Product not found");
  });
  it("Should check a valid id in the URL", async () => {
    const productId = "not-valid-id";
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("Id no valid");
  });
  it("Should GET a JSON response for a single product", async () => {
    const productId = 1;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/products/:id", () => {
  it("Should check a valid id in the URL", async () => {
    const response = await request(server).put(`/api/products/1`).send({
      name: "Monitor curve",
      availability: true,
      price: 300,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
  it("Should display validation error messages when updating a product", async () => {
    const response = await request(server).put("/api/products/1").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(6);
    expect(response.body.errors).toBeTruthy();
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
  });

  it("Should validate that the price is greather than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor curve",
      availability: true,
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors[0].msg).toBe("No valid price");
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
  });

  it("Should return 404 response for a non-existent product", async () => {
    const response = await request(server).put("/api/products/26457").send({
      name: "Monitor curve 300",
      availability: true,
      price: 300,
    });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBeTruthy();
    expect(response.body.error).toBe("Product not found");
    expect(response.body).not.toHaveProperty("data");
    expect(response.status).not.toBe(200);
  });
});

describe("PATCH /api/products/:id", () => {
  it("Should return 404 response for a non-existing product", async () => {
    const productId = 2678;
    const response = await request(server).patch(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Product not found");
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });
  it("Should update the product availability", async () => {
    const productId = 1;
    const response = await request(server)
      .patch(`/api/products/${productId}`)
      .send({
        availability: false,
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.availability).toBe(false);
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("DELETE /api/products/:id", () => {
  it("Should check a valid ID", async () => {
    const response = await request(server).delete("/api/products/no-valid-id");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].msg).toBe("Id no valid");
  });
  it("Should return a 404 response for a non-existent product", async () => {
    const productId = 2678;
    const response = await request(server).get(`/api/products/${productId}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Product not found");
    expect(response.status).not.toBe(200);
  });
  it("Should delete a product", async () => {
    const response = await request(server).delete("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("Product has been removed");
    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
});
