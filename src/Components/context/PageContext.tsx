import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  num: number;
}

interface PageContextProviderProps {
  children: ReactNode;
}

interface PageContextType {
  userData: User | null;
  saveUserData: () => void;
  changeAddPage: (num: number) => void;
  isAdding: number | null;
  reqID: number;
  setID: (id: number) => void;
}

const defaultContextValue: PageContextType = {
  userData: null,
  saveUserData: () => {},
  changeAddPage: () => {},
  isAdding: null,
  reqID: 0,
  setID: () => {},
};

export const PageContext = createContext<PageContextType | null>(defaultContextValue);

export default function PageContextProvider({ children }: PageContextProviderProps) {
  const [userData, setUserData] = useState<User | null>(null);
  const [isAdding, setIsAdding] = useState<number | null>(0);
  const [reqID, setReqID] = useState<number>(0);

  const changeAddPage = (num: number) => {
    setIsAdding(num);
  };

  const setID = (id: number) => {
    setReqID(id);
  };

  const saveUserData = () => {
    const encoded = localStorage.getItem("userToken");
    if (encoded) {
      const decoded = jwtDecode<User>(encoded); 
      setUserData(decoded);
    }
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
      {children}
    </PageContext.Provider>
  );
}
