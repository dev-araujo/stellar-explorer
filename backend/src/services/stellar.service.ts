import axios from "axios";
import { errorMessages } from "../utils/errorHandlers";

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

export const getTransactionDetails = async (hash: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/transactions/${hash}`);
    return response.data;
  } catch (error: any) {
    const msgError = errorMessages(`/accounts/${hash}`, error);

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
    const msgError = errorMessages(`/accounts/${ledgerSeq}`, error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(msgError);
    } else {
      throw new Error(msgError);
    }
  }
};
