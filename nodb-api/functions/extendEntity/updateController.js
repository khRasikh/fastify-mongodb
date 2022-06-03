const schemas = require("../schema");
module.exports = function todoRoutes(app, opts, next) {
  app.put(
    "/api/ghost/update/:id",
    {
      schema: {
        params: schemas.todoIdSchema,
        body: schemas.todoUpdateSchema,
      },
    },
    async function updateTodo(request, reply) {
      const todosCollection = app.mongo.db.collection("users");
      const result = await todosCollection.updateOne(
        { _id: this.mongo.ObjectId(request.params.id) },
        {
          $set: {
            done: request.body.done,
            doneAt: request.body.done === true ? new Date() : null,
          },
        }
      );

      // returns 404 is the todo is not found
      if (result.matchedCount === 0) {
        const error = new Error("Object not found: " + request.params.id);
        error.status = 404;
        throw error;
      }
      return { id: request.params.id };
    }
  );
  next();
};
