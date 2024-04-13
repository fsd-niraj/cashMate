import axios from "axios";
import { toast } from "react-toastify";

const userData = JSON.parse(localStorage.getItem("user"));

const Axios = axios.create({
  baseURL: "http://localhost:5173",
  headers: { Authorization: `Bearer ${userData?.accessToken}` }
})

Axios.interceptors.request.use(async (req) => {
  if (userData?.accessToken) req.headers.authorization = `Bearer ${userData.accessToken}`;
  if (userData?.user?._id) req.data = { ...req?.data, _id: userData?.user?._id, email: userData?.user?.email };
  // if (!userData?.user?._id && !req.url.includes("/user-login") || !req.url.includes("/create-user")) return toast.error("User id not found");
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