import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/constant/data";

const data = [
  {
    subject: "Battery",
    "iPhone 11": 41,
    "Samsung s20": 65,
  },
  {
    subject: "Brand",
    "iPhone 11": 64,
    "Samsung s20": 46,
  },
  {
    subject: "Camera",
    "iPhone 11": 81,
    "Samsung s20": 42,
  },
  {
    subject: "Memory",
    "iPhone 11": 60,
    "Samsung s20": 25,
  },
  {
    subject: "Storage",
    "iPhone 11": 42,
    "Samsung s20": 58,
  },
  {
    subject: "Display",
    "iPhone 11": 42,
    "Samsung s20": 63,
  },
  {
    subject: "OS",
    "iPhone 11": 33,
    "Samsung s20": 76,
  },
  {
    subject: "Price",
    "iPhone 11": 23,
    "Samsung s20": 43,
  },
];

const ReRadarChart = () => {
  const [isDark] = useDarkMode();
  return (
    <div>
      <ResponsiveContainer height={350}>
        <RadarChart cx="50%" cy="50%" height={400} data={data}>
          <PolarGrid fill={isDark ? "#334155" : "#e2e8f0"} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: isDark ? "#cbd5e1" : "#64748b" }}
            tickLine={{ stroke: isDark ? "#cbd5e1" : "#64748b" }}
            stroke={isDark ? "#334155" : "#e2e8f0"}
          />
          <PolarRadiusAxis />
          <Radar
            dataKey="iPhone 11"
            stroke={colors.primary}
            fill={colors.primary}
            fillOpacity={1}
          />

          <Radar
            dataKey="Samsung s20"
            stroke={colors.info}
            fill={colors.info}
            fillOpacity={0.8}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReRadarChart;
