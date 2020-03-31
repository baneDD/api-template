import winston from "winston";
import "winston-daily-rotate-file";

const { printf, timestamp, combine, colorize, errors, splat, json } = winston.format;

const consoleFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);

const options = {
  file: {
    format: json(),
    level: "http",
    filename: `./logs/s21_slf_location_service.%DATE%.log`,
    datePattern: "YYYY-MM-DD-HH",
    handleExceptions: true,
    json: true,
    maxSize: "20m",
    maxFiles: "14d",
    colorize: false
  },
  console: {
    format: combine(colorize(), consoleFormat),
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    errors({ stack: true }),
    splat()
  ),
  transports: [new winston.transports.DailyRotateFile(options.file)],
  exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'http' log level so the output will be picked up by both transports (file and console)
    logger.http(message);
  }
};

// During development log to console
if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console(options.console));
}

export default logger;
