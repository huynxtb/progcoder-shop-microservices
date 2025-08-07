import React from "react";
import Chart from "react-apexcharts";

import useDarkMode from "@/hooks/useDarkMode";

const EarningChart = ({
  className = "bg-slate-50 dark:bg-slate-900 rounded-sm py-3 px-4 md:col-span-2",
}) => {
  const [isDark] = useDarkMode();
  const series = [44, 55];

  const options = {
    labels: ["success", "Return"],
    dataLabels: {
      enabled: false,
    },
    colors: ["#0CE7FA", "#FA916B"],
    legend: {
      position: "bottom",
      fontSize: "14px",
      fontFamily: "Inter",
      fontWeight: 400,
      markers: {
        width: 8,
        height: 8,
        offsetY: 0,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 18,
        vertical: 0,
      },
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
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
    <div className={` ${className}`}>
      <div className="flex items-center">
        <div className="flex-none">
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
            Earnings
          </div>
          <div className="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">
            $12,335.00
          </div>
          <div className="font-normal text-xs text-slate-600 dark:text-slate-300">
            <span className="text-primary-500">+08%</span>
            From last Week
          </div>
        </div>
        <div className="flex-1">
          <div className="legend-ring2">
            <Chart
              type="donut"
              height="200"
              options={options}
              series={series}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningChart;
