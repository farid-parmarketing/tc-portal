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

import dotenv from "dotenv";
dotenv.config();

import connect from "./database/connection.js";
connect();

app.use(express.static("./public"));

import zohoRoute from "./controller/zoho.js";
app.use("/", zohoRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
