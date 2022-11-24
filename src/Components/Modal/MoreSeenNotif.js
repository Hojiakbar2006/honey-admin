import React from "react";

export function MoreSeenNotif({ data, open, setOpen }) {
  return (
    <div
      className={open ? " MoreSeenNotif openDetail" : "MoreSeenNotif"}
      onClick={() => setOpen(!open)}
    >
      <div>
        <figure>
          <img src={data.img} alt="" />
        </figure>
        <div>
          <h2>{data.name}</h2>
          <h3>Xudud: {data.territory}</h3>
          <h4>Narxi: {data.price} ming so'm</h4>
          <p>{data.about}</p>
        </div>
      </div>
    </div>
  );
}
