export function loadTransactions(accountId, offset, whenDone) {
  return {
    type: 'LOAD_NEXT_TRANSACTIONS',
    accountId: accountId,
    offset: offset,
    whenDone: whenDone
  };
}

export function setTransactions(transactions, replaceAll) {
  return {
    type: 'SET_TRANSACTIONS',
    data: transactions,
    replaceAll: replaceAll
  }
}