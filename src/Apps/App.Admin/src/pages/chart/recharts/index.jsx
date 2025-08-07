import React from "react";
import Card from "@/components/ui/Card";
import ReLineChart from "./ReLineChart";
import ReAreaChart from "./ReAreaChart";
import ReBarChart from "./ReBarChart";
import ReScatterChart from "./ScatterChart";
import ReRadarChart from "./ReRadarChart";
import RePieChart from "./RePieChart";

const ChartJs = () => {
  return (
    <div className=" space-y-5">
      <Card title="Line Chart">
        <ReLineChart />
      </Card>
      <Card title="Area Chart">
        <ReAreaChart />
      </Card>
      <Card title="Bar Chart">
        <ReBarChart />
      </Card>
      <Card title="Scatter Chart">
        <ReScatterChart />
      </Card>
      <Card title="Radar Chart">
        <ReRadarChart />
      </Card>
      <Card title="Pie Chart">
        <RePieChart />
      </Card>
    </div>
  );
};

export default ChartJs;
