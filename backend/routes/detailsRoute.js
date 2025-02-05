import expres from "express";
const router = expres.Router();
import {
  noOfDebtors,
  liveInvoices,
  promiseToPay,
  legalCase,
  disputed,
  visited,
  abscond,
  meritsOfCases,
  cashCollected,
  noOfInvoices,
} from "../controller/detailsController.js";

router.post("/noofdebtors", noOfDebtors);
router.post("/liveinvoices", liveInvoices);
router.post("/promisetopay", promiseToPay);
router.post("/legalcase", legalCase);
router.post("/disputed", disputed);
router.post("/visited", visited);
router.post("/abscond", abscond);
router.post("/meritsofcases", meritsOfCases);
router.post("/cashcollected", cashCollected);
router.post("/noofinvoices", noOfInvoices);

export default router;
