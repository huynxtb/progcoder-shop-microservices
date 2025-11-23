import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";

const OrderGrowthLineChart = ({ height = 420 }) => {
  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();

  // Generate days array for current month (1-31)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Mock data: order count for each day of the month
  const orderData = [
    45, 52, 48, 61, 55, 58, 63, 67, 59, 64, 71, 68, 75, 72, 78, 81, 76, 84, 79, 87, 82, 89, 85, 92, 88, 95, 91, 98, 94, 101, 97
  ];

  const series = [
    {
      name: "Orders",
      data: orderData,
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#4669FA"],
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: function (val) {
          return val + " orders";
        },
      },
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#E2E8F0",
      strokeDashArray: 10,
      position: "back",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    title: {
      text: "Order Growth Report",
      align: "left",
      offsetX: isRtl ? "0%" : 0,
      offsetY: 13,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "500",
        fontFamily: "Inter",
        color: isDark ? "#fff" : "#0f172a",
      },
    },
    yaxis: {
      opposite: isRtl ? true : false,
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      title: {
        text: "Number of Orders",
        style: {
          color: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      categories: daysInMonth,
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      title: {
        text: "Day of Month",
        style: {
          color: isDark ? "#CBD5E1" : "#475569",
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
    responsive: [
      {
        breakpoint: 600,
        options: {
          xaxis: {
            labels: {
              rotate: -45,
            },
          },
        },
      },
    ],
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" height={height} />
    </div>
  );
};

export default OrderGrowthLineChart;

