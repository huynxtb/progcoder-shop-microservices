import React from "react";
import Chart from "react-apexcharts";

import useDarkMode from "@/hooks/useDarkMode";

const ProfitChart = ({
  className = "bg-slate-50 dark:bg-slate-900 rounded-sm pt-3 px-4",
  color = "#4669FA",
}) => {
  const [isDark] = useDarkMode();
  const series = [
    {
      data: [15, 30, 15, 30, 20, 35],
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      offsetX: 0,
      offsetY: 0,

      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      width: [2],
      curve: "straight",
      dashArray: [0, 8, 5],
    },
    dataLabels: {
      enabled: false,
    },

    markers: {
      size: 4,
      colors: color,
      strokeColors: color,
      strokeWidth: 2,
      shape: "circle",
      radius: 2,
      hover: {
        sizeOffset: 1,
      },
    },

    yaxis: {
      show: false,
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      strokeDashArray: 5,
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    colors: [color],
  };
  return (
    <div className={className}>
      <div className="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
        Profit
      </div>
      <div className="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">
        654k
      </div>
      <div className="font-normal text-xs text-slate-600 dark:text-slate-300">
        <span className="text-primary-500">+02% </span>
        From last Week
      </div>
      <div className="mt-4">
        <Chart type="line" height="44" options={options} series={series} />
      </div>
    </div>
  );
};

export default ProfitChart;
