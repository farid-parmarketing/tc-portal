import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Auth = ({ Component }) => {
  const { url, generateToken, setUser } = useContext(AppContext);
  const navigate = useNavigate();
  //
  const [loading, setLoading] = useState(true);
  //
  const getUser = async () => {
    try {
      const id = localStorage.getItem("tc-portal-id");
      if (!id) {
        navigate("/login", { replace: true });
      } else {
        const token = await generateToken();
        const res = await axios.get(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${JSON.parse(
            id
          )}`,
          {
            headers: { Authorization: `Zoho-oauthtoken ${token}` },
          }
        );
        let userData = res.data.data[0];
        for (let item in userData) {
          if (userData[item] === null) {
            userData[item] = "";
          }
        }
        setUser(userData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Component />
        </>
      )}
    </>
  );
};

export default Auth;
