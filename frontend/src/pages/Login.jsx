import React, { useContext, useMemo, useState } from "react";
import bigLogo from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import Cookies from "js-cookie";

const Login = () => {
  const { url, setUser, generateToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  //
  const [message, setMessage] = useState("");
  const [isError, setisError] = useState(true);
  const login = async (e) => {
    e.preventDefault();
    //
    if (!inputs.email) {
      setMessage("Enter your email address");
    } else if (!inputs.password) {
      setMessage("Enter your password");
    } else {
      const token = await generateToken();
      //
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=((Email:equals:${inputs.email}))`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      console.log(res.data);
    }
  };
  //
  useMemo(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
        setisError(true);
      }, 3000);
    }
  }, [message]);
  //
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = (e) => {
    if (e.target.checked === true) {
      setShowPassword(true);
    } else if (e.target.checked === false) {
      setShowPassword(false);
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="login-div">
          <div className="w-100">
            <img src={bigLogo} alt="bigLogo" />
          </div>

          <div className="text-center mt-4 mb-5">
            <p className="bold">No Collection, No Fee</p>
            <p>Taurus Collection Customer's Portal</p>
          </div>

          <form className="mb-4" onSubmit={login}>
            <div className="mb-4">
              <label>Email address</label>
              <input
                type="email"
                className="input w-100"
                name="email"
                value={inputs.email}
                onChange={handleInputs}
              />
            </div>
            <div className="mb-4">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="input w-100"
                name="password"
                value={inputs.password}
                onChange={handleInputs}
              />
              <label className="d-flex align-items-center justify-content-start gap-1">
                <input type="checkbox" onClick={togglePassword} />
                Show password
              </label>
            </div>
            <p className={`${isError ? "text-danger" : "text-success"} mb-2`}>
              {message}
            </p>
            <button className="button w-100">Login</button>
          </form>

          <div className="two-text-flex">
            <p className="text-center">Don't have an account?</p>
            <Link to="/signup" className="primary-text text-capitalize">
              Sign Up now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
