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

const BarStacked = () => {
  const [isDark] = useDarkMode();
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: " data one",
        data: [35, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: hexToRGB(colors.primary, 1),
        borderColor: colors.primary,

        borderSkipped: "bottom",
        barThickness: 40,
      },
      {
        label: " data two",
        data: [24, 42, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: hexToRGB(colors.success, 1),
        borderColor: colors.success,

        borderSkipped: "bottom",
        barThickness: 40,
      },
      {
        label: " data three",
        data: [24, 42, 40, 19, 86, 27, 90],
        fill: false,
        backgroundColor: hexToRGB(colors.danger, 1),
        borderColor: colors.success,

        borderSkipped: "bottom",
        barThickness: 40,
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
      x: {
        stacked: true,
        grid: {
          color: isDark ? "#334155" : "#e2e8f0",
        },

        ticks: {
          color: isDark ? "#cbd5e1" : "#475569",
        },
      },
      y: {
        stacked: true,
        grid: {
          color: isDark ? "#334155" : "#e2e8f0",
        },

        ticks: {
          color: isDark ? "#cbd5e1" : "#475569",
        },
      },
    },
  };
  return (
    <div>
      <Bar options={options} data={data} height={350} />
    </div>
  );
};

export default BarStacked;
