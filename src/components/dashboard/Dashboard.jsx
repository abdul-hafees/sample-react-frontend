import React, { useContext } from "react"
import Header from "../../layouts/Header";

import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {

  const { user } = useContext(AuthContext)

  return (
    <>
      <h1>Welcome {user.name}</h1>
    </>
  );
}