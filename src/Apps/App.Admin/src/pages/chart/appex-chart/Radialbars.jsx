import React from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useWidth from "@/hooks/useWidth";

const Radialbars = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();
  const series = [44, 55, 67, 83];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
            color: isDark ? "#CBD5E1" : "#475569",
          },
          value: {
            fontSize: "16px",
            color: isDark ? "#CBD5E1" : "#475569",
          },
          total: {
            show: true,
            label: "Total",
            color: isDark ? "#CBD5E1" : "#475569",
            formatter: function () {
              return 249;
            },
          },
        },
        track: {
          background: "#E2E8F0",
          strokeWidth: "97%",
        },
      },
    },
    labels: ["A", "B", "C", "D"],
    colors: ["#4669FA", "#FA916B", "#50C793", "#0CE7FA"],
  };

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="radialBar"
        height={width > breakpoints.md ? 450 : 250}
      />
    </div>
  );
};

export default Radialbars;
