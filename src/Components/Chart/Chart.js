import React from "react";
import "./Chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Oxirgi 30 kunlik Mexmonlar soni",
    },
  },
};

export function Chart({ data }) {
  return (
    <div id="chart">
      <Bar width={100} height={60} options={options} data={data} />
    </div>
  );
}
