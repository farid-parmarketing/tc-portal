import express from "express";
const router = express.Router();
import { addNewDebtor } from "../controller/debtorController.js";

router.post("/newdebtor", addNewDebtor);

export default router;
