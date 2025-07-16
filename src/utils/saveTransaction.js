// utils/saveTransaction.js
export function saveTransaction(newTransaction) {
    const existing = JSON.parse(localStorage.getItem("transactions")) || [];
    existing.push(newTransaction);
    localStorage.setItem("transactions", JSON.stringify(existing));
  }
  