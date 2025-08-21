// tests/auth.test.js
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

jest.setTimeout(60000); // Set timeout for individual test file

describe("Auth routes", () => {
  let token;
  let email;
  let username;

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should sign up a new user", async () => {
    email = `test${Date.now()}@example.com`;
    username = `test${Date.now}`;

    const res = await request(app).post("/api/user/signup").send({
      name: "Peroca",
      surname: "Sithole",
      username,
      email,
      password: "Password123!",
      confirmPassword: "Password123!",
      role: "guest",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
    expect(res.body.user.email).toBe(email);
    expect(res.body.user.username).toBe(username);

    token = res.body.accessToken;
  });

  it("should access profile with valid token", async () => {
    // Create a fresh user for this test to avoid dependency on previous test
    const testEmail = `profiletest${Date.now()}@example.com`;
    const testUsername = `profiletest${Date.now()}`;
    const signupRes = await request(app).post("/api/user/signup").send({
      name: "Peroca",
      surname: "Sithole",
      username: testUsername,
      email: testEmail,
      password: "Password123!",
      confirmPassword: "Password123!",
      role: "guest",
    });

    const testToken = signupRes.body.accessToken;

    const res = await request(app)
      .get("/api/user/profile")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(testEmail);
    expect(res.body.username).toBe(testUsername);
  });
});
