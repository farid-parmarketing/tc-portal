import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const url = "https://customer-api.tauruscreditmanagement.ae";
  const [user, setUser] = useState(null);
  const [count, setCount] = useState("");
  //
  const generateToken = async () => {
    const res = await axios.get(`${url}/generatetoken`);
    if (res.status === 200) {
      Cookies.set("tcm_client_token", res.data.access_token);
      return res.data.access_token;
    }
  };
  //
  const navigate = useNavigate();
  const getUser = async () => {
    const customerID = JSON.parse(
      localStorage.getItem("tcm_client_customerID")
    );
    const token = Cookies.get("tcm_client_token");
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      const res = await axios.post(`${url}/getuser`, {
        customerID,
        token,
      });
      if (res.data.success === false) {
        if (res.data.code === 400) {
          window.alert(res.data.message);
        } else if (res.data.code === 401) {
          await generateToken();
          await getUser();
        }
      } else if (res.data.success === true) {
        setUser(res.data.result);
        setCount(res.data.result.Step);
        //
        if (
          res.data.result.Step === "" ||
          res.data.result.Step === "1" ||
          res.data.result.Step === "2" ||
          res.data.result.Step === "3"
        ) {
          navigate("/customerdetails", { replace: true });
        }
      }
    }
  };
  //
  const [lengths, setLengths] = useState(null);
  const [loading, setLoading] = useState(true);
  const getLengths = async () => {
    try {
      const token = Cookies.get("tcm_client_token");
      const res = await axios.post(`${url}/getlengths`, {
        token,
        customerID: user.id,
      });
      if (res.data.success === false) {
        setLoading(false);
        await generateToken();
        await getUser();
      } else if (res.data.success === true) {
        setLoading(false);
        setLengths(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user !== null) {
      getLengths();
    }
  }, [user]);
  //
  return (
    <AppContext.Provider
      value={{
        url,
        user,
        setUser,
        getUser,
        count,
        generateToken,
        lengths,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
