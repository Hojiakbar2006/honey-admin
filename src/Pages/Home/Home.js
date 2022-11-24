import React, { useEffect, useState } from "react";
import { InfCard } from "../../Components/InformationCard/InfCard";
import { MoreSeen } from "../../Components/MoreSeen/MoreSeen";
import { Chart } from "../../Components/Chart/Chart";
import "./Home.css";
import { useSelector } from "react-redux";
import axios from "axios";

export function Home() {
  const moreSeen = useSelector((state) => state.moreSeen);
  const guests = useSelector((state) => state.guest);
  // const Product = useSelector((state) => state.product);
  const [info, setInfo] = useState({});
  // const productPrice = Product.map((item) => parseInt(item.price));
  // const totalPrice = productPrice.reduce(
  //   (total, current) => total + current,
  //   0
  // );

  // const guestsQuantity = guests.map((item) => item.quantity);
  // const commonGuest = guestsQuantity.reduce(
  //   (total, current) => total + current,
  //   0
  // );

  useEffect(() => {
    axios(`https://honey.pandashop.uz/info`)
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const now = new Date().toLocaleDateString();

  // console.log(now);

  const infoData = [
    {
      id: 1,
      cardName: "Maxsulotlar Soni",
      total: `${info.productlen} xil mahsulot`,
    },
    {
      id: 2,
      cardName: "Umumiy narxi",
      total: `${info.totalPrice} $`,
    },
    {
      id: 3,
      cardName: "Buyurtmalar",
      total: `${info.orderLen} xil mahsulot`,
    },
    {
      id: 4,
      cardName: "Sayt mexmonlari",
      total: guests.map((item) => {
        const date = item.date;
        return (
          <p key={item.id}>{date === now ? item.quantity + " nafar" : ""}</p>
        );
      }),
    },
    {
      id: 5,
      cardName: "Sayt mexmonlari",
      total: `(umumiy) ${info.guestsLen} nafar`,
    },
    {
      id: 6,
      cardName: "Ko'rilganlar",
      total: `${info.viewLen} marta`,
    },
  ];
  const labels = [];
  const amaunt = [];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Mehmonlar soni",
        backgroundColor: "#1976d2",
        border: "none",
        data: amaunt,
        borderRadius: 8,
      },
    ],
  };
  guests.map((item) => {
    labels.push(item.date.split("/").slice(0, 2).join("/"));
    amaunt.push(item.quantity);
    return null;
  });
  return (
    <section id="home">
      <InfCard data={infoData} />
      <MoreSeen data={moreSeen} />
      <Chart data={data} />
    </section>
  );
}
