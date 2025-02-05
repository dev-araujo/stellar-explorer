export type InputType = 'account' | 'transaction' | 'ledger' | 'unknown';

export const detectInputType = (input: string): InputType => {
  if (/^[a-zA-Z0-9]{56}$/.test(input)) {
    return 'account';
  }
  if (/^[a-fA-F0-9]{64}$/.test(input)) {
    return 'transaction';
  }
  if (/^\d+$/.test(input)) {
    return 'ledger';
  }
  return 'unknown';
};
