import CustomerTable from '../components/CustomerTable.jsx'

function CustomersPage({ customers, onAdd, onToggleArchived }) {
  return (
    <>
      <div className="page-title">
        <div><h2>Customers</h2><p>Add and manage customer records.</p></div>
        <button onClick={onAdd}>Add customer</button>
      </div>
      <CustomerTable customers={customers} onToggleArchived={onToggleArchived} />
    </>
  )
}

export default CustomersPage
