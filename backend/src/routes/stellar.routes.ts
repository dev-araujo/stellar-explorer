import {
  getAccountDetails,
  getLedgerDetails,
  getTransactionDetails,
} from "../controllers/stellar.controller";

import { Router } from "express";

const router = Router();

router.get("/accounts/:pubKey", getAccountDetails);
router.get("/transactions/:hash", getTransactionDetails);
router.get("/ledgers/:ledgerSeq", getLedgerDetails);

export default router;
