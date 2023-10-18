const request = require("supertest");
const { app } = require("../../index");
const { mongodisconnect, mongo } = require("../../services/mongo");
describe("Api Test", () => {
  beforeAll(async () => {
    try {
      await mongo(); // Ensure that the MongoDB connection is successfully established
    } catch (error) {
      console.error("MongoDB connection error:", error);
    }
  });
  afterAll(async () => {
    await mongodisconnect(); // Ensure that the MongoDB connection is successfully established
  });
  describe("Test Get/launches", () => {
    test("It should respond", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("content-type", /json/)
        .expect(200);
    });
  });
  describe("Test Post/launches", () => {
    const launchdata = {
      mission: "test",
      rocket: "test",
      destination: "test",
      launchdate: "January 12, 2023",
      customer: ["ZTM", "Nasa"],
      upcoming: true,
      success: true,
    };
    const launchdatawithoutdate = {
      mission: "test",
      rocket: "test",
      destination: "test",
      customer: ["ZTM", "Nasa"],
      upcoming: true,
      success: true,
    };
    test("Post launch", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchdata)
        .expect("content-type", /json/)
        .expect(200);
      const requestdate = new Date(launchdata.launchdate).valueOf();
      const responsedate = new Date(response.body.launchdate).valueOf();
      expect(requestdate).toBe(responsedate);
      expect(response.body).toMatchObject(launchdatawithoutdate);
    });
    test("post error launch", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchdatawithoutdate)
        .expect("content-type", /json/)
        .expect(400);
      expect(response.body).toStrictEqual({ error: "invalid input" });
    });
  });
});
