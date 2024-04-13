import { useState, useEffect } from "react";
import { getProductList } from "../../services";
import { useDispatch } from "react-redux";
import { addItem } from "../../reducers/items.jsx";
import { viewAsCurrency } from "../../global/functions";
import Spinner from "../resuable/loaders/spinner.jsx";

const Catalog = () => {

  const dispatch = useDispatch();
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetch();
  }, [])

  const fetch = () => {
    setIsLoading(true)
    getProductList()
      .then((res) => {
        setItemList(res?.data?.list)
      })
      .catch((err) => console.error(err))
    setIsLoading(false)
  }

  const addToCheckout = ({ name, price, _id }) => {
    return dispatch(addItem({ name: name, price: price, _id: _id, quantity: 1 }))
  }

  const Item = ({ name, price, _id }) => {

    return (
      <>

        <div className="col user-select-none" onClick={() => addToCheckout({ name, price, _id })}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{viewAsCurrency(price)}</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-4 row-cols-md-4 g-3 py-5">
        {isLoading ? (<Spinner />) :
          itemList?.length > 0 ? itemList.map((val, i) =>
            <Item name={val.name} price={val.price} _id={val._id} key={i} />
          )
            :
            <p className="mt-4 h5 text-center w-100">No Data to show</p>
        }
      </div>
      {/* <Pagination currentPage={page} setCurrentPage={(num) => handlePageChange(num)} totalPages={itemCount} /> */}
    </>
  )
}

export default Catalog;