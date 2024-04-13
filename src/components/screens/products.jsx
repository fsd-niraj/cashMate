import { useEffect, useState } from "react";
import { addItem, deleteItem, getProductList, editItem } from "../../services";
import { viewAsCurrency } from "../../global/functions";
import { Modal, Form, Button } from "react-bootstrap"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Products = () => {

  // const auth = JSON.parse(localStorage.getItem("user")) || useSelector((s) => s?.auth)
  const [itemData, setItemData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [updateItem, setUpdateItem] = useState({
    name: "",
    price: "",
    id: ""
  })
  const [modalTitle, setModalTitle] = useState("")

  useEffect(() => {
    fetch()
  }, [])

  function fetch() {
    getProductList()
      .then((res) => setItemData(res?.data?.list))
      .catch((err) => console.error(err))
  }

  const Card = ({ data }) => {
    return (
      <div className="col user-select-none">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">{viewAsCurrency(data.price) || 0}</p>
            <div className="d-flex gap-2 mb-3">
              <button type="button" className="btn btn-primary" onClick={() => handleEditItem(data)}>
                <i className="bi bi-pencil" />
              </button>
              <button type="button" className="btn btn-danger" onClick={() => handleDeleteItem(data)}>
                <i className="bi bi-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const AddItemModal = ({ name, price, id, isAlert, title }) => {
    const [input, setInput] = useState({ name: name || "", price: price || 0 })
    const onInputChange = (e) => {
      const key = e.target.name;
      const value = e.target.value;
      return setInput({ ...input, [key]: value })
    }
    const handleSaveChanges = () => {
      const payload = {
        name: input.name, price: input.price, productId: id
      }
      if (isEditing) {
        editItem(payload)
          .then((res) => {
            toast.success(res?.data?.message)
            fetch()
          })
          .catch((err) => toast.error(err.data.message))
      } else if (isAlert) {
        deleteItem(payload)
          .then((res) => {
            toast.success(res?.data?.message)
            fetch()
          })
          .catch((err) => toast.error(err.data.message))
      } else {
        addItem(payload)
          .then((res) => {
            toast.success(res?.data?.message)
            fetch()
          })
          .catch((err) => toast.error(err.data.message))
      }
      return setShowModal(false)
    }
    return (
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isAlert ?
            <p>{"Are you sure you want to delete this item?"}</p> :
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Product name</Form.Label>
                <Form.Control type="text" placeholder="Cupboard, pizza, TV..." autoFocus name="name" value={input.name} onChange={(e) => onInputChange(e)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Product price</Form.Label>
                <Form.Control type="number" placeholder="CA$299" autoFocus name="price" value={input.price} onChange={(e) => onInputChange(e)} />
              </Form.Group>
            </Form>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant={isAlert ? "danger" : "primary"} onClick={() => handleSaveChanges()}>
            {isAlert ? "Delete" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const handleAddItem = () => {
    setModalTitle("Add item")
    setShowModal(true)
  }

  const handleEditItem = (data) => {
    setUpdateItem({
      id: data._id,
      name: data.name,
      price: data.price
    })
    setModalTitle("Update item")
    setIsEditing(true)
    setShowModal(true)
  }

  const handleDeleteItem = (data) => {
    setUpdateItem({
      id: data._id
    })
    setModalTitle("Delete item")
    setIsAlert(true)
    setShowModal(true)
  }

  return (
    <>
      <div className="row row-cols-1 row-cols-sm-4 row-cols-md-4 g-3 py-5">
        {itemData?.length > 0 ? itemData.map((d, i) =>
          <Card key={i} data={d} />
        ) : <p className="mt-4 h5 text-center w-100">No Data to show</p>}
      </div>
      <button className="btn btn-primary btn-lg add-button" style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 3 }} onClick={() => handleAddItem()}>
        <i className="bi bi-plus-lg" />
      </button>
      <AddItemModal name={updateItem.name} price={updateItem.price} id={updateItem.id} title={modalTitle} isAlert={isAlert} />
    </>
  )
}
export default Products;