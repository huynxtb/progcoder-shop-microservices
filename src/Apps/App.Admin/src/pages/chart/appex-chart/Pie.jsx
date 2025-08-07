import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

const Pie = () => {
  const [isDark] = useDarkMode();
  const series = [44, 55, 13, 43, 22];

  const options = {
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    dataLabels: {
      enabled: true,
    },

    colors: ["#4669FA", "#F1595C", "#50C793", "#0CE7FA", "#FA916B"],
    legend: {
      position: "bottom",
      fontSize: "16px",
      fontFamily: "Inter",
      fontWeight: 400,
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      markers: {
        width: 6,
        height: 6,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div>
      <Chart options={options} series={series} type="pie" height="450" />
    </div>
  );
};

export default Pie;
