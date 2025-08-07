import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/constant/data";

const angularData = [
  { x: 5.4, y: 170 },
  { x: 5.4, y: 100 },
  { x: 5.7, y: 110 },
  { x: 5.9, y: 150 },
  { x: 6.0, y: 200 },
  { x: 6.3, y: 170 },
  { x: 5.7, y: 140 },
  { x: 5.9, y: 130 },
  { x: 7.0, y: 150 },
  { x: 8.0, y: 120 },
  { x: 9.0, y: 170 },
  { x: 10.0, y: 190 },
  { x: 11.0, y: 220 },
  { x: 12.0, y: 170 },
  { x: 13.0, y: 230 },
];

const vueData = [
  { x: 14.0, y: 220 },
  { x: 15.0, y: 280 },
  { x: 16.0, y: 230 },
  { x: 18.0, y: 320 },
  { x: 17.5, y: 280 },
  { x: 19.0, y: 250 },
  { x: 20.0, y: 350 },
  { x: 20.5, y: 320 },
  { x: 20.0, y: 320 },
  { x: 19.0, y: 280 },
  { x: 17.0, y: 280 },
  { x: 22.0, y: 300 },
  { x: 18.0, y: 120 },
];

const reactData = [
  { x: 14.0, y: 290 },
  { x: 13.0, y: 190 },
  { x: 20.0, y: 220 },
  { x: 21.0, y: 350 },
  { x: 21.5, y: 290 },
  { x: 22.0, y: 220 },
  { x: 23.0, y: 140 },
  { x: 19.0, y: 400 },
  { x: 20.0, y: 200 },
  { x: 22.0, y: 90 },
  { x: 20.0, y: 120 },
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

const ReScatterChart = () => {
  const [isDark] = useDarkMode();
  return (
    <div>
      <ResponsiveContainer height={350}>
        <ScatterChart height={300}>
          <CartesianGrid
            strokeDasharray="1 1"
            stroke={isDark ? "#334155" : "#e2e8f0"}
          />
          <XAxis
            dataKey="x"
            type="number"
            tick={{ fill: isDark ? "#cbd5e1" : "#64748b" }}
            tickLine={{ stroke: isDark ? "#cbd5e1" : "#64748b" }}
            stroke={isDark ? "#334155" : "#e2e8f0"}
          />
          <YAxis
            dataKey="y"
            type="number"
            tick={{ fill: isDark ? "#cbd5e1" : "#64748b" }}
            tickLine={{ stroke: isDark ? "#cbd5e1" : "#64748b" }}
            stroke={isDark ? "#334155" : "#e2e8f0"}
          />
          <Scatter name="Angular" data={angularData} fill={colors.danger} />
          <Scatter name="Vue" data={vueData} fill={colors.success} />
          <Scatter name="React" data={reactData} fill={colors.primary} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReScatterChart;
