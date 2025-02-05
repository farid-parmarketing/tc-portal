import express from "express";
const router = express.Router();
import {
  businessDetails,
  bankDetails,
  uploadDocuments,
  confirmDocuments,
} from "../controller/customerDetailsController.js";

import upload from "../middleware/multer.js";

router.post("/businessdetails", businessDetails);
router.post("/bankdetails", bankDetails);
router.post(
  "/uploaddocuments",
  upload.fields([
    { name: "tradeLicenseNumber", maxCount: 5 },
    { name: "msmeNumber", maxCount: 5 },
    { name: "cancelledCheque", maxCount: 5 },
  ]),
  uploadDocuments
);
router.post("/confirmdocuments", confirmDocuments);

export default router;
