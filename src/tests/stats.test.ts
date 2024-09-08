import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { persistStudySession } from "../controllers/stats";

const app = express();
app.use(express.json());

// Test for persistStudySession controller function
// This test checks that a POST request to /course/:courseId with valid headers and body successfully
// creates or updates the stats and returns a 201 status with the expected response body.
app.post("/courses/:courseId", persistStudySession);

describe("POST to /courses/:courseId", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb");
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should create or update stats and return 201", async () => {
    const response = await request(app)
      .post("/courses/maths")
      .set("xuserid", "Sindhu")
      .send({
        sessionId: "test1",
        totalModulesStudied: 5,
        averageScore: 75,
        timeStudied: 600000,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("sessionId", "test1");
    expect(response.body).toHaveProperty("totalModulesStudied", 5);
    expect(response.body).toHaveProperty("averageScore", 75);
    expect(response.body).toHaveProperty("timeStudied", 600000);
  });
});
