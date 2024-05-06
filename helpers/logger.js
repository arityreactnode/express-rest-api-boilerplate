const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            filename: 'application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            dirname: './logs',
            maxFiles: '90d'
        })
    ]
});

module.exports = logger;