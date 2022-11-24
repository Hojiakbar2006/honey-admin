import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { acLoading } from "../../Redux/Loading";

export function OrderView() {
  const [data, setData] = useState({});
  const Location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = Location.pathname.split("/").pop();

  useEffect(() => {
    axios
      .get(`https://honey.pandashop.uz/order/view/${id}`, {
        headers: {
          token: "token",
        },
      })
      .then((res) => {
        setData({...res.data, img:res.data.img[0]});
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const date =
    new Date(data.date).toLocaleDateString() +
    " " +
    new Date(data.date).toLocaleTimeString();

  return (
    <section id="viewSection">
      <div>
        <figure>
          <img src={data.img} alt="" />
        </figure>
        <div>
          <h3>{data.name}</h3>
          <h3>Vaqti: {date}</h3>
          <h3>Narxi: {data.price} sum</h3>
          <h3>Xudud: {data.territory}</h3>
          <h3>Telfon: {data.phone}</h3>
          <h3>ko'rishlar soni: {data.view}</h3>
          <h3>
            Buyurtma xolati:{" "}
            {data.status === 0 ? "Tasdiqlanmagan" : "Tasdiqlangan"}
          </h3>
          <div className="btn-group">
            <button
              onClick={() => {
                dispatch(acLoading(true));
                axios(`https://honey.pandashop.uz/order/delete`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    token: "Admin tokeni",
                    id: id,
                  },
                })
                  .then((res) => {
                    toast(res.data.message);
                    navigate(-1);
                    dispatch(acLoading(false));
                  })
                  .catch((err) => {
                    console.log(err.response.data.message);
                  });
              }}
            >
              Buyurtmani bekor qilish
            </button>
            <button
              onClick={() => {
                dispatch(acLoading(true));
                axios(`https://honey.pandashop.uz/order/confirmation`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    token: "Admin tokeni",
                    id: id,
                  },
                })
                  .then((res) => {
                    toast(res.data.message);
                    navigate(-1);
                    dispatch(acLoading(false));
                  })
                  .catch((err) => {
                    console.log(err.response.data.message);
                  });
              }}
            >
              Buyurtmani Tasdiqlash
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
