import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

const Scatter = () => {
  const [isDark] = useDarkMode();
  const series = [
    {
      name: "A",
      data: [
        [5.4, 170],
        [5.4, 100],
        [6.3, 170],
        [5.7, 140],
        [5.9, 130],
        [7.0, 150],
        [8.0, 120],
        [9.0, 170],
        [10.0, 190],
        [11.0, 220],
        [12.0, 170],
        [13.0, 230],
      ],
    },
    {
      name: "B",
      data: [
        [14.0, 220],
        [15.0, 280],
        [16.0, 230],
        [18.0, 320],
        [17.5, 280],
        [19.0, 250],
        [20.0, 350],
        [20.5, 320],
        [20.0, 320],
        [19.0, 280],
        [17.0, 280],
        [22.0, 300],
        [18.0, 120],
      ],
    },
    {
      name: "C",
      data: [
        [14.0, 290],
        [13.0, 190],
        [20.0, 220],
        [21.0, 350],
        [21.5, 290],
        [22.0, 220],
        [23.0, 140],
        [19.0, 400],
        [20.0, 200],
        [22.0, 90],
        [20.0, 120],
      ],
    },
  ];
  const options = {
    chart: {
      zoom: {
        enabled: true,
        type: "xy",
      },
      toolbar: {
        show: false,
      },
    },
    grid: {
      borderColor: isDark ? "#334155" : "#e2e8f0",
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: ["#4669FA", "#FA916B", "#0CE7FA"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: 10,
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
        formatter(val) {
          return parseFloat(val).toFixed(1);
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
  };
  return (
    <div>
      <Chart options={options} series={series} type="scatter" height="350" />
    </div>
  );
};

export default Scatter;
