import React from "react";

import { useSelector } from "react-redux";
import OrderCard from "../../Components/TableCard/OrderCard";

export function Order() {
  const OrderData = useSelector((state) => state.order);

  return (
    <section id="tabCard">
      <OrderCard data={OrderData} />
    </section>
  );
}
