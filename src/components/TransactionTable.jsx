function formatDate(value) {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const today = new Date()
  const yesterday = new Date()
  today.setHours(0, 0, 0, 0)
  yesterday.setDate(yesterday.getDate() - 1)
  yesterday.setHours(0, 0, 0, 0)

  if (date.getTime() === today.getTime()) return 'Today'
  if (date.getTime() === yesterday.getTime()) return 'Yesterday'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

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
              <td>{formatDate(transaction.date)}</td>
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
