import express from "express";
const router = express.Router();
import { deleteDetails } from "../controller/externalController.js";

router.post("/deletedetails", deleteDetails);

export default router;
