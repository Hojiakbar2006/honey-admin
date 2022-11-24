import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import chartIcon from "../../Assets/Images/Line Chart.svg";
import addProduct from "../../Assets/Images/AddProductd.svg";
import searchIcon from "../../Assets/Images/Search.svg";
import acBell from "../../Assets/Images/acBell.svg";
import noAcBell from "../../Assets/Images/noAcBell.svg";
import menu from "../../Assets/Images/menu.png";
import { useSelector } from "react-redux";
import { AppBar } from "../Modal/AppModal";
import { Notification } from "../Modal/NotifModal";

import product from "../../Assets/Images/product.svg";
import orderImg from "../../Assets/Images/order.svg";

export function NavBar() {
  const [search, setSearch] = useState("");
  const [openApp, setOpenApp] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const data = useSelector((state) => state.product);
  const order = useSelector((state) => state.order);
  const searchData = data.filter((item) =>
    item.name.toLowerCase().includes(search)
  );
  const navigate = useNavigate();
  const dateBY = new Date().toLocaleDateString().split("/").join(".");

  const navData = [
    {
      name: "Chart",
      linkName: "/",
      img: chartIcon,
    },
    {
      name: "Add product",
      linkName: "/add_product",
      img: addProduct,
    },
    {
      name: "Product",
      linkName: "/product",
      img: product,
    },
    {
      name: "Order",
      linkName: "/order",
      img: orderImg,
    },
  ];
  if (openApp) {
    document.querySelector("body").style.position = "fixed"
  }else if (openNotif) {
    document.querySelector("body").style.position = "fixed";
  }else{
    document.querySelector("body").style.position = "";
  }

  return (
    <nav id="navBar">
      <div className="profile">
        <button className="menubtn" onClick={() => setOpenApp(!openApp)}>
          <img width="40px" src={menu} alt="menu" />
        </button>

        <figure onClick={() => navigate("/")}></figure>
        <div onClick={() => navigate("/")}>
          <h3>Nasriddinov Hojiakbar</h3>
          <p>Tizim admini</p>
        </div>
      </div>

      <div className="navItem">
        <button className="menubtn" onClick={() => setOpenApp(!openApp)}>
          <img width="40px" src={menu} alt="menu" />
        </button>
        <Link to="/">
          <img src={chartIcon} alt="" />
        </Link>
        <Link to="/add_product">
          <img src={addProduct} alt="" />
        </Link>

        <label htmlFor="search" className="searchLabel">
          <input
            type="text"
            placeholder="maxsulotni izlash"
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
          />
          <img src={searchIcon} autoComplete="off" alt="" />
          {search === "" ? (
            ""
          ) : (
            <div className="showSearechValue">
              {searchData.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(`product_view/${item.id}`);
                      setSearch("");
                    }}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          )}
        </label>

        <div className="notification">
          <p>{dateBY}</p>
          <img
            src={order ? acBell : noAcBell}
            alt=""
            onClick={() => setOpenNotif(!openNotif)}
          />
        </div>
      </div>
      <AppBar data={navData} open={openApp} setOpen={setOpenApp} />
      <Notification data={order} open={openNotif} setOpen={setOpenNotif} />
    </nav>
  );
}
