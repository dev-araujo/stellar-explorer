import * as StellarService from "../services/stellar.service";

import { Request, Response } from "express";

import { errorHandler } from "../utils/errorHandlers";

export const getAccountDetails = async (req: Request, res: Response) => {
  try {
    const publicKey = req.params.pubKey;
    const account = await StellarService.getAccountDetails(publicKey);
    res.json(account);
  } catch (error: unknown) {
    errorHandler(error, res, "getAccountDetails");
  }
};

export const getTransactionDetails = async (req: Request, res: Response) => {
  try {
    const hash = req.params.hash;
    const transaction = await StellarService.getTransactionDetails(hash);
    res.json(transaction);
  } catch (error: unknown) {
    errorHandler(error, res, "getTransactionDetails");
  }
};

export const getLedgerDetails = async (req: Request, res: Response) => {
  try {
    const ledgerSeq = parseInt(req.params.ledgerSeq, 10);
    const ledger = await StellarService.getLedgerDetails(ledgerSeq);
    res.json(ledger);
  } catch (error: unknown) {
    errorHandler(error, res, "getLedgerDetails");
  }
};
