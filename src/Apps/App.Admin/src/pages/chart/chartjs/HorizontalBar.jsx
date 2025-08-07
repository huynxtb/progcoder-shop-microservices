import React from "react";
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
import { colors, hexToRGB } from "@/constant/data";
import useDarkMode from "@/hooks/useDarkMode";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBar = () => {
  const [isDark] = useDarkMode();
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],

    datasets: [
      {
        label: "Option A",
        data: [35, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: hexToRGB(colors.primary, 0.9),
        borderWidth: 2,
        borderColor: "transparent",
        barThickness: 20,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#cbd5e1" : "#475569",
        },
      },
    },

    scales: {
      y: {
        grid: {
          color: isDark ? "#334155" : "#e2e8f0",
        },
        ticks: {
          color: isDark ? "#cbd5e1" : "#475569",
        },
      },
      x: {
        grid: {
          color: isDark ? "#334155" : "#e2e8f0",
        },

        ticks: {
          color: isDark ? "#cbd5e1" : "#475569",
        },
      },
    },
    indexAxis: "y",
  };
  return (
    <div>
      <Bar options={options} data={data} height={350} />
    </div>
  );
};

export default HorizontalBar;
