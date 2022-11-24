import axios from "axios";
import React, { useState } from "react";
import "./Login.css";
import backgraund from "../../Assets/Images/loginPageBg.svg";
import viewPas from "../../Assets/Images/eye-Light.svg";
import viewNotPas from "../../Assets/Images/eye-slash.svg";
import { useDispatch, useSelector } from "react-redux";
import { acAdmin } from "../../Redux/Admin";
import { acLoading } from "../../Redux/Loading";
import { toast } from "react-toastify";

export function Login() {
  const [password, setPassword] = useState(false);
  const [data, setData] = useState({
    login: "",
    password: "",
    check: false,
  });
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  return (
    <section id="loginPage">
      <form
        className="loginForm"
        onSubmit={(e) => {
          const { login, password, check } = data;
          e.preventDefault();

          axios(
            "https://honey.pandashop.uz/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                token: admin.token,
              },
              data: {
                login,
                password,
              },
            },
            dispatch(acLoading(true))
          )
            .then((res) => {
              if (check) {
                localStorage.setItem("admin", JSON.stringify(res.data));
                dispatch(acAdmin(res.data));
                dispatch(acLoading(false));
              } else {
                sessionStorage.setItem("admin", JSON.stringify(res.data));
                dispatch(acAdmin(res.data));
                dispatch(acLoading(false));
              }
            })
            .catch((err) => {
              console.log(err.response.data);
              toast(err.response.data.message);
              dispatch(acLoading(false));
            });
        }}
      >
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          required
          autoComplete="off"
          autoCapitalize="off"
          onChange={(e) => setData({ ...data, login: e.target.value })}
        />
        <label>
          <input
            type={password ? "password" : "text"}
            placeholder="Password"
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <img
            onClick={() => setPassword(!password)}
            src={password ? viewPas : viewNotPas}
            alt=""
          />
        </label>
        <div className="remember_card">
          <label>
            <input
              type="checkbox"
              checked={data.check}
              onChange={(e) =>
                setData({ ...data, check: data.check ? false : true })
              }
            />
            <span>Remeber me</span>
          </label>
        </div>
        <input type="submit" value="Login" />
      </form>
      <img src={backgraund} alt="" />;
    </section>
  );
}
