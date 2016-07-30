export function loadTransactions(accountId, replaceAll) {
  return {
    type: 'LOAD_TRANSACTIONS',
    accountId: accountId,
    replaceAll: replaceAll
  };
}

export function setTransactions(transactions, replaceAll) {
  return {
    type: 'SET_TRANSACTIONS',
    data: transactions,
    replaceAll: replaceAll
  }
}