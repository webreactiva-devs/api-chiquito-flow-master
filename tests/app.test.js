import { describe, it } from "node:test";
import assert from "node:assert";
import request from "supertest";
import app from "../src/app.js";

describe("Chiquito API", () => {
  describe("GET /api/jokes", () => {
    it("should return all jokes", async () => {
      const response = await request(app).get("/api/jokes").expect(200);

      assert(Array.isArray(response.body));
      assert(response.body.length > 0);
    });

    it("should filter by category", async () => {
      const response = await request(app)
        .get("/api/jokes?category=classic")
        .expect(200);

      response.body.forEach((joke) => {
        assert.strictEqual(joke.category, "classic");
      });
    });
  });

  describe("GET /api/jokes/random", () => {
    it("should return random joke", async () => {
      const response = await request(app).get("/api/jokes/random").expect(200);

      assert(response.body.id);
      assert(response.body.content);
    });
  });

  describe("GET /api/jokes/:id", () => {
    it("should return specific joke", async () => {
      const response = await request(app).get("/api/jokes/1").expect(200);

      assert.strictEqual(response.body.id, 1);
    });

    it("should return 404 for non-existent ID", async () => {
      const response = await request(app).get("/api/jokes/999").expect(404);

      assert(response.body.error.includes("fistro"));
    });
  });
});
