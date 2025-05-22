import express from "express";
import upload from "../middleware/multer.js";
import { uploadDocuments } from "../controller/documents.js";

const router = express.Router();

router.post(
  "/upload",
  upload.fields([
    { name: "pan", maxCount: 1 },
    { name: "aadhar", maxCount: 1 },
    { name: "gst", maxCount: 1 },
    { name: "companyPan", maxCount: 1 },
    { name: "cin", maxCount: 1 },
    { name: "msme", maxCount: 1 },
  ]),
  uploadDocuments
);

export default router;
