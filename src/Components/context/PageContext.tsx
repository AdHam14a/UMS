import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let PageContext = createContext(null);

export default function PageContextProvider(props) {
  let [userData, setUserData] = useState(null);

  let [isAdding, setIsAdding] = useState(0);

  let changeAddPage = (num) => {
    setIsAdding(num);
  };

  let [reqID, setReqID] = useState(0);
  let setID = (id) => {
    setReqID(id);
  };

  let saveUserData = () => {
    let encoded = localStorage.getItem("userToken");
    let decoded = jwtDecode(encoded);
    setUserData(decoded);
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  return (
    <PageContext.Provider
      value={{ saveUserData, userData, changeAddPage, isAdding, reqID, setID }}
    >
      {props.children}
    </PageContext.Provider>
  );
}
