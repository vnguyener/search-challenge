const path = require('path');
const fs = require('fs');
const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, printf, prettyPrint, errors } = format;
const logDirectory = path.resolve(`${appRoot}`, 'logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const consoleFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

const options = {
  errorfile: {
    level: 'error',
    filename: path.resolve(logDirectory, 'errors-%DATE%.log'),
    handleExceptions: true,
    json: true,
    format: combine(errors({ stack: true }), timestamp(), prettyPrint()),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
  },
  console: {
    level: 'info',
    handleExceptions: true,
    colorize: true,
    format: combine(timestamp(), consoleFormat),
  },
};

const logger = createLogger({
  transports: [
    new transports.DailyRotateFile(options.errorfile),
    new transports.Console(options.console),
    new transports.Http({
      level: 'warn',
      format: format.json(),
    }),
  ],
});

const log = (level, message) => {
  if (process.env.NODE_ENV !== 'test') {
    logger.log({
      level,
      message,
    });
  }
};

module.exports = {
  logger,
  log,
};
