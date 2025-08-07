import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import useDarkMode from "@/hooks/useDarkMode";
import { colors } from "@/constant/data";

const RePieChart = () => {
  const data = [
    { name: "R&D", value: 50, color: colors.primary },
    { name: "Operational", value: 85, color: colors.warning },
    { name: "Networking", value: 16, color: colors.info },
    { name: "Hiring", value: 50, color: colors.success },
  ];
  /*eslint-disable */
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    fill,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    /*eslint-enable */
    return (
      <text
        x={x}
        y={y}
        fill={fill === colors.secondary ? "#000" : "#fff"}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const [isDark] = useDarkMode();
  return (
    <div>
      <ResponsiveContainer height={350}>
        <PieChart height={350}>
          <Pie
            data={data}
            innerRadius={80}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} label />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RePieChart;
