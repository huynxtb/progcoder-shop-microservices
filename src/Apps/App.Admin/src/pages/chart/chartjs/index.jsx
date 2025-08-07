import React from "react";
import Card from "@/components/ui/Card";
import BarChart from "./Bar";
import HorizontalBar from "./HorizontalBar";
import BarStacked from "./BarStacked";
import LineChart from "./LineChart";
import RadarChart from "./RadarChart";
import PollerAreaChart from "./PollerAreaChart";

const ChartJs = () => {
  return (
    <div className=" space-y-5">
      <Card title="Bar Chart">
        <BarChart />
      </Card>
      <Card title="Horizontal Bar">
        <HorizontalBar />
      </Card>
      <Card title="Bar Stacked">
        <BarStacked />
      </Card>
      <Card title="Line Chart">
        <LineChart />
      </Card>
      <Card title="Radar Chart">
        <RadarChart />
      </Card>
      <Card title="Poller Area Chart">
        <PollerAreaChart />
      </Card>
    </div>
  );
};

export default ChartJs;
