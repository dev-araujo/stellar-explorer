import { Horizon } from '@stellar/stellar-sdk';

const URL = process.env.NEXT_PUBLIC_HORIZON_URL;
if (!URL) {
  throw new Error('NEXT_PUBLIC_HORIZON_URL is not defined');
}
const server = new Horizon.Server(URL, { allowHttp: true });

export const fetchAccount = async (accountId: string) => {
  return server.loadAccount(accountId);
}

export const fetchTransaction = async (txId: string) => {
  const res = await fetch(`${URL}/transactions/${txId}`);
  if (!res.ok) throw new Error('Transaction not found');
  return res.json();
};

export const fetchLedger = async (ledgerId: string) => {
  const res = await fetch(`${URL}/ledgers/${ledgerId}`);
  if (!res.ok) throw new Error('Ledger not found');
  return res.json();
};

export const fetchLimitLedger = async () => {
  return server.ledgers().order('desc').limit(5).call()
}

export const createEventSource = () => {
  const eventSource = new EventSource(`${URL}/ledgers?order=asc&cursor=now&limit=5`);

  return eventSource;
};
