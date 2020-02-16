import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { get as getTodos } from "../controllers/todos.mjs";

const router = new express.Router();

router.route("/todos/:id?").get(getTodos);

// If this is a dev environment, enable Swagger UI
if (process.env.NODE_ENV !== "production") {
  const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Docker Development Startup Template API",
        version: "1.0.0",
        description: "An API template to build API servers from using Docker"
      },
      servers: [
        {
          url: "http://localhost:3000/api"
        }
      ]
    },
    apis: ["./controllers/*.mjs"]
  };

  const specs = swaggerJsdoc(options);

  router.use("/docs", swaggerUi.serve);
  router.get("/docs", swaggerUi.setup(specs, { explorer: true }));
}

export default router;
