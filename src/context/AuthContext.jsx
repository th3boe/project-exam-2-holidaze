import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [authenticate, setAuthenticate] = useLocalStorage(["user"]);

  return (
    <AuthContext.Provider value={[authenticate, setAuthenticate]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
