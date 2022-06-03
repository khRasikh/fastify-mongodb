module.exports = async function application(app, opts) {
  app.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  app.register(require("@fastify/mongodb"), {
    url: process.env.MONGO_URL,
  });
  await app.register(require("@fastify/env"), {
    schema: {
      type: "object",
      properties: {
        PORT: { type: "integer", default: process.env.PORT },
        NODE_ENV: { type: "string" },
        MONGO_URL: { type: "string" },
      },
    },
  });
  app.register(require("./nodb-api/functions/routes"));
  // app.register(require("./nodb-api/functions/createEntity/createController"));
  // app.register(require("./nodb-api/functions/extendEntity/updateController"));
  // app.register(require("./nodb-api/functions/deleteEntity/deleteController"));
};
