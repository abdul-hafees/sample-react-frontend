import React, { useState } from "react";

export const AuthContext = React.createContext();

export default function AuthProvider(props) {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState({});
    console.log('token inside auth provider : ' + token);

  return <AuthContext.Provider value={{token, setToken, user, setUser}} token={token}>{props.children}</AuthContext.Provider>;
}
