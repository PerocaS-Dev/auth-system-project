// tests/setup.js
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

jest.setTimeout(30000);

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, { dbName: "testdb" });
});

// REMOVE this afterEach hook - it's deleting your test data causing the 404 error during getProfile
// afterEach(async () => {
//   await mongoose.connection.dropDatabase();
// });

afterAll(async () => {
  // Just close connections without dropping database
  await mongoose.connection.close();
  await mongo.stop();
});
