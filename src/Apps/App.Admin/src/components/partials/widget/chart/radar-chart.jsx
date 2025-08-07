import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";

const RadarChart = () => {
  const [isDark] = useDarkMode();
  const series = [67];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "22px",
            color: isDark ? "#E2E8F0" : "#475569",
          },
          value: {
            fontSize: "16px",
            color: isDark ? "#E2E8F0" : "#475569",
          },
          total: {
            show: true,
            label: "Total",
            color: isDark ? "#E2E8F0" : "#475569",
            formatter: function () {
              return 249;
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    colors: ["#4669FA"],
  };

  return (
    <div>
      <Chart series={series} options={options} type="radialBar" height="320" />
    </div>
  );
};

export default RadarChart;
