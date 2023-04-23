import momentTz from "moment-timezone";
var winston = require("winston");
const { combine, timestamp, prettyPrint } = winston.format;
import "winston-daily-rotate-file";

// Configure winston for data logging
const transport = new winston.transports.DailyRotateFile({
  filename: "logger",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20g",
  maxFiles: "14d",
  dirname: "../logs",
  localTime: true,
});

const getTimeStamp = () =>
  momentTz
    .tz(new Date(), process.env.TIMEZONE || "UTC")
    .format("YYYY-MM-DD HH:mm:ss");

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: getTimeStamp,
    }),
    prettyPrint()
  ),
  transports: [transport],
});

export default logger;
