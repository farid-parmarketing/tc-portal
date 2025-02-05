import mongoose from "mongoose";

const documentsSchema = new mongoose.Schema({
  tradeLicenseNumber: Object,
  msmeNumber: Object,
  cancelledCheque: Object,
  notes: String,
});

const Documents = mongoose.model("document", documentsSchema);

export default Documents;
