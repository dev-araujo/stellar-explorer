import { Horizon, Keypair } from "@stellar/stellar-sdk";
import { Request, Response } from "express";

import axios from "axios";

const stellarServer = new Horizon.Server("https://horizon-testnet.stellar.org");

export const getAccountDetails = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.publicKey;
    const account: any = await stellarServer
      .accounts()
      .accountId(accountId)
      .call();
    res.json({
      id: account.id,
      balances: account.balances,
      sequence: account.sequence,
      thresholds: account.thresholds,
      signers: account.signers,
      data: account.data,
    });
  } catch (error) {
    res.status(404).json({ error: "Account not found" });
  }
};

export const getTransactionDetails = async (req: Request, res: Response) => {
  try {
    const hash = req.params.hash;
    const transaction: any = await stellarServer
      .transactions()
      .transaction(hash)
      .call();
    res.json({
      id: transaction.id,
      ledger: transaction.ledger_attr,
      created_at: transaction.created_at,
      source_account: transaction.source_account,
      fee_paid: transaction.fee_paid,
      operation_count: transaction.operation_count,
      memo: transaction.memo,
      result_xdr: transaction.result_xdr,
    });
  } catch (error) {
    res.status(404).json({ error: "Transaction not found" });
  }
};

export const getLatestTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await stellarServer
      .transactions()
      .order("desc")
      .limit(20)
      .call();
    res.json(transactions.records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const createAccount = async (_req: Request, res: Response) => {
  try {
    const keypair = Keypair.random();
    const publicKey = keypair.publicKey();

    const response = await axios.get(
      `https://friendbot.stellar.org?addr=${publicKey}`
    );

    if (response.status !== 200) {
      throw new Error("Falha ao fundir a conta via Friendbot");
    }

    res.json({
      message: "Conta criada com sucesso na testnet",
      publicKey: publicKey,
      secretKey: keypair.secret(),
      explorerLink: `https://stellar.expert/explorer/testnet/account/${publicKey}`,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Erro na criação da conta",
      details: error.message,
    });
  }
};
