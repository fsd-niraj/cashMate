import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../services";
import { userLogin } from "../../reducers/auth";
import { saveState } from "../../global/functions";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const onInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    return setInput({ ...input, [key]: value });
  };

  const storeData = (data) => {
    saveState({ user: data?.user, accessToken: data?.accessToken, isLoggedIn: true })
    dispatch(userLogin(data));
  }

  const isFormValid = () => {
    let valid = false;
    if (!input.email) {
      toast.error("Email cannot be blank")
      document.getElementById("email").focus()
    } else if (!/\S/.test(input.password)) {
      toast.error("Password cannot be blank");
      document.getElementById("password").focus()
    } else {
      valid = true;
    }
    return valid;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    const payload = {
      email: input.email,
      password: input.password
    }
    return logIn(payload)
      .then((res) => {
        storeData(res?.data)
        dispatch(userLogin(res?.data))
        toast.success(res?.data?.message)
        // return navigate("/");
      })
      .catch((err) => {
        return toast.error(err)
      })
  };

  return (
    <>
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Log in</h1>
            <p className="col-lg-10 fs-4">Securely access your account to manage sales and inventory with ease.</p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={(e) => onSubmit(e)}>
              <div className="form-floating mb-3">
                <input type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="johndoe@email.com"
                  onChange={(e) => onInputChange(e)} />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="********"
                  onChange={(e) => onInputChange(e)} />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              {/* <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> Remember me
                </label>
              </div> */}
              <button className="w-100 btn btn-lg btn-primary" type="submit">Log In</button>
              <hr className="my-4" />
              <small className="text-body-secondary text-center">New to Cash Mate? <a href="/signup">Signup</a></small>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
