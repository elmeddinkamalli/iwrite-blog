import express, { Application, Request, Response, NextFunction } from "express";
import "./winston";
import bodyParser from "body-parser";
import cors from "cors";
import formData from "express-form-data";
import os from "os";

// Application main configuration file
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

const app: Application = express();

app.set("port", process.env.PORT);
app.use(bodyParser.json({ limit: "1gb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "1gb" }));
// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());
app.use("/uploads", express.static("uploads"));

app.use(cors());
app.use(require("../route"));

app.all("/*", (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, x-auth-token, x-l10n-locale, Cache-Control, timeout"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

export default app;
