import React from "react";
import "./InfCard.css";

export function InfCard({data}) {


  return (
    <div className="infCard">
      {data.map((item) => {
        return (
          <div key={item.id}>
            <h2>{item.cardName}</h2>
            <h3>{item.total}</h3>
          </div>
        );
      })}
    </div>
  );
}
