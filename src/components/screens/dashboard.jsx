import { useEffect, useState } from "react"
import { downloadTransactions, getTransactions } from "../../services"
import Table from "../resuable/table"
import { viewAsCurrency } from "../../global/functions"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {

  const auth = JSON.parse(localStorage.getItem("user")) || useSelector((s) => s?.auth)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch()
  }, [])

  function fetch() {
    setIsLoading(true)
    const payload = {
      userId: auth?.user._id
    }
    getTransactions(payload)
      .then((res) => {
        setTransactions(res?.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setIsLoading(false)
      })
  }

  const columns = [
    {
      id: 'date',
      header: 'Date',
      accessor: (row) => new Date(row.createdAt).toLocaleDateString(),
      width: 20
    },
    {
      id: 'time',
      header: 'Time',
      accessor: (row) => new Date(row.createdAt).toLocaleTimeString(),
      width: 20
    },
    {
      id: 'price',
      header: 'Price',
      accessor: (row) => viewAsCurrency(row.totalAmount),
      width: 20
    },
    {
      id: 'totalItems',
      header: 'Total Items',
      accessor: (row) => row.itemList.reduce((ar, cr) => ar += cr.quantity, 0),
      width: 10
    },
    {
      id: 'paymentType',
      header: 'Payment Type',
      accessor: "paymentType",
      width: 10,
      color: ((row) => row.totalAmount > 0 ? "green" : "red")
    },
    {
      id: 'card',
      header: 'Card',
      accessor: "cardType",
      width: 10,
    },
    {
      id: 'status',
      header: 'Status',
      accessor: (() => <><code className="badge bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill">Successful</code></>),
      width: 10,
    }
  ];

  return (
    <>
      <div className="container py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Transactions</h2>
      </div>
      <div className="b-example-divider"></div>
      <Table columns={columns} data={transactions} isLoading={isLoading} onRowClick={(d) => navigate(`${d._id}`, { replace: true })} />
      <button className="btn btn-primary btn-lg add-button" style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 3 }} onClick={() => downloadTransactions()}>
        <i className="bi bi-plus-lg" />
      </button>
    </>

  )
}
export default Dashboard