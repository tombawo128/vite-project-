function ReportsPage({ salesTotal, transactions, completedTasks, pendingTasks }) {
  return (
    <>
      <h2>Reports</h2>
      <p>Summary of the sample business records.</p>
      <div className="summary-list">
        <p><strong>Sales recorded:</strong> ${salesTotal.toLocaleString('en-US')}</p>
        <p><strong>Transactions:</strong> {transactions.length}</p>
        <p><strong>Completed tasks:</strong> {completedTasks}</p>
        <p><strong>Pending tasks:</strong> {pendingTasks}</p>
      </div>
    </>
  )
}

export default ReportsPage
