import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

const Radar = () => {
  const [isDark] = useDarkMode();
  const series = [
    {
      name: "Option A",
      data: [41, 64, 81, 60, 42, 42, 33, 23],
    },
    {
      name: "Option B",
      data: [65, 46, 42, 25, 58, 63, 76, 43],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: false,
        blur: 8,
        left: 1,
        top: 1,
        opacity: 0.2,
      },
    },
    legend: {
      show: true,
      fontSize: "14px",
      fontFamily: "Inter",
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
    },
    yaxis: {
      show: false,
    },
    //colors: [chartColors.donut.series1, chartColors.donut.series3],
    xaxis: {
      categories: [
        "Battery",
        "Brand",
        "Camera",
        "Memory",
        "Storage",
        "Display",
        "OS",
        "Price",
      ],
    },
    fill: {
      opacity: [1, 0.8],
    },
    stroke: {
      show: false,
      width: 0,
    },
    markers: {
      size: 0,
    },
    grid: {
      show: false,
    },
  };
  return (
    <div>
      <Chart options={options} series={series} type="radar" height={450} />
    </div>
  );
};

export default Radar;
