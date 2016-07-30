export function loadTransactions(accountId) {
  return {
    type: 'LOAD_TRANSACTIONS',
    accountId: accountId
  };
}

export function setTransactions(transactions) {
  return {
    type: 'SET_TRANSACTIONS',
    data: transactions
  }
}