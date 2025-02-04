import {
  getAccountBalance,
  getAccountDetails,
  getLedgerDetails,
  getTransactionDetails,
} from "../controllers/stellar.controller";

import { Router } from "express";

const router = Router();

router.get("/accounts/:pubKey", getAccountDetails);
router.get("/balance/:pubKey", getAccountBalance);

router.get("/transactions/:hash", getTransactionDetails);
router.get("/blocks/:seq", getLedgerDetails);

export default router;
