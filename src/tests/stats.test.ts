import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import {
  fetchCourseLifetimeStats,
  getStudySession,
  persistStudySession,
} from "../controllers/stats";
import { Stats } from "../models/stats";

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

// Test for fetchCourseLifetimeStats controller function
// This test checks that a GET request to /course/:courseId with valid headers returns
// aggregated statistics for the specified course and returns a 200 status with the expected response body.

app.get("/courses/:courseId", fetchCourseLifetimeStats);

describe("GET to /courses/:courseId", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb");

    //Adding temporary data to database
    await Stats.create([
      {
        xuserid: "Sindhu",
        courseId: "maths",
        sessionId: "test1",
        totalModulesStudied: 5,
        averageScore: 80,
        timeStudied: 50000,
      },
      {
        xuserid: "Sindhu",
        courseId: "maths",
        sessionId: "test2",
        totalModulesStudied: 2,
        averageScore: 60,
        timeStudied: 30000,
      },
    ]);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should fetch course lifetime stats and return 200", async () => {
    const response = await request(app)
      .get("/courses/maths")
      .set("xuserid", "Sindhu");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty("totalModulesStudied", 7);
    expect(response.body[0]).toHaveProperty("averageScore", 70);
    expect(response.body[0]).toHaveProperty("timeStudied", 80000);
  });
});

// Test for getStudySession controller function
// This test checks that a GET request to /courses/:courseId/sessions/:sessionId with valid headers returns
// a single study session and returns a 200 status with the expected response body.

app.get("/courses/:courseId/sessions/:sessionId", getStudySession);

describe("GET to /courses/:courseId/sessions/:sessionId", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb");

    //Adding temporary data to database
    await Stats.create([
      {
        xuserid: "Sindhu",
        courseId: "maths",
        sessionId: "test1",
        totalModulesStudied: 5,
        averageScore: 80,
        timeStudied: 50000,
      },
      {
        xuserid: "Sindhu",
        courseId: "maths",
        sessionId: "test2",
        totalModulesStudied: 2,
        averageScore: 60,
        timeStudied: 30000,
      },
    ]);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should fetch a specific study session and return 200", async () => {
    const response = await request(app)
      .get("/courses/maths/sessions/test1")
      .set("xuserid", "Sindhu");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("sessionId", "test1");
    expect(response.body).toHaveProperty("totalModulesStudied", 5);
    expect(response.body).toHaveProperty("averageScore", 80);
    expect(response.body).toHaveProperty("timeStudied", 50000);
  });
});
