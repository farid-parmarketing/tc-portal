import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Cookies from "js-cookie";
import axios from "axios";

const useFetch = (api) => {
  const { url, generateToken, user } = useContext(AppContext);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //
  const [page, setPage] = useState(1);
  const increment = () => {
    setPage(page + 1);
  };
  const decrement = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(1);
    }
  };
  //
  useEffect(() => {
    const visited = async () => {
      try {
        const token = Cookies.get("tcm_client_token");
        const res = await axios.post(`${url}/${api}`, {
          token,
          customerID: user.id,
          page,
        });
        if (res.data.success === false) {
          if (res.data.code === 400) {
            window.alert(res.data.message);
          } else if (res.data.code === 401) {
            generateToken();
            visited();
            setIsLoading(false);
          } else if (res.data.code === 204) {
            setIsLoading(false);
            setData1([]);
            setData2([]);
          }
        } else if (res.data.success === true) {
          setIsLoading(false);
          setData1(res.data.result);
          setData2(res.data.result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    //
    if (user !== null) {
      visited();
    }
  }, [user, page]);
  return {
    data1,
    data2,
    setData1,
    setData2,
    isLoading,
    page,
    setPage,
    increment,
    decrement,
  };
};

export default useFetch;
