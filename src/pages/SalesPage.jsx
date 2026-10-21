import TransactionTable from '../components/TransactionTable.jsx'

function SalesPage({ transactions, salesTotal, onAdd }) {
  return (
    <>
      <div className="page-title">
        <div><h2>Sales</h2><p>Record sales and view transaction history.</p></div>
        <button onClick={onAdd}>Record sale</button>
      </div>
      <p className="total-line"><strong>Total for shown transactions:</strong> ${salesTotal.toLocaleString('en-US')}</p>
      <TransactionTable transactions={transactions} />
    </>
  )
}

export default SalesPage
