import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { colors, hexToRGB } from "@/constant/data";
import useDarkMode from "@/hooks/useDarkMode";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
const RadarChart = () => {
  const [isDark] = useDarkMode();
  const data = {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
      },
      {
        label: "My Second Dataset",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: colors.success,
        borderColor: colors.success,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDark ? "#cbd5e1" : "#475569",
        },
      },
    },

    scales: {
      r: {
        ticks: {
          display: false,
          maxTicksLimit: 1,
          color: isDark ? "#cbd5e1" : "#475569",
        },
        grid: {
          color: isDark ? "#334155" : "#e2e8f0",
        },
        pointLabels: {
          color: isDark ? "#cbd5e1" : "#475569",
        },
        angleLines: {
          color: isDark ? "#334155" : "#e2e8f0",
        },
      },
    },
    maintainAspectRatio: false,
  };
  return (
    <div>
      <Radar options={options} data={data} height={350} />
    </div>
  );
};

export default RadarChart;
