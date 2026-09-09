"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "@/actions";

//create context
export const GlobalContext = createContext(undefined);

//create provider
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const session = await getSession();

      if (session?.user) {
        setUser(session.user);
      }
    }

    getUser();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

//create global hook
export const useGlobal = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }

  return context;
};
