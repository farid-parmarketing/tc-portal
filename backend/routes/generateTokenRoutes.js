import express from "express";
import GenerateTokenController from "../controller/generateTokenController.js";
const router = express.Router();

router.get("/generatetoken", GenerateTokenController);

export default router;
