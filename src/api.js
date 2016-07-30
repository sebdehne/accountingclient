export const fetchAccounts = function (fn) {
  fetchJson('/accounting/v1/accounts', fn);
};

export const fetchPayees = function (fn) {
  fetchJson('/accounting/v1/parties', fn);
};

export const fetchCategories = function (fn) {
  fetchJson('/accounting/v1/categories', fn);
};

export const fetchJson = function (url, fn) {
  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      fn(json);
    })
    .catch(function (ex) {
      throw ex;
    });
}