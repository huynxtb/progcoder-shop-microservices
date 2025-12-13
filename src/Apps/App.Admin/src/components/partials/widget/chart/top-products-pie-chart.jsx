import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import { reportService } from "@/services/reportService";
import { useTranslation } from "react-i18next";

const TopProductsPieChart = ({ height = 420 }) => {
  const { t } = useTranslation();
  const [isDark] = useDarkMode();
  const [topProducts, setTopProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopProductsData = async () => {
      try {
        setIsLoading(true);
        const response = await reportService.getTopProductStatistics();
        
        // API returns { result: { items: [...] } }
        if (response?.result?.items) {
          setTopProducts(response.result.items);
        }
      } catch (error) {
        console.error("Failed to fetch top products statistics:", error);
        // Set empty data on error
        setTopProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopProductsData();
  }, []);

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
      text: t("dashboard.topBestSellingProducts"),
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
          return new Intl.NumberFormat().format(topProducts[seriesIndex].value) + " " + t("dashboard.unitsSold");
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
        <div className="animate-pulse text-slate-500 dark:text-slate-400">
          {t("dashboard.loadingChartData")}
        </div>
      </div>
    );
  }

  // Show empty state if no data
  if (topProducts.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
        <div className="text-slate-500 dark:text-slate-400">
          {t("dashboard.noDataAvailable")}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Chart options={options} series={series} type="pie" height={height} />
    </div>
  );
};

export default TopProductsPieChart;

