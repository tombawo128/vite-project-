import TaskList from '../components/TaskList.jsx'
import TransactionTable from '../components/TransactionTable.jsx'

function DashboardPage({ customers, tasks, transactions, salesTotal, pendingTasks, onToggleTask, onOpenPage }) {
  return (
    <>
      <h2>Dashboard</h2>
      <p>Welcome back. Here is a summary of your sample business data.</p>
      <div className="summary-list">
        <p><strong>Customers:</strong> {customers.length}</p>
        <p><strong>Sales recorded:</strong> ${salesTotal.toLocaleString('en-US')}</p>
        <p><strong>Pending tasks:</strong> {pendingTasks}</p>
      </div>

      <section>
        <div className="section-title">
          <h3>Tasks to do</h3>
          <button className="small-button" onClick={() => onOpenPage('Tasks')}>View tasks</button>
        </div>
        <TaskList tasks={tasks.slice(0, 4)} onToggle={onToggleTask} />
      </section>

      <section>
        <div className="section-title">
          <h3>Recent transactions</h3>
          <button className="small-button" onClick={() => onOpenPage('Sales')}>View sales</button>
        </div>
        <TransactionTable transactions={transactions.slice(0, 4)} />
      </section>
    </>
  )
}

export default DashboardPage
