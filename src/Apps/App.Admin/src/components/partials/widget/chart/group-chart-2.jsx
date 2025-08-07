import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Chart from "react-apexcharts";

const shapeLine1 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#00EBFF"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};
const shapeLine2 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#FB8F65"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};
const shapeLine3 = {
  series: [
    {
      data: [800, 600, 1000, 800, 600, 1000, 800, 900],
    },
  ],
  options: {
    chart: {
      toolbar: {
        autoSelected: "pan",
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
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#5743BE"],
    tooltip: {
      theme: "light",
    },
    grid: {
      show: false,
      padding: {
        left: 0,
        right: 0,
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0.1],
    },
    legend: {
      show: false,
    },
    xaxis: {
      low: 0,
      offsetX: 0,
      offsetY: 0,
      show: false,
      labels: {
        low: 0,
        offsetX: 0,
        show: false,
      },
      axisBorder: {
        low: 0,
        offsetX: 0,
        show: false,
      },
    },
  },
};

const statistics = [
  {
    name: shapeLine1,
    title: "Totel revenue",
    count: "3,564",
    bg: "bg-[#E5F9FF] dark:bg-slate-900	",
    text: "text-info-500",
    icon: "heroicons:shopping-cart",
  },
  {
    name: shapeLine2,
    title: "Products sold",
    count: "564",
    bg: "bg-[#FFEDE6] dark:bg-slate-900	",
    text: "text-warning-500",
    icon: "heroicons:cube",
  },
  {
    name: shapeLine3,
    title: "Growth",
    count: "+5.0%",
    bg: "bg-[#EAE6FF] dark:bg-slate-900	",
    text: "text-[#5743BE]",
    icon: "heroicons:arrow-trending-up-solid",
  },
];

const GroupChart2 = () => {
  return (
    <>
      {" "}
      {statistics.map((item, i) => (
        <div key={i}>
          <Card bodyClass="pt-4 pb-3 px-4">
            <div className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none">
                <div
                  className={`${item.bg} ${item.text} h-12 w-12 rounded-full flex flex-col items-center justify-center text-2xl`}
                >
                  <Icon icon={item.icon} />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-slate-600 dark:text-slate-300 text-sm mb-1 font-medium">
                  {item.title}
                </div>
                <div className="text-slate-900 dark:text-white text-lg font-medium">
                  {item.count}
                </div>
              </div>
            </div>
            <div className="ltr:ml-auto rtl:mr-auto max-w-[124px]">
              <Chart
                options={item.name.options}
                series={item.name.series}
                type="area"
                height="41"
                width="124"
              />
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export default GroupChart2;
