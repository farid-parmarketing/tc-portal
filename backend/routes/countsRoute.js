import expres from "express";
const router = expres.Router();
import { getLengths } from "../controller/countsController.js";

router.post("/getlengths", getLengths);

export default router;
