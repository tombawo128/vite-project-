function AddRecordForm({ type, onClose, onSubmit }) {
  const title = type === 'customer' ? 'Add customer' : type === 'task' ? 'Add task' : 'Record sale'

  return (
    <div className="modal-overlay">
      <form className="simple-form" onSubmit={onSubmit}>
        <div className="page-title">
          <h2>{title}</h2>
          <button type="button" className="plain-button" onClick={onClose}>Cancel</button>
        </div>

        <label>
          {type === 'task' ? 'Task' : type === 'sale' ? 'Customer or description' : 'Name'}
          <input name="name" required />
        </label>

        {type === 'customer' && (
          <label>Email<input name="email" type="email" /></label>
        )}

        {type === 'task' && (
          <>
            <label>Assign to<input name="assignedTo" /></label>
            <label>Due date<input name="due" type="date" /></label>
          </>
        )}

        {type === 'sale' && (
          <>
            <label>Description<input name="description" /></label>
            <label>Amount<input name="amount" type="number" min="0.01" step="0.01" required /></label>
            <label>
              Payment method
              <select name="method"><option>Card</option><option>Cash</option><option>Transfer</option></select>
            </label>
          </>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default AddRecordForm
