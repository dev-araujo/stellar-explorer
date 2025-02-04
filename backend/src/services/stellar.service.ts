import axios from "axios";
import dotenv from "dotenv";
import { errorMessages } from "../utils/errorHandlers";
dotenv.config();

const BASE_URL = process.env.BASE_URL;

export const getAccountDetails = async (publicKey: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/accounts/${publicKey}`);
    return response.data;
  } catch (error: any) {
    const msgError = errorMessages(`/accounts/${publicKey}`, error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(msgError);
    } else {
      throw new Error(msgError);
    }
  }
};

export const getTransactionDetails = async (hash: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/${hash}`);
    return response.data;
  } catch (error: any) {
    const msgError = errorMessages(`/transactions/${hash}`, error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(msgError);
    } else {
      throw new Error(msgError);
    }
  }
};

export const getLedgerDetails = async (ledgerSeq: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/ledgers/${ledgerSeq}`);
    return response.data;
  } catch (error: any) {
    const msgError = errorMessages(`/ledgers/${ledgerSeq}`, error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(msgError);
    } else {
      throw new Error(msgError);
    }
  }
};
