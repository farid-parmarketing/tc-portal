import express from "express";
const router = express.Router();
import { login, signup, editProfile } from "../controller/accountController.js";

router.post("/signup", signup);
router.post("/login", login);

router.put("/profile", editProfile);

export default router;
