import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import { AppContext } from "../context/AppContext";

const Auth = ({ Component }) => {
  const { getUser } = useContext(AppContext);
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <Navbar />
      <Component />
    </>
  );
};

export default Auth;
