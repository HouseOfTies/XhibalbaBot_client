import winston from 'winston';
import config from '@/config';
//import { format } from 'path';

const transports = [];
if(process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console()
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs/server.log',
      format: winston.format.combine(
          winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
          winston.format.align(),
          winston.format.printf(error => `${error.level}: ${[error.timestamp]}: ${error.mesage}`),
      )
    })
  );
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports
});

export default LoggerInstance;
