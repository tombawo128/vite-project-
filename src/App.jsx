import { useEffect, useRef, useState } from 'react'
import DashboardPage from './pages/DashboardPage.jsx'
import CustomersPage from './pages/CustomersPage.jsx'
import SalesPage from './pages/SalesPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import Navigation from './components/Navigation.jsx'
import AddRecordForm from './components/AddRecordForm.jsx'
import LoginPage from './pages/login-page.jsx'
import SignUpPage from './pages/sign-up-page.jsx'
import './App.css'

const startingCustomers = [
  { id: 1, name: 'Amara Johnson', email: 'amara.j@email.com', spent: 1240, archived: false },
  { id: 2, name: 'Noah Williams', email: 'noah.w@email.com', spent: 860, archived: false },
  { id: 3, name: 'Olivia Chen', email: 'olivia.c@email.com', spent: 640, archived: false },
  { id: 4, name: 'Ethan Patel', email: 'ethan.p@email.com', spent: 425, archived: false },
  { id: 5, name: 'Mia Thompson', email: 'mia.t@email.com', spent: 310, archived: true },
]

const startingTasks = [
  { id: 1, title: 'Follow up with Amara Johnson', assignedTo: 'Sophia Lee', due: 'Today', done: false },
  { id: 2, title: 'Prepare weekly inventory report', assignedTo: 'Marcus Brown', due: 'Today', done: false },
  { id: 3, title: 'Confirm appointment with Noah', assignedTo: 'Sophia Lee', due: 'Tomorrow', done: false },
  { id: 4, title: 'Send invoice to Olivia Chen', assignedTo: 'James Wilson', due: 'Oct 18', done: true },
]

function dateDaysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const startingTransactions = [
  { id: 1, customer: 'Amara Johnson', description: 'Service package', date: dateDaysAgo(0), method: 'Card', amount: 280 },
  { id: 2, customer: 'Noah Williams', description: 'Monthly membership', date: dateDaysAgo(0), method: 'Cash', amount: 120 },
  { id: 3, customer: 'Olivia Chen', description: 'Consultation', date: dateDaysAgo(1), method: 'Card', amount: 85 },
  { id: 4, customer: 'Ethan Patel', description: 'Product purchase', date: dateDaysAgo(7), method: 'Transfer', amount: 64 },
]

const pageNames = ['Dashboard', 'Customers', 'Sales', 'Tasks', 'Reports']

function App() {
  const [page, setPage] = useState('Dashboard')
  const [customers, setCustomers] = useState(startingCustomers)
  const [tasks, setTasks] = useState(startingTasks)
  const [transactions, setTransactions] = useState(startingTransactions)
  const [search, setSearch] = useState('')
  const [formType, setFormType] = useState('')
  const [message, setMessage] = useState('')
  const messageTimer = useRef(null)
  const [user, setUser] = useState(null)
  const [authView, setAuthView] = useState('login')



  if (!user){
    return authView === 'login' ? (
      <LoginPage 
      onLogin={setUser} onSwitch={()=> 
        setAuthView('signup')} 
        />
    ) : (
      <SignUpPage 
      onSignUp={setUser} 
      onSwitch={()=> setAuthView('login')} 
      />
    )
  }

  const searchText = search.toLowerCase()
  const matchingCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email}`.toLowerCase().includes(searchText),
  )
  const matchingTasks = tasks.filter((task) =>
    `${task.title} ${task.assignedTo}`.toLowerCase().includes(searchText),
  )
  const matchingTransactions = transactions.filter((transaction) =>
    `${transaction.customer} ${transaction.description}`.toLowerCase().includes(searchText),
  )
  const salesTotal = transactions.reduce((total, transaction) => total + transaction.amount, 0)
  const pendingTasks = tasks.filter((task) => !task.done).length
  const completedTasks = tasks.filter((task) => task.done).length

  useEffect(() => () => window.clearTimeout(messageTimer.current), [])

  function notify(text) {
    setMessage(text)
    window.clearTimeout(messageTimer.current)
    messageTimer.current = window.setTimeout(() => setMessage(''), 2500)
  }

  function openPage(nextPage) {
    setPage(nextPage)
    setSearch('')
  }

  function saveRecord(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') || '').trim()

    if (formType === 'customer') {
      setCustomers((current) => [
        { id: Date.now(), name, email: String(formData.get('email') || ''), spent: 0, archived: false },
        ...current,
      ])
      notify('Customer added.')
    } else if (formType === 'task') {
      setTasks((current) => [
        {
          id: Date.now(),
          title: name,
          assignedTo: String(formData.get('assignedTo') || 'Unassigned'),
          due: String(formData.get('due') || 'No due date'),
          done: false,
        },
        ...current,
      ])
      notify('Task added.')
    } else if (formType === 'sale') {
      const amount = Number(formData.get('amount'))
      if (!Number.isFinite(amount) || amount <= 0) {
        notify('Enter an amount greater than zero.')
        return
      }
      setTransactions((current) => [
        {
          id: Date.now(),
          customer: name,
          description: String(formData.get('description') || 'Sale'),
          date: String(formData.get('date') || dateDaysAgo(0)),
          method: String(formData.get('method')),
          amount,
        },
        ...current,
      ])
      notify('Transaction added.')
    }

    setFormType('')
  }

  function toggleCustomer(id) {
    setCustomers((current) => current.map((customer) =>
      customer.id === id ? { ...customer, archived: !customer.archived } : customer,
    ))
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    ))
  }

  function showPage() {
    const sharedData = {
      customers: matchingCustomers,
      tasks: matchingTasks,
      transactions: matchingTransactions,
      salesTotal,
      pendingTasks,
      completedTasks,
      onToggleTask: toggleTask,
      onAddTask: () => setFormType('task'),
    }

    if (page === 'Customers') {
      return <CustomersPage customers={matchingCustomers} onAdd={() => setFormType('customer')} onToggleArchived={toggleCustomer} />
    }
    if (page === 'Sales') {
      const visibleSalesTotal = matchingTransactions.reduce((total, transaction) => total + transaction.amount, 0)
      return <SalesPage transactions={matchingTransactions} salesTotal={visibleSalesTotal} onAdd={() => setFormType('sale')} />
    }
    if (page === 'Tasks') {
      return <TasksPage tasks={matchingTasks} onAdd={() => setFormType('task')} onToggleTask={toggleTask} />
    }
    if (page === 'Reports') {
      return <ReportsPage transactions={transactions} completedTasks={completedTasks} pendingTasks={pendingTasks} />
    }
    return <DashboardPage {...sharedData} onOpenPage={openPage} />
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Small Business Manager</h1>
          <p>Sample project</p>
        </div>
      </header>

      <Navigation pages={pageNames} currentPage={page} onNavigate={openPage} />

      <main>
        {page !== 'Reports' && (
          <div className="toolbar">
            <label>
              Search {page.toLowerCase()}
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Search ${page.toLowerCase()}...`}
              />
            </label>
          </div>
        )}
        {showPage()}
        <p className="note">Demo only. This app does not save data or connect to a real business.</p>
      </main>

      {formType && <AddRecordForm type={formType} onClose={() => setFormType('')} onSubmit={saveRecord} />}
      {message && <div className="message" role="status">{message}</div>}
    </div>
  )
}

export default App
