import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionDetails } from '../../services';

const TransactionDetail = () => {

  const [data, setData] = useState()
  const { id } = useParams();

  useEffect(() => {
    fetch()
  }, [])

  function fetch() {
    getTransactionDetails({ transactionId: id || "" })
      .then((res) => setData(res?.data))
      .catch((err) => console.error(err))
  }

  return (
    <>
      <div className="container py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Transaction details</h2>
        <div className="b-example-divider"></div>
        <div>
          {/* <Table columns={columns} data={data} isLoading={isLoading} /> */}
        </div>
        <div className='row gap-2 my-4'>
          <button className='col-2 btn btn-primary'>Initiate Refund</button>
          <button className='col-2 btn btn-secondary'>Go back</button>
        </div>
      </div>
    </>
  )
}
export default TransactionDetail