const schemas = require("../schema");
module.exports = function todoRoutes(app, opts, next) {
  app.post(
    "/api/ghost",
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

  app.get("/api/ghost", async function readTodos(request, reply) {
    const todosCollection = app.mongo.db.collection("users");
    const docs = await todosCollection.find().toArray();
    // return docs.map(d =>
    //   // remove the _id field and name it as id
    //   d.id = d._id.toString()
    //   return d
    return docs;
  });

  app.put(
    "/api/ghost/:id",
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

  app.delete(
    "/api/ghost/:id",
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
