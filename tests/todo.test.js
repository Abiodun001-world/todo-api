import request from "supertest";
import app from "../server.js";

describe("Todo Endpoints", () => {
  it("should create a new todo item", async () => {
    const authResponse = await request(app).post("/api/auth/signin").send({
      email: "test@example.com",
      password: "password123",
    });

    const token = authResponse.body.token;

    const res = await request(app)
      .post("/api/todos")
      .set("Cookie", [`token=${token}`])
      .send({
        title: "Test Todo",
        description: "This is a test todo",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("todo");
  });

  it("should get all todos for the user", async () => {
    const authResponse = await request(app).post("/api/auth/signin").send({
      email: "test@example.com",
      password: "password123",
    });

    const token = authResponse.body.token;

    const res = await request(app)
      .get("/api/todos")
      .set("Cookie", [`token=${token}`]);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("todos");
  });
});
