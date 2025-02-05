import { Horizon } from '@stellar/stellar-sdk';

// const HORIZON_URL = 'http://136.248.68.75:8000'; // Custom Horizon instance
const HORIZON_URL = 'https://horizon.stellar.org'; // Official Horizon instance
const server = new Horizon.Server(HORIZON_URL, { allowHttp: true });

export const fetchAccount = async (accountId: string) => {
  return server.loadAccount(accountId);
}

export const fetchTransaction = async (txId: string) => {
  const res = await fetch(`${HORIZON_URL}/transactions/${txId}`);
  if (!res.ok) throw new Error('Transaction not found');
  return res.json();
};

export const fetchLedger = async (ledgerId: string) => {
  const res = await fetch(`${HORIZON_URL}/ledgers/${ledgerId}`);
  if (!res.ok) throw new Error('Ledger not found');
  return res.json();
};

export const fetchLimitLedger = async () => {
  return server.ledgers().order('desc').limit(5).call()
}

export const createEventSource = () => {
  const eventSource = new EventSource(`${HORIZON_URL}/ledgers?order=asc&cursor=now&limit=5`);

  return eventSource;
};
