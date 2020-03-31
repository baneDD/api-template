import { createServer } from "http";
import express from "express";
import morgan from "morgan";
import { port } from "../config/web-server.js";
import router from "./router.js";
import logger from "./logger.js";

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = createServer(app);

    app.use(
      morgan("combined", {
        stream: logger.stream
      })
    );
    app.use("/api", router);

    httpServer
      .listen(port)
      .on("listening", () => {
        logger.info(`Web server listening on localhost:${port}`);

        resolve();
      })
      .on("error", err => {
        reject(err);
      });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close(err => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

export { initialize, close };
