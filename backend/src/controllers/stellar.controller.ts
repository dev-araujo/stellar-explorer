import * as StellarService from "../services/stellar.service";

import { Request, Response } from "express";

import { errorHandler } from "../utils/errorHandlers";

export const getAccountDetails = async (req: Request, res: Response) => {
  try {
    const publicKey = req.params.pubKey;
    const accountData = await StellarService.getAccountDetails(publicKey);
    res.json(accountData);
  } catch (error: unknown) {
    errorHandler(error, res, "getAccountDetails");
  }
};

export const getAccountBalance = async (req: Request, res: Response) => {
  try {
    const publicKey = req.params.pubKey;
    const accountData = await StellarService.getAccountDetails(publicKey);
    const balanceContent = accountData.balances.length;
    const balance = {
      balance: accountData.balances[balanceContent - 1],
    };
    res.json(balance);
  } catch (error: unknown) {
    errorHandler(error, res, "getAccountBalance");
  }
};

export const getTransactionDetails = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const transaction = await StellarService.getTransactionDetails(hash);
    res.json(transaction);
  } catch (error: unknown) {
    errorHandler(error, res, "getTransactionDetails");
  }
};

export const getLedgerDetails = async (req: Request, res: Response) => {
  try {
    const seq = parseInt(req.params.seq, 10);
    const block = await StellarService.getLedgerDetails(seq);
    res.json(block);
  } catch (error: unknown) {
    errorHandler(error, res, "getLedgerDetails");
  }
};
