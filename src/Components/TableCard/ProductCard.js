import React from "react";
import editIcon from "../../Assets/Images/editIcon.svg";
import trash from "../../Assets/Images/trash.svg";
import view from "../../Assets/Images/view.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { acLoading } from "../../Redux/Loading";
import { acRelodeProduct } from "../../Redux/Product";

export function ProductCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const DeleteProduct = (id) => {
    dispatch(acLoading(true));
    axios(`https://honey.pandashop.uz/product/delete/${id}`, {
      method: "POST",
      headers: {
        token: "Admin tokeni",
      },
    })
      .then((res) => {
        toast(res.data.message);
        dispatch(acLoading(false));
        dispatch(acRelodeProduct());
      })
      .catch((err) => {
        toast(err.response.data);
        dispatch(acRelodeProduct());
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>IMG</th>
            <th>Maxsulot</th>
            <th>Vazni</th>
            <th>Xudud</th>
            <th>Ko'rildi</th>
            <th colSpan={2}>Operatsiya</th>
            <th>Ko'rish</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <th className="imgCard">
                  <img src={item.img[0]} alt="" />
                </th>
                <th>{item.name}</th>
                <th>{item.weight}</th>
                <th>{item.territory}</th>
                <th>{item.view}</th>
                <th className="btn">
                  <img
                    onClick={() => {
                      navigate(`/edit_product/${item.id}`);
                    }}
                    src={editIcon}
                    alt="edit"
                  />
                </th>
                <th className="btn">
                  <img
                    src={trash}
                    width="50px"
                    alt="trash"
                    onClick={() => {
                      DeleteProduct(item.id);
                    }}
                  />
                </th>
                <th className="btn">
                  <img
                    onClick={() => {
                      navigate(`/product_view/${item.id}`);
                    }}
                    width="50px"
                    src={view}
                    alt=""
                  />
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
