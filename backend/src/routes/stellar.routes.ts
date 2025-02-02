import {
  createAccount,
  getAccountDetails,
  getLatestTransactions,
  getTransactionDetails,
} from "../controllers/stellar.controller";

import { Router } from "express";

const router = Router();

router.get("/account/:pubKey", getAccountDetails);
router.get("/transaction/:hash", getTransactionDetails);
router.get("/transactions/latest", getLatestTransactions);
router.post("/account/create", createAccount); // CRIANDO CONTA E ADICIONADO FAKE MONEY

export default router;
