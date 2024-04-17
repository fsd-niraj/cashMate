import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails, removeUserProfileImage, updateUser, updateUserProfileImage } from "../../services";
import { toast } from "react-toastify";
import { userLogin } from "../../reducers/auth";

const ProfilePage = () => {
  const auth = JSON.parse(localStorage.getItem("user")) || useSelector((s) => s?.auth);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [editData, setEditData] = useState({
    name: "",
    email: ""
  })
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false
  })
  const [profileImage, setProfileImage] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (auth?.isLoggedIn) {
      fetchUserData();
    }
  }, [auth?.isLoggedIn])

  function fetchUserData() {
    getUserDetails()
      .then((res) => {
        setUserData(res?.data)
        setEditData({ name: res?.data?.name, email: res?.data?.email })
        dispatch(userLogin(res?.data))
      })
      .catch((err) => console.error(err));
  }

  function onInputChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setEditData({ ...editData, [key]: value });
  }

  function checkAndUpdate(field) {
    switch (field) {
      case "name":
        if (isEditing.name) {
          updateUser(editData)
        }
        setIsEditing({ ...isEditing, name: !isEditing.name });
        break;
      case "email":
        if (isEditing.email) {
          updateUser(editData)
        }
        setIsEditing({ ...isEditing, email: !isEditing.email });
        break;
      default:
        break;
    }
    if (!editData.name || !editData.email) {
      setEditData({ name: userData.name, email: userData.email })
      return setIsEditing({ name: false, email: false })
    }
  }

  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result)
    }
    setProfileImage(event.target.files[0]);
    return reader.readAsDataURL(event.target.files[0])
  };

  const handleUploadImage = () => {
    if (!profileImage) return toast.error("Please select image to upload")
    const formData = new FormData();
    formData.append("profileImage", profileImage);
    updateUserProfileImage(formData)
      .then(() => fetchUserData())
      .catch((err) => console.error(err))
  }

  const removeImage = () => {
    return removeUserProfileImage()
    .then(()=> {
      setPreview(null)
      setProfileImage(null)
      fetchUserData()
    })
  }

  return (
    <div className="container py-5" id="featured-3">
      <h2 className="pb-2">Profile</h2>
      <div className="text-center mt-2">
        <div>
          {userData?.profileImageUrl ?
            <img src={userData?.profileImageUrl} className="rounded-circle object-fit-cover" width={200} height={200} alt="" /> :
            preview ? <img src={preview} className="rounded-circle object-fit-cover" width={200} height={200} alt="" /> :
              <div style={{ textAlign: "center" }}>
                <i className="bi bi-person-circle display-1" />
              </div>
          }
        </div>
        <div className="mt-3">
          {userData?.profileImageUrl ?
            <button className="btn btn-danger col-md-1" onClick={() => removeImage()}>Remove</button> :
            <div>
              <label htmlFor="file-upload" className="custom-file-upload btn btn-primary me-1">
                +
              </label>
              <input id="file-upload" name="profileImage" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
              <button className="btn btn-primary" onClick={() => handleUploadImage()}>Update</button>
            </div>
          }
        </div>
      </div>
      <div className="mt-5">
        <div className="input-group mb-3">
          <span className="input-group-text">Name</span>
          <input type="text" className="form-control" placeholder="Name" value={editData.name} onChange={(e) => onInputChange(e)} name="name" disabled={!isEditing.name} readOnly={!isEditing.name} />
          <span className="input-group-text" onClick={() => checkAndUpdate("name")}>
            {isEditing.name ?
              <i className="bi bi-check2" />
              :
              <i className="bi bi-pencil-fill" />
            }
          </span>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Email</span>
          <input type="text" className="form-control" placeholder="Email" value={editData.email} onChange={(e) => onInputChange(e)} name="email" disabled={!isEditing.email} readOnly={!isEditing.email} />
          <span className="input-group-text" onClick={() => checkAndUpdate("email")}>
            {isEditing.email ?
              <i className="bi bi-check2" />
              :
              <i className="bi bi-pencil-fill" />
            }
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;
