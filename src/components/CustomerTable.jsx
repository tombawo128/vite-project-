function CustomerTable({ customers, onToggleArchived }) {
  return (
    <div className="table-scroll">
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Total spent</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {customers.length === 0 && <tr><td colSpan="5">No customers found.</td></tr>}
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email || '—'}</td>
              <td>${customer.spent.toLocaleString('en-US')}</td>
              <td>{customer.archived ? 'Archived' : 'Active'}</td>
              <td>
                <button className="small-button" onClick={() => onToggleArchived(customer.id)}>
                  {customer.archived ? 'Restore' : 'Archive'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CustomerTable
