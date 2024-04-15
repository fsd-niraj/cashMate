import React, { useEffect, useState } from "react";
import { getProductList, getUserDetails } from "../services";
import { useSelector } from "react-redux";
import { viewAsCurrency } from "../global/functions";

const Home = () => {
  const auth = JSON.parse(localStorage.getItem("user"))
  const [data, setData] = useState([{}]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (auth?.isLoggedIn) {
      fetch()
    }
  }, [auth?.isLoggedIn])

  function fetch() {
    getUserDetails().then((res) => setUserData(res?.data)).catch((err) => console.error(err))
  }

  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold text-body-emphasis">Welcome {userData?.name}</h1>
        <div className="container px-4 py-5" id="hanging-icons">
          <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div className="col d-flex align-items-start">
              <div>
                <h3 className="fs-2 text-body-emphasis">{viewAsCurrency(userData?.totalEarnings)}</h3>
                <p>Is your total earnings till now</p>
                <a href="/products" className="btn btn-primary">
                  Click here to add more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
