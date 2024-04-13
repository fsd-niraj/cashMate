import Catalog from "./catalog"
import Checkout from "./checkout"
import { useSelector } from "react-redux"

const SellingScreen = () => {

  const item = useSelector((s) => s.item)

  return (
    <>
      <div className="container overflow_hid hide_scrollbar">
        <div className="row g-5 w-100">
          {item?.itemList?.length > 0 &&
            <div className="col-md-5 col-lg-4 order-md-last">
              <Checkout />
            </div>
          }
          <div className="col-md-7 col-lg-8 h-100vh py-10">
            <Catalog />
          </div>
        </div>
      </div>
    </>
  )
}
export default SellingScreen