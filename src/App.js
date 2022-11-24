// import React, { useEffect } from "react";
import "./Assets/Css/Global.css";
// import axios from "axios";
// import { Router } from "./Router";
import { Login } from "./Pages/Login/Login";
import { useSelector } from "react-redux";
import { Router } from "./Router";

export function App() {
  const admin = useSelector((state) => state.admin);

  // useEffect(() => {
  //   axios("https://honey.pandashop.uz/guest/add")
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return <>{admin.token ? <Router /> : <Login />}</>;
}
