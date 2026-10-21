function TransactionTable({ transactions }) {
  return (
    <div className="table-scroll">
      <table>
        <thead><tr><th>Customer</th><th>Description</th><th>Date</th><th>Method</th><th>Amount</th></tr></thead>
        <tbody>
          {transactions.length === 0 && <tr><td colSpan="5">No transactions found.</td></tr>}
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.customer}</td>
              <td>{transaction.description}</td>
              <td>{transaction.date}</td>
              <td>{transaction.method}</td>
              <td>${transaction.amount.toLocaleString('en-US')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable
