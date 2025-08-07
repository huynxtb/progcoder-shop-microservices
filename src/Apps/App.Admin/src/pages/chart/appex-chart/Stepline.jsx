import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

const Stepline = () => {
  const [isDark] = useDarkMode();
  const series = [
    {
      data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "stepline",
    },
    dataLabels: {
      enabled: false,
    },
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
    markers: {
      hover: {
        sizeOffset: 4,
      },
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" height="350" />
    </div>
  );
};

export default Stepline;
