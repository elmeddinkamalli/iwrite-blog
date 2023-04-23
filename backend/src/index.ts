import { AppDataSource } from "./config/data-source";
import http from "http";
const path = require("path");
global.__basedir = path.join(__dirname, "..");
import { config } from "dotenv";
config();
import app from "./config/app";

AppDataSource.initialize()
  .then(async () => {
    http.createServer(app).listen(app.get("port"), () => {
      console.log(`iWrite is up and running on port ${app.get("port")}`);
    });
  })
  .catch((error) => console.log(error));
