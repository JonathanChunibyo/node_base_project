'use strict';
const winston = require('winston');

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
  ],
});

// Check if we are in the development environment
if (process.env.NODE_ENV === 'development') {
  logger.add(
    new winston.transports.File({
      level: 'error',
      filename: 'error.log',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    })
  );
}

module.exports = logger;
