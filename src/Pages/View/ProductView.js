import React, { useEffect, useState } from "react";
import "./Style.css"
import axios from "axios";
import { useLocation } from "react-router-dom";

export function ProductView() {
  const [productView, setProductView] = useState([]);
  const [img, setImg] = useState("");
  const Location = useLocation();
  const id = Location.pathname.split("/").pop();

  useEffect(() => {
    axios
      .get(`https://honey.pandashop.uz/product/view/${id}`, {
        headers: {
          token: "token",
        },
      })
      .then((res) => {
        setProductView(res.data);
        setImg(res.data.img[0])
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const date =
    new Date(productView.date).toLocaleDateString() +
    " " +
    new Date(productView.date).toLocaleTimeString();

  return (
    <section id="viewSection">
      <div>
        <figure>
          <img src={img} alt="" />
        </figure>
        <div>
          <h3>{productView.name}</h3>
          <h3>Vaqti: {date}</h3>
          <h3>{productView.price} 000 sum</h3>
          <h3>Xudud: {productView.territory}</h3>
          <h3>ko'rishlar soni: {productView.view}</h3>
          <p>About: {productView.about}</p>
        </div>
      </div>
    </section>
  );
}
