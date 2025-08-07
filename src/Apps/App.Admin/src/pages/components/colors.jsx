import React from "react";
import Card from "@/components/ui/Card";
const slates = [
  {
    name: "slate-50",
    bg: "bg-slate-50",
    color: "#f8fafc",
  },
  {
    name: "slate-100",
    bg: "bg-slate-100",
    color: "#f1f5f9",
  },

  {
    name: "slate-200",
    bg: "bg-slate-200",
    color: "#e2e8f0",
  },
  {
    name: "slate-300",
    bg: "bg-slate-300",
    color: "#cbd5e1",
  },

  {
    name: "slate-400",
    bg: "bg-slate-400",
    color: "#94a3b8",
  },
  {
    name: "slate-500",
    bg: "bg-slate-500",
    color: "#64748b",
  },
  {
    name: "slate-600",
    bg: "bg-slate-600",
    color: "#475569",
  },
  {
    name: "slate-700",
    bg: "bg-slate-700",
    color: "#1e293b",
  },
  {
    name: "slate-800",
    bg: "bg-slate-800",
    color: "#1e293b",
  },
  {
    name: "slate-900",
    bg: "bg-slate-900",
    color: "#0f172a",
  },
];
const primary = [
  {
    name: "primary-50",
    bg: "bg-primary-50",
    color: "#F6F8FF",
  },
  {
    name: "primary-100",
    bg: "bg-primary-100",
    color: "#EDF0FF",
  },

  {
    name: "primary-200",
    bg: "bg-primary-200",
    color: "#D1DAFE",
  },
  {
    name: "primary-300",
    bg: "bg-primary-300",
    color: "#B4C2FD",
  },

  {
    name: "primary-400",
    bg: "bg-primary-400",
    color: "#8092FF",
  },
  {
    name: "primary-500",
    bg: "bg-primary-500",
    color: "#7E96FC",
  },
  {
    name: "primary-600",
    bg: "bg-primary-600",
    color: "#3F5EDF",
  },
  {
    name: "primary-700",
    bg: "bg-primary-700",
    color: "#2A3F96",
  },
  {
    name: "primary-800",
    bg: "bg-primary-800",
    color: "#203071",
  },
  {
    name: "primary-900",
    bg: "bg-primary-900",
    color: "#151F49",
  },
];
const danger = [
  {
    name: "danger-50",
    bg: "bg-danger-50",
    color: "#FFF7F7",
  },
  {
    name: "danger-100",
    bg: "bg-danger-100",
    color: "#FEEFEF",
  },

  {
    name: "danger-200",
    bg: "bg-danger-200",
    color: "#FCD6D7",
  },
  {
    name: "danger-300",
    bg: "bg-danger-300",
    color: "#FABBBD",
  },

  {
    name: "danger-400",
    bg: "bg-danger-400",
    color: "#F68B8D",
  },
  {
    name: "danger-500",
    bg: "bg-danger-500",
    color: "#F1595C",
  },
  {
    name: "danger-600",
    bg: "bg-danger-600",
    color: "#D75052",
  },
  {
    name: "danger-700",
    bg: "bg-danger-700",
    color: "#913638",
  },
  {
    name: "danger-800",
    bg: "bg-danger-800",
    color: "#6D292A",
  },
  {
    name: "danger-900",
    bg: "bg-danger-900",
    color: "#461A1B",
  },
];
const warning = [
  {
    name: "warning-50",
    bg: "bg-warning-50",
    color: "#FFFAF8",
  },
  {
    name: "warning-100",
    bg: "bg-warning-100",
    color: "#FFF4F1",
  },

  {
    name: "warning-200",
    bg: "bg-warning-200",
    color: "#FEE4DA",
  },
  {
    name: "warning-300",
    bg: "bg-warning-300",
    color: "#FDD2C3",
  },

  {
    name: "warning-400",
    bg: "bg-warning-400",
    color: "#FCB298",
  },
  {
    name: "warning-500",
    bg: "bg-warning-500",
    color: "#FA916B",
  },
  {
    name: "warning-600",
    bg: "bg-warning-600",
    color: "#DF8260",
  },
  {
    name: "warning-700",
    bg: "bg-warning-700",
    color: "#965741",
  },
  {
    name: "warning-800",
    bg: "bg-warning-800",
    color: "#714231",
  },
  {
    name: "warning-900",
    bg: "bg-warning-900",
    color: "#4A2E21",
  },
];
const info = [
  {
    name: "info-50",
    bg: "bg-info-50",
    color: "#F3FEFF",
  },
  {
    name: "info-100",
    bg: "bg-info-100",
    color: "#E7FEFF",
  },

  {
    name: "info-200",
    bg: "bg-info-200",
    color: "#C5FDFF",
  },
  {
    name: "info-300",
    bg: "bg-info-300",
    color: "#A3FCFF",
  },

  {
    name: "info-400",
    bg: "bg-info-400",
    color: "#5FF9FF",
  },
  {
    name: "info-500",
    bg: "bg-info-500",
    color: "#0CE7FA",
  },
  {
    name: "info-600",
    bg: "bg-info-600",
    color: "#00B8D4",
  },
  {
    name: "info-700",
    bg: "bg-info-700",
    color: "#007A8D",
  },
  {
    name: "info-800",
    bg: "bg-info-800",
    color: "#005E67",
  },
  {
    name: "info-900",
    bg: "bg-info-900",
    color: "#003F42",
  },
];
const success = [
  {
    name: "success-50",
    bg: "bg-success-50",
    color: "#F3FEF8",
  },
  {
    name: "success-100",
    bg: "bg-success-100",
    color: "#E7FDF1",
  },

  {
    name: "success-200",
    bg: "bg-success-200",
    color: "#E7FDF1",
  },
  {
    name: "success-300",
    bg: "bg-success-300",
    color: "#A3F9D5",
  },

  {
    name: "success-400",
    bg: "bg-success-400",
    color: "#5FF5B1",
  },
  {
    name: "success-500",
    bg: "bg-success-500",
    color: "#50C793",
  },
  {
    name: "success-600",
    bg: "bg-success-600",
    color: "#3F9A7A",
  },
  {
    name: "success-700",
    bg: "bg-success-700",
    color: "#2E6D61",
  },
  {
    name: "success-800",
    bg: "bg-success-800",
    color: "#1F4B47",
  },
  {
    name: "success-900",
    bg: "bg-success-900",
    color: "#0F2A2E",
  },
];
const colors = () => {
  return (
    <div>
      <Card title="All Colors">
        <div className="space-y-5">
          <div>
            <div className="col-span-2 text-base font-medium text-slate-900 dark:text-slate-300 mb-6">
              Bases
            </div>
            <div className="flex flex-wrap space-xy-5">
              <div>
                <div className="color-box h-[96px] 2xl:w-[107px] w-[96px] bg-slate-900 rounded-md flex flex-col text-white p-4 transition-all duration-200 hover:shadow-xs hover:-translate-y-1"></div>
                <div className="flex-1 text-sm my-1 pt-1 dark:text-slate-300">
                  Dark
                </div>
                <div className="flex-0 text-sm dark:text-slate-300">
                  #0F172A
                </div>
              </div>
              <div>
                <div className="color-box h-[96px] 2xl:w-[107px] w-[96px] bg-white border-gray-500 border rounded-md flex flex-col text-slate-900 p-4 transition-all duration-200 hover:shadow-xs hover:-translate-y-1"></div>
                <div className="flex-1 text-sm my-1 pt-1 dark:text-slate-300">
                  White
                </div>
                <div className="flex-0 text-sm dark:text-slate-300">
                  #FFFFFF
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="col-span-2 text-base font-medium text-slate-900 dark:text-slate-300 mb-6">
              Slate
            </div>
            <div className="flex flex-wrap space-xy-5">
              {slates?.map((item, i) => (
                <div key={i}>
                  <div
                    className={`color-box h-[96px] 2xl:w-[107px] w-[96px]
                 rounded-md flex flex-col text-white p-4 transition-all duration-200 
                 hover:shadow-xs hover:-translate-y-1 ${item.bg}`}
                  ></div>
                  <div className="flex-1 text-sm my-1 pt-1 dark:text-slate-300">
                    {item.name}
                  </div>
                  <div className="flex-0 text-sm dark:text-slate-300">
                    {item.color}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="col-span-2 text-base font-medium text-slate-900 dark:text-slate-300 mb-6">
              Primary
            </div>
            <div className="flex flex-wrap space-xy-5">
              {primary?.map((item, i) => (
                <div key={i}>
                  <div
                    className={`color-box h-[96px] 2xl:w-[107px] w-[96px] 
                rounded-md flex flex-col text-white p-4 transition-all 
                duration-200 hover:shadow-xs hover:-translate-y-1 ${item.bg}`}
                  ></div>
                  <div className="flex-1 text-sm my-1 pt-1 dark:text-slate-300">
                    {item.name}
                  </div>
                  <div className="flex-0 text-sm dark:text-slate-300">
                    {item.color}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="col-span-2 text-base font-medium text-slate-900 dark:text-slate-300 mb-6">
              Danger
            </div>
            <div className="flex flex-wrap space-xy-5">
              {danger?.map((item, i) => (
                <div key={i}>
                  <div
                    className={`color-box h-[96px] 2xl:w-[107px] w-[96px]
                 rounded-md flex flex-col text-white p-4 transition-all duration-200
                  hover:shadow-xs hover:-translate-y-1 ${item.bg}`}
                  ></div>
                  <div className="flex-1 text-sm my-1 pt-1 dark:text-slate-300">
                    {item.name}
                  </div>
                  <div className="flex-0 text-sm dark:text-slate-300">
                    {item.color}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="col-span-2 text-base font-medium text-slate-900 dark:text-slate-300 mb-6">
              Warning
            </div>
            <div className="flex flex-wrap space-xy-5">
              {warning?.map((item, i) => (
                <div key={i}>
                  <div
                    className={`color-box h-[96px] 2xl:w-[107px] w-[96px] rounded-md
                 flex flex-col text-white p-4 transition-all duration-200 hover:shadow-xs hover:-translate-y-1 ${item.bg}`}
                  ></div>
                  <div className="flex-1 text-sm my-1 pt-1 dark:text-slate-300">
                    {item.name}
                  </div>
                  <div className="flex-0 text-sm dark:text-slate-300">
                    {item.color}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="col-span-2 text-base font-medium text-slate-900 dark:text-slate-300 mb-6">
              Info
            </div>
            <div className="flex flex-wrap space-xy-5">
              {info?.map((item, i) => (
                <div key={i}>
                  <div
                    className={`color-box h-[96px] 2xl:w-[107px] w-[96px] rounded-md flex flex-col text-white
                 p-4 transition-all duration-200 hover:shadow-xs hover:-translate-y-1 ${item.bg}`}
                  ></div>
                  <div className="flex-1 text-sm my-1 pt-1 dark:text-slate-300">
                    {item.name}
                  </div>
                  <div className="flex-0 text-sm dark:text-slate-300">
                    {item.color}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="col-span-2 text-base font-medium text-slate-900 dark:text-slate-300 mb-6">
              Success
            </div>
            <div className="flex flex-wrap space-xy-5">
              {success?.map((item, i) => (
                <div key={i}>
                  <div
                    className={`color-box h-[96px] 2xl:w-[107px] w-[96px] rounded-md flex flex-col text-white p-4 transition-all duration-200 hover:shadow-xs hover:-translate-y-1 ${item.bg}`}
                  ></div>
                  <div className="flex-1 text-sm my-1 pt-1 dark:text-slate-300">
                    {item.name}
                  </div>
                  <div className="flex-0 text-sm dark:text-slate-300">
                    {item.color}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default colors;
