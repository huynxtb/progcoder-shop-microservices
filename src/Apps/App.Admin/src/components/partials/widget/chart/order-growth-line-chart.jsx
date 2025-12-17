import React, { useState, useEffect, useCallback } from "react";
import Chart from "react-apexcharts";
import useDarkMode from "@/hooks/useDarkMode";
import useRtl from "@/hooks/useRtl";
import { reportService } from "@/services/reportService";
import { useTranslation } from "react-i18next";

const OrderGrowthLineChart = ({ height = 420, onRefresh }) => {
  const { t } = useTranslation();
  const [isDark] = useDarkMode();
  const [isRtl] = useRtl();
  const [chartData, setChartData] = useState({ days: [], values: [] });
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrderGrowthData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await reportService.getOrderGrowthStatistics();
      
      // API returns { result: { items: [...] } }
      if (response?.result?.items) {
        const items = response.result.items;
        const days = items.map(item => item.day);
        const values = items.map(item => item.value);
        setChartData({ days, values });
      }
    } catch (error) {
      console.error("Failed to fetch order growth statistics:", error);
      // Set empty data on error
      setChartData({ days: [], values: [] });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrderGrowthData();
  }, [fetchOrderGrowthData]);

  // Expose refresh function to parent
  useEffect(() => {
    if (onRefresh) {
      onRefresh(fetchOrderGrowthData);
    }
  }, [onRefresh, fetchOrderGrowthData]);

  const series = [
    {
      name: t("dashboard.orders"),
      data: chartData.values,
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
          return new Intl.NumberFormat().format(val) + " " + t("dashboard.orders");
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
      text: t("dashboard.orderGrowthReport"),
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
        formatter: function (val) {
          return new Intl.NumberFormat().format(val);
        },
      },
      title: {
        text: t("dashboard.numberOfOrders"),
        style: {
          color: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      categories: chartData.days,
      labels: {
        style: {
          colors: isDark ? "#CBD5E1" : "#475569",
          fontFamily: "Inter",
        },
      },
      title: {
        text: t("dashboard.dayOfMonth"),
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
  if (chartData.days.length === 0) {
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
      <Chart options={options} series={series} type="line" height={height} />
    </div>
  );
};

export default OrderGrowthLineChart;

