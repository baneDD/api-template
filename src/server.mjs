import { initialize as initializeWebServer, close as closeWebServer } from "./services/web-server.mjs";
import { initialize as initializeSqliteDb, close as closeSqliteDb } from "./services/database.mjs";
import logger from "./services/logger.mjs";

const WEB_SERVER = "Web Server";
const SQLITE_DB = "SQLite Database";

startup();

async function startup() {
  logger.info("Starting application");

  await initializeModule(initializeSqliteDb, SQLITE_DB);
  await initializeModule(initializeWebServer, WEB_SERVER);
}

async function initializeModule(initializeFunction, moduleName) {
  try {
    logger.info(`Initializing ${moduleName} module`);
    await initializeFunction();
  } catch (err) {
    logger.error(`Failed to initialize ${moduleName} module - ${err}`);
    process.exit(1);
  }
}

async function shutdown(e) {
  let err = e;

  logger.info("Shutting down");

  err = (await closeModule(closeWebServer, WEB_SERVER)) || err;
  err = (await closeModule(closeSqliteDb, SQLITE_DB)) || err;

  logger.info("Exiting process");

  err ? process.exit(1) : process.exit(0);
}

async function closeModule(closeFunction, moduleName) {
  try {
    logger.info(`Closing ${moduleName} module`);
    await closeFunction();
  } catch (err) {
    logger.error(`Encountered error closing ${moduleName} module - ${err}`);
    return e;
  }
}

process.on("SIGTERM", () => {
  logger.info("Received SIGTERM");

  shutdown();
});

process.on("SIGINT", () => {
  logger.info("Received SIGINT");

  shutdown();
});

process.on("uncaughtException", err => {
  logger.error("Uncaught exception");
  logger.error(err);

  shutdown(err);
});
