import axios from "axios";
import { toast } from "react-toastify";

const userData = JSON.parse(localStorage.getItem("user"));

const Axios = axios.create({
  baseURL: "http://localhost:5173",
  headers: { Authorization: `Bearer ${userData?.accessToken}` }
})

Axios.interceptors.request.use(async (req) => {
  if (userData?.accessToken) req.headers.authorization = `Bearer ${userData.accessToken}`;
  // if (userData?.user?._id) req.data = { ...req?.data, _id: userData?.user?._id };
  if (userData?.user?._id) {
    if (req.data && !(req.data instanceof FormData)) {
      req.data = { ...req.data, _id: userData.user._id };
    } else if (!(req.data instanceof FormData)) {
      // If request body doesn't exist or is FormData, create new FormData and append _id
      const formData = new FormData();
      formData.append('_id', userData.user._id);
      req.data = formData;
    }
  }
  return req;
},
  (err) => {
    console.error("AXIOS_ERR:>", err)
  });

Axios.interceptors.response.use(async (res) => {
  return res;
},
  (err) => {
    toast.error(err?.response?.data?.message || err.message);
  });

export default Axios;