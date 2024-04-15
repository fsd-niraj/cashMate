import { useDispatch, useSelector } from "react-redux";
import { decrementQty, incrementQty, removeItem, resetItems } from "../../reducers/items.jsx";
import { viewAsCurrency } from "../../global/functions";
import { createTransaction } from "../../services/index.jsx";
import { toast } from "react-toastify";

const Checkout = () => {

  const itemSelector = useSelector((state) => state.item),
    auth = useSelector((state) => state.auth),
    itemList = itemSelector?.itemList,
    dispatch = useDispatch(),
    HST = 13,
    DISCOUNT = 0;

  const ItemDetail = ({ name, price, quantity, id, _id }) => {
    return (
      <>
        {/* <li className="row list-group-item" id={id} key={id}> */}
        <li className="list-group-item d-flex justify-content-between lh-sm user-select-none align-items-center" id={id} key={id}>
          <div className="col-4">
            <h6 className="my-0">{name}</h6>
            <small className="text-body-secondary">x {quantity}</small>
          </div>
          <span className="text-body-secondary col-4">{viewAsCurrency(quantity * price)}</span>
          <div className="btn-group btn-group-sm col-4" role="group" aria-label="Basic outlined example">
            <button type="button" className="btn btn-outline-primary" disabled={quantity == 1} onClick={() => dispatch(decrementQty(_id))}>-</button>
            <button type="button" className="btn btn-outline-danger" onClick={() => dispatch(removeItem(_id))}><i className="bi bi-trash3" /></button>
            <button type="button" className="btn btn-outline-primary" onClick={() => dispatch(incrementQty(_id))}>+</button>
          </div>
        </li>
      </>
    )
  }

  const subTotal = itemList?.reduce((acc, cur) => {
    return acc + cur.price * cur.quantity
  }, 0);

  const pricing = {
    itemTotal: parseInt(subTotal).toFixed(2),
    discount: DISCOUNT,
    addTax: HST,
    netPayable: subTotal + subTotal * HST / 100
  }

  const BreakDownSection = () => {

    const breakDown = [
      { key: "grossTot", title: "Gross Total", amount: pricing.itemTotal },
      { key: "disc", title: "Discount", amount: -pricing.discount },
      { key: "hst", title: "HST", amount: pricing.addTax },
      { key: "netTot", title: "Net Total", amount: pricing.netPayable }
    ];

    return (
      <>
        <ul className="w-100 list-group mt-3">
          {breakDown?.map((data, i) =>
            <li className="list-group-item d-flex justify-content-between lh-sm" key={i}>
              <div>
                <h6 className="my-0">{data?.title}:</h6>
              </div>
              <span className="text-body-secondary">
                {data?.amount}</span>
            </li>
          )}
        </ul>
      </>
    )
  }

  const clearItemReducer = () => {
    dispatch(resetItems())
  }

  const checkoutPayment = () => {
    const payload = {
      itemList: itemList,
      totalAmount: pricing.netPayable.toFixed(2),
      paymentType: "CARD",
      cardType: "VISA",
      status: true
    }
    createTransaction(payload)
      .then((res) => {
        clearItemReducer()
        toast.success(res.message);
      })
      .catch((err) => {
        toast.error(err.message);
      })
  }

  return (
    <>
      <aside className="d-flex w-100 justify-content-between flex-column align-items-center h-100 py-5">
        <div className="w-100 h-100 overflow-a">
          {itemList && itemList?.length > 0 &&
            <ul className="w-100 list-group">
              {itemList && itemList.map((item, index) => (
                <ItemDetail name={item?.name} price={item?.price} quantity={item?.quantity} key={index} id={item?.id} _id={item._id} />
              ))}
            </ul>
          }
        </div>
        <div className="w-100">
          {/* <PromoCodeForm /> */}
          <BreakDownSection />
          <button className="btn btn-primary btn-lg btn-block w-100 py-3 rounded-1 mt-3" disabled={itemList?.length <= 0} onClick={() => checkoutPayment()}>Charge {viewAsCurrency(pricing.netPayable)}</button>
        </div>
      </aside>
    </>
  )
}

export default Checkout