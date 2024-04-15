import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/layouts/layout.jsx";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup.jsx";
import Home from "./components/home.jsx";
import { userLogin } from "./reducers/auth.jsx";
import Products from "./components/screens/products.jsx";
import Dashboard from "./components/screens/dashboard.jsx";
import IncorrectRoute from "./components/screens/incorrectRoute.jsx";
import SellingScreen from "./components/screens/sellingScreen.jsx";
import ProfilePage from "./components/screens/profilePage.jsx";
import { useLocation } from "react-router-dom";
import TransactionDetail from "./components/screens/transactionDetail.jsx";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const auth = useSelector((s) => s?.auth)

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user && location.pathname === "/login" || location.pathname === "/signup") {
      return;
    } else if (!user) {
      navigate("/login");
    } else {
      dispatch(userLogin(JSON.parse(user)));
    }

  }, [auth?.isLoggedIn]);

  return (
    <>
      <Outlet />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* <Route element={<PrivateRoute />}> */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:id" element={<TransactionDetail />} />
          <Route path="/checkout" element={<SellingScreen />} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        {/* </Route> */}
        <Route path="*" element={<IncorrectRoute />} />
      </Routes>
    </>
  );
};

export default App;
