import { useState } from 'react'
import TransactionTable from '../components/TransactionTable.jsx'

function ReportsPage({ transactions, completedTasks, pendingTasks }) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const invalidRange = startDate && endDate && startDate > endDate
  const filteredTransactions = invalidRange
    ? []
    : transactions.filter((transaction) =>
      (!startDate || transaction.date >= startDate) &&
      (!endDate || transaction.date <= endDate),
    )
  const filteredSalesTotal = filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0)

  return (
    <>
      <h2>Reports</h2>
      <p>Sales can be filtered by date. Task counts show all-time totals.</p>
      <form className="report-filters" onSubmit={(event) => event.preventDefault()}>
        <label>
          Start date
          <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        </label>
        <label>
          End date
          <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </label>
        <button type="button" className="plain-button" onClick={() => { setStartDate(''); setEndDate('') }}>
          Clear dates
        </button>
      </form>
      {invalidRange && <p className="form-error" role="alert">Start date must be on or before end date.</p>}
      <div className="summary-list">
        <p><strong>Sales in range:</strong> ${filteredSalesTotal.toLocaleString('en-US')}</p>
        <p><strong>Transactions in range:</strong> {filteredTransactions.length}</p>
        <p><strong>All-time completed tasks:</strong> {completedTasks}</p>
        <p><strong>All-time pending tasks:</strong> {pendingTasks}</p>
      </div>
      <TransactionTable transactions={filteredTransactions} />
    </>
  )
}

export default ReportsPage
