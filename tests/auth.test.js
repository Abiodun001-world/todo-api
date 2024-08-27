import request from "supertest";
import app from "../server.js";

describe("Auth Endpoints", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
  });

  it("should sign in the user", async () => {
    const res = await request(app).post("/api/auth/signin").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  // Sign-out test
  it("should sign out a user and clear the token", async () => {
    const response = await request(app).post("/api/auth/signout").expect(200);

    expect(response.body.message).toBe("Sign out successful");
  });
});
