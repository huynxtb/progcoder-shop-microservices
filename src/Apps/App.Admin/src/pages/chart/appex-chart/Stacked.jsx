import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

const Stacked = () => {
  const [isDark] = useDarkMode();
  const series = [
    {
      name: "PRODUCT A",
      data: [44, 55, 41, 67, 22, 43, 21, 49],
    },
    {
      name: "PRODUCT B",
      data: [13, 23, 20, 8, 13, 27, 33, 12],
    },
    {
      name: "PRODUCT C",
      data: [11, 17, 15, 15, 21, 14, 15, 13],
    },
  ];
  const options = {
    chart: {
      stacked: true,
      stackType: "100%",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "25%",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      position: "back",
    },
    legend: {
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
    },
    xaxis: {
      categories: [
        "2011 Q1",
        "2011 Q2",
        "2011 Q3",
        "2011 Q4",
        "2012 Q1",
        "2012 Q2",
        "2012 Q3",
        "2012 Q4",
      ],
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#4669FA", "#0CE7FA", "#FA916B"],
  };
  return (
    <div>
      <Chart options={options} series={series} type="bar" height="350" />
    </div>
  );
};

export default Stacked;
