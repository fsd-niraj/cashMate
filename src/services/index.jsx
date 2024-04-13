import Axios from "../utils/axiosInterceptors";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api";

const errToast = (error) => {
  return toast.error(error)
}

export const logIn = async (payload) => {
  return await Axios.post(`${API_URL}/auth/user-login`, payload)
    .then((res) => res?.data)
    .catch((err) => errToast(err?.response?.data?.message));
};

export const logoutRoute = async () => {
  return await Axios.post(`${API_URL}/auth/user-logout`)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};

export const signUp = async (payload) => {
  return await Axios.post(`${API_URL}/auth/create-user`, payload)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};

export const getProductList = async (payload) => {
  return await Axios.post(`${API_URL}/product/get-all-products`, payload)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};

export const addItem = async (payload) => {
  return await Axios.post(`${API_URL}/product/add-product`, payload)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};

export const editItem = async (payload) => {
  return await Axios.post(`${API_URL}/product/update-product`, payload)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};

export const deleteItem = async (payload) => {
  return await Axios.post(`${API_URL}/product/delete-product`, payload)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};

export const createTransaction = async (payload) => {
  return await Axios.post(`${API_URL}/transaction/create-transaction`, payload)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};

export const getTransactions = async (payload) => {
  return await Axios.post(`${API_URL}/transaction/get-all-transactions`, payload)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};

export const getTransactionDetails = async (payload) => {
  return await Axios.post(`${API_URL}/transaction/get-transaction-details`, payload)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};

export const downloadTransactions = async (payload) => {
  return await Axios.post(`${API_URL}/transaction/download-transactions`, payload)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};

export const getUserDetails = async (payload) => {
  return await Axios.post(`${API_URL}/auth/get-user-details`)
    .then((res) => res?.data)
    .catch((err) => errToast(err.response.data.message));
};
