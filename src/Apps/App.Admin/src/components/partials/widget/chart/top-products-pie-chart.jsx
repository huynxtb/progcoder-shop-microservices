import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

const TopProductsPieChart = ({ height = 420 }) => {
  const [isDark] = useDarkMode();

  // Mock data: Top 5 best selling products
  const topProducts = [
    { name: "Laptop Pro 15", value: 245 },
    { name: "Wireless Headphones", value: 189 },
    { name: "Smart Watch Series 8", value: 156 },
    { name: "Gaming Mouse RGB", value: 134 },
    { name: "USB-C Hub", value: 98 },
  ];

  const series = topProducts.map((product) => product.value);
  const labels = topProducts.map((product) => product.name);

  const options = {
    labels: labels,
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(1) + "%";
      },
    },
    colors: ["#4669FA", "#F1595C", "#50C793", "#0CE7FA", "#FA916B"],
    legend: {
      position: "bottom",
      fontSize: "14px",
      fontFamily: "Inter",
      fontWeight: 400,
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
      markers: {
        width: 8,
        height: 8,
        offsetY: -1,
        offsetX: -5,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    title: {
      text: "Top 5 Best Selling Products",
      align: "left",
      offsetY: 13,
      floating: false,
      style: {
        fontSize: "20px",
        fontWeight: "500",
        fontFamily: "Inter",
        color: isDark ? "#fff" : "#0f172a",
      },
    },
    tooltip: {
      theme: isDark ? "dark" : "light",
      y: {
        formatter: function (val, { seriesIndex }) {
          return topProducts[seriesIndex].value + " units sold";
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
    <div>
      <Chart options={options} series={series} type="pie" height={height} />
    </div>
  );
};

export default TopProductsPieChart;

