import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/constant/data";

const data = [
  {
    name: "7/12",
    sales: 20,
    clicks: 60,
    visits: 100,
  },
  {
    name: "8/12",
    sales: 40,
    clicks: 80,
    visits: 120,
  },
  {
    name: "9/12",
    sales: 30,
    clicks: 70,
    visits: 90,
  },
  {
    name: "10/12",
    sales: 70,
    clicks: 110,
    visits: 170,
  },
  {
    name: "11/12",
    sales: 40,
    clicks: 80,
    visits: 130,
  },
  {
    name: "12/12",
    sales: 60,
    clicks: 80,
    visits: 160,
  },
  {
    name: "13/12",
    sales: 50,
    clicks: 100,
    visits: 140,
  },
  {
    name: "14/12",
    sales: 140,
    clicks: 90,
    visits: 240,
  },
  {
    name: "15/12",
    sales: 120,
    clicks: 180,
    visits: 220,
  },
  {
    name: "16/12",
    sales: 100,
    clicks: 160,
    visits: 180,
  },
  {
    name: "17/12",
    sales: 140,
    clicks: 140,
    visits: 270,
  },
  {
    name: "18/12",
    sales: 180,
    clicks: 200,
    visits: 280,
  },
  {
    name: "19/12",
    sales: 220,
    clicks: 220,
    visits: 375,
  },
];

const CustomTooltip = (data) => {
  if (data.active && data.payload) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-md">
        <p className=" font-semibold text-base border-b border-slate-700 -mx-3  mb-3  pb-3 px-3 ">
          {data.label}
        </p>

        <div className="active">
          {data.payload.map((i) => {
            return (
              <div className=" items-center flex space-x-2" key={i.dataKey}>
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: i.fill,
                  }}
                ></span>
                <span className="  capitalize text-sm">
                  {i.dataKey} : {i.payload[i.dataKey]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

const ReAreaChart = () => {
  const [isDark] = useDarkMode();
  return (
    <div>
      <ResponsiveContainer height={350}>
        <AreaChart height={300} data={data}>
          <CartesianGrid
            strokeDasharray="1 1"
            stroke={isDark ? "#334155" : "#e2e8f0"}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: isDark ? "#cbd5e1" : "#64748b" }}
            tickLine={{ stroke: isDark ? "#cbd5e1" : "#64748b" }}
            stroke={isDark ? "#334155" : "#e2e8f0"}
          />
          <YAxis
            tick={{ fill: isDark ? "#cbd5e1" : "#64748b" }}
            tickLine={{ stroke: isDark ? "#cbd5e1" : "#64748b" }}
            stroke={isDark ? "#334155" : "#e2e8f0"}
          />
          <Tooltip content={CustomTooltip} />

          <Area
            dataKey="sales"
            stackId="sales"
            stroke="0"
            fill="rgba(70, 105, 250, .5)"
          />
          <Area
            dataKey="clicks"
            stackId="clicks"
            stroke="0"
            fill="rgb(70, 105, 250)"
          />
          <Area
            dataKey="visits"
            stackId="visits"
            stroke="0"
            fill="rgba(70, 105, 250, .2)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReAreaChart;
