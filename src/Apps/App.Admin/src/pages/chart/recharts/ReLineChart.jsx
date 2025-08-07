import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/constant/data";

const data = [
  {
    name: "7/12",
    pv: 280,
  },
  {
    name: "8/12",
    pv: 200,
  },
  {
    name: "9/12",
    pv: 220,
  },
  {
    name: "10/12",
    pv: 180,
  },
  {
    name: "11/12",
    pv: 270,
  },
  {
    name: "12/12",
    pv: 250,
  },
  {
    name: "13/12",
    pv: 70,
  },
  {
    name: "14/12",
    pv: 90,
  },
  {
    name: "15/12",
    pv: 200,
  },
  {
    name: "16/12",
    pv: 150,
  },
  {
    name: "17/12",
    pv: 160,
  },
  {
    name: "18/12",
    pv: 100,
  },
  {
    name: "19/12",
    pv: 150,
  },
  {
    name: "20/12",
    pv: 100,
  },
  {
    name: "21/12",
    pv: 50,
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-md  ">
        <span>{`${payload[0].value}%`}</span>
      </div>
    );
  }

  return null;
};

const ReLineChart = () => {
  const [isDark] = useDarkMode();
  return (
    <div>
      <ResponsiveContainer height={350}>
        <LineChart height={300} data={data}>
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
          <Line
            dataKey="pv"
            stroke={colors.primary}
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReLineChart;
