const tap = require("tap");
const fastify = require("fastify");
const appModule = require("../index");
const mongoClean = require("mongo-clean");
const { MongoClient } = require("mongodb");
require("dotenv").config();
tap.test("spin up phase - prepare data", async (t) => {
  const c = await MongoClient.connect(process.env.MONGO_URL);
  // await mongoClean(c.db());
  c.close();
});

tap.test("create a record should work accurately", async (t) => {
  const app = fastify();
  app.register(appModule, {
    envData: {
      NODE_ENV: "testing",
      MONGO_URL: process.env.MONGO_URL,
    },
  });
  t.teardown(() => app.close()); // let's close the server after the test

  const response = await app.inject({
    method: "POST",
    url: "/api/ghost",
    payload: {
      text: "Welcome to my New Fastify-Nodb-API",
    },
  });
  console.log(response.statusCode);
  t.equal(response.statusCode, 201);
});

tap.test("create a record should work accurately", async (t) => {
  const app = fastify();
  app.register(appModule, {
    envData: {
      NODE_ENV: "testing",
      MONGO_URL: process.env.MONGO_URL,
    },
  });
  t.teardown(() => app.close()); // let's close the server after the test

  const response = await app.inject({
    method: "POST",
    url: "/api/ghost",
    payload: {
      text: "Welcome to my New Fastify-Nodb-API",
    },
  });
  console.log(response.statusCode);
  t.equal(response.statusCode, 201);
});
