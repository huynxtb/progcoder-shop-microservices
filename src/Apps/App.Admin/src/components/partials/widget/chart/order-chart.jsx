import React from "react";
import Chart from "react-apexcharts";
import { colors } from "@/constant/data";

const OrderChart = ({
  className = "bg-slate-50 dark:bg-slate-900 rounded-sm pt-3 px-4",
  barColor = colors.warning,
}) => {
  const series = [
    {
      name: "Revenue",
      data: [40, 70, 45, 100, 75, 40, 80, 90],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      offsetX: 0,
      offsetY: 0,
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "60px",
        barHeight: "100%",
      },
    },
    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + "k";
        },
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
    colors: [barColor],
    grid: {
      show: false,
    },
  };
  return (
    <div className={className}>
      <div className="text-sm text-slate-600 dark:text-slate-300 mb-[6px]">
        Orders
      </div>
      <div className="text-lg text-slate-900 dark:text-white font-medium mb-[6px]">
        123k
      </div>
      <div className="font-normal text-xs text-slate-600 dark:text-slate-300">
        <span className="text-warning-500">-60% </span>
        From last Week
      </div>
      <div className="mt-4">
        <Chart type="bar" height="44" options={options} series={series} />
      </div>
    </div>
  );
};

export default OrderChart;
