import React from "react";
import "./style.css"
import { useNavigate } from "react-router-dom";
import on from "../../Assets/Images/statusOn.svg";
import off from "../../Assets/Images/statusOff.svg";
import view from "../../Assets/Images/view.svg";

export default function OrderCard({ data }) {
  const navigate = useNavigate();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Buyurtmachi</th>
            <th>Sana</th>
            <th>Telefon</th>
            <th>ID</th>
            <th>Status</th>
            <th>Ko'rish</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <th>{item.name}</th>
                <th>{item.date}</th>
                <th>{item.phone}</th>
                <th>{item.id}</th>
                <th>
                  {item.status ? (
                    <img src={on} alt="" />
                  ) : (
                    <img src={off} alt="" />
                  )}
                </th>
                <th className="btn">
                  <img
                    onClick={() => {
                      navigate(`/order_view/${item.id}`);
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
