import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import db from "./config/Database.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors({ credentials: true, origin: "http://103.155.246.50:5173" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

const server = http.createServer(app);

try {
  await db.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log(error);
}

server.listen(process.env.PORT, () =>
  console.log("Server listening on port " + process.env.PORT)
);
