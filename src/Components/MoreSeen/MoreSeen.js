import React from "react";
import "./MoreSeen.css";
import view from "../../Assets/Images/view.svg";
import { MoreSeenNotif } from "../Modal/MoreSeenNotif";
import { useState } from "react";

export function MoreSeen({ data }) {
  const [detail, setDetail] = useState({});
  const [open, setOpen] = useState(false);

  return (
    <div className="moreSeen">
      <h2>Eng ko'p korilgan maxsulotlar</h2>
      <div>
        {data.map((item, index) => {
          return (
            <div key={index} className="itemCard">
              <div>
                <h2>{item.name}</h2>
                <span>
                  <img src={view} alt="" /> {item.view} marotaba
                </span>
              </div>
              <button
                onClick={() => {
                  setDetail({...item, img:item.img[0]||[]});
                  setOpen(!open);
                }}
              >
                Batafsil
              </button>
            </div>
          );
        })}
      </div>
      <MoreSeenNotif data={detail} open={open} setOpen={setOpen} />
    </div>
  );
}
