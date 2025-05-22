import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://customer.tauruscreditmanagement.ae",
    ],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

import dotenv from "dotenv";
dotenv.config();

import connectToDatabase from "./database/connection.js";
connectToDatabase();

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/public", express.static(path.join(__dirname, "public")));

import zohoRoute from "./controller/zoho.js";
app.use("/", zohoRoute);

import documentRoute from "./routes/documents.js";
app.use("/", documentRoute);

app.get("/", (req, res) => {
  res.send("Taurus Collection Portal");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
