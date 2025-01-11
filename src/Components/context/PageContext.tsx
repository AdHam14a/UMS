import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useEffect, useState } from "react";


interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: number;
  birthDate: string;
  image?: string; 
}

interface PageContextProviderProps {
  children: ReactNode;
}

interface PageContextType {
  saveUserData: () => void;
  userData: User | null;
  changeAddPage: (num: number) => void;
  isAdding: number | null;
  reqID: number;
  setID: (id: number) => void;
}

export const PageContext = createContext<PageContextType | null>(null);

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
      const decoded = jwtDecode<User>(encoded); // Decode user token
      setUserData(decoded); // Set user data
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData(); // If a token exists, save user data
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
