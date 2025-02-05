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

app.use(express.static("./public"));

import zohoRoute from "./controller/zoho.js";
app.use("/", zohoRoute);

app.get("/", (req, res) => {
  res.send("Taurus Collection Portal");
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
