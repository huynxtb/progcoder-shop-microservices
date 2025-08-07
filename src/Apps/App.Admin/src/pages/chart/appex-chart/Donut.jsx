import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

const Donut = () => {
  const [isDark] = useDarkMode();
  const series = [44, 55, 41];

  const options = {
    labels: ["success", "Return", "Cancel"],
    dataLabels: {
      enabled: true,
    },

    colors: ["#50C793", "#F1595C", "#FBBF24"],
    legend: {
      position: "bottom",
      fontSize: "16px",
      fontFamily: "Inter",
      fontWeight: 400,
      labels: {
        colors: isDark ? "#CBD5E1" : "#475569",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "26px",
              fontWeight: "bold",
              fontFamily: "Inter",
              color: isDark ? "#CBD5E1" : "#475569",
            },
            value: {
              show: true,
              fontFamily: "Inter",
              color: isDark ? "#CBD5E1" : "#475569",
              formatter(val) {
                // eslint-disable-next-line radix
                return `${parseInt(val)}%`;
              },
            },
            total: {
              show: true,
              fontSize: "1.5rem",
              color: isDark ? "#CBD5E1" : "#475569",
              label: "Total",
              formatter() {
                return "20%";
              },
            },
          },
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
      <Chart options={options} series={series} type="donut" height="450" />
    </div>
  );
};

export default Donut;
