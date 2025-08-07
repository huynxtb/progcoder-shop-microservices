import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ImageBlock2 from "@/components/partials/widget/block/image-block-2";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import RevenueBarChart from "@/components/partials/widget/chart/revenue-bar-chart";
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
        <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock2 />
        </div>
        <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
            <GroupChart2 />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="2xl:col-span-8 lg:col-span-7 col-span-12">
          <Card>
            <div className="legend-ring">
              <RevenueBarChart height={420} />
            </div>
          </Card>
        </div>
        <div className="2xl:col-span-4 lg:col-span-5 col-span-12">
          <Card title="Statistic" headerSlot={<SelectMonth />}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <OrderChart />
              <ProfitChart />
              <div className="md:col-span-2">
                <EarningChart />
              </div>
            </div>
          </Card>
        </div>
        <div className="xl:col-span-6 col-span-12">
          <Card title="Customer" headerSlot={<SelectMonth />}>
            <Customer />
          </Card>
        </div>
        <div className="xl:col-span-6 col-span-12">
          <Card title="Recent Orders" headerSlot={<SelectMonth />} noBorder>
            <RecentOrderTable />
          </Card>
        </div>
        <div className="xl:col-span-8 lg:col-span-7 col-span-12">
          <Card title="Visitors Report" headerSlot={<SelectMonth />}>
            <BasicArea />
          </Card>
        </div>
        <div className="xl:col-span-4 lg:col-span-5 col-span-12">
          <Card title="Visitors By Gender" headerSlot={<SelectMonth />}>
            <VisitorRadar />
          </Card>
        </div>
        <div className="xl:col-span-6 col-span-12">
          <Card
            title="Most Sales"
            headerSlot={
              <div className="border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded-sm p-1 flex items-center">
                <span
                  className={` flex-1 text-sm font-normal px-3 py-1 transition-all duration-150 rounded cursor-pointer
                ${
                  filterMap === "global"
                    ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                    : "dark:text-slate-300"
                }  
                `}
                  onClick={() => setFilterMap("global")}
                >
                  Global
                </span>
                <span
                  className={` flex-1 text-sm font-normal px-3 py-1 rounded transition-all duration-150 cursor-pointer
                  ${
                    filterMap === "usa"
                      ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                      : "dark:text-slate-300"
                  }
              `}
                  onClick={() => setFilterMap("usa")}
                >
                  USA
                </span>
              </div>
            }
          >
            <MostSales2 filterMap={filterMap} />
          </Card>
        </div>
        <div className="xl:col-span-6 col-span-12">
          <Card title="Best selling products" headerSlot={<SelectMonth />}>
            <Products />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
