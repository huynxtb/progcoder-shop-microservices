import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ImageBlock2 from "@/components/partials/widget/block/image-block-2";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import OrderGrowthLineChart from "@/components/partials/widget/chart/order-growth-line-chart";
import TopProductsPieChart from "@/components/partials/widget/chart/top-products-pie-chart";
import ProfitChart from "../../components/partials/widget/chart/profit-chart";
import OrderChart from "../../components/partials/widget/chart/order-chart";
import EarningChart from "../../components/partials/widget/chart/earning-chart";
import SelectMonth from "@/components/partials/SelectMonth";
import Customer from "../../components/partials/widget/customer";
import RecentOrderTable from "../../components/partials/Table/recentOrder-table";
import BasicArea from "../../pages/chart/appex-chart/BasicArea";
import VisitorRadar from "../../components/partials/widget/chart/visitor-radar";
import MostSales2 from "../../components/partials/widget/most-sales2";
import Products from "../../components/partials/widget/products";
import HomeBredCurbs from "./HomeBredCurbs";

const Ecommerce = () => {
  const [filterMap, setFilterMap] = useState("usa");
  return (
    <div>
      <HomeBredCurbs title="Ecommerce" />
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            <GroupChart2 />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card>
            <div className="legend-ring">
              <OrderGrowthLineChart height={420} />
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card>
            <div className="legend-ring">
              <TopProductsPieChart height={420} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
