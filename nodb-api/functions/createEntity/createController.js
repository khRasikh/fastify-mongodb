const schemas = require("../schema");
module.exports = function todoRoutes(app, opts, next) {
  app.post(
    "/api/ghost/create",
    {
      schema: {
        body: schemas.todoInputSchema,
      },
    },
    async function createTodo(request, reply) {
      const todosCollection = app.mongo.db.collection("users");
      const result = await todosCollection.insertOne(request.body);
      reply.code(201);
      return { id: result.insertedId };
    }
  );
  //next
  next();
};
