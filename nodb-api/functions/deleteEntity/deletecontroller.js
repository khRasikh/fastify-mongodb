const schemas = require("../schema");
module.exports = function todoRoutes(app, opts, next) {
  app.delete(
    "/api/ghost/delete/:id",
    {
      schema: {
        params: schemas.todoIdSchema,
      },
    },
    async function deleteTodo(request, reply) {
      const todosCollection = this.mongo.db.collection("users");
      const result = await todosCollection.deleteOne({
        _id: this.mongo.ObjectId(request.params.id),
      });
      if (result.deletedCount === 0) {
        const error = new Error("Object not found: " + request.params.id);
        error.status = 404;
        throw error;
      }
      return { id: request.params.id };
    }
  );
  next();
};
