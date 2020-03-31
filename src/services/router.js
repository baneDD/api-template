import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swagger_ui_enabled } from "../config/router.js";
import { get as getTodos } from "../controllers/todos.js";

const router = new express.Router();

router.route("/todos/:id?").get(getTodos);

if (swagger_ui_enabled || process.env.NODE_ENV === "development") {
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
