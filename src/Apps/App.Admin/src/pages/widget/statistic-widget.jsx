import React from "react";
import Card from "@/components/ui/Card";
import GroupChart5 from "@/components/partials/widget/chart/group-chart5";
import GroupChart3 from "@/components/partials/widget/chart/group-chart-3";
import GroupChart4 from "@/components/partials/widget/chart/group-chart-4";
import GroupChart2 from "@/components/partials/widget/chart/group-chart-2";
import GroupChart1 from "@/components/partials/widget/chart/group-chart-1";
import DonutChart2 from "@/components/partials/widget/chart/dount-chart2";
import OrderChart from "@/components/partials/widget/chart/order-chart";
import ProfitChart from "@/components/partials/widget/chart/profit-chart";
import EarningChart from "@/components/partials/widget/chart/earning-chart";

import userAvatar from "@/assets/images/all-img/main-user.png";

const StatisticWidget = () => {
  return (
    <div className=" space-y-5">
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <GroupChart2 />
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <GroupChart1 />
      </div>
      <Card>
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-content-center">
          <div className="flex space-x-4 h-full items-center rtl:space-x-reverse">
            <div className="flex-none">
              <div className="h-20 w-20 rounded-full">
                <img src={userAvatar} alt="" className="w-full h-full" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-medium mb-2">
                <span className="block font-light">Good evening,</span>
                <span className="block">Mr. Jone Doe</span>
              </h4>
              <p className="text-sm dark:text-slate-300">Welcome to Dashcode</p>
            </div>
          </div>
          <GroupChart5 />
        </div>
      </Card>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
        <GroupChart3 />
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
        <GroupChart4 />
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
        <Card>
          <span className="block text-slate-500 dark:text-slate-300 text-sm font-medium">
            Progress
          </span>
          <DonutChart2 />
        </Card>
        <Card>
          <span className="block text-slate-500 dark:text-slate-300 text-sm font-medium">
            Progress
          </span>
          <DonutChart2 colors={["#F1595C", "#F9E1E5"]} />
        </Card>
        <Card>
          <span className="block text-slate-500 dark:text-slate-300 text-sm font-medium">
            Progress
          </span>
          <DonutChart2 colors={["#50C793", "#E5F3E5"]} />
        </Card>
        <Card>
          <span className="block text-slate-500 dark:text-slate-300 text-sm font-medium">
            Progress
          </span>
          <DonutChart2 colors={["#FA916B", "#fcc8b5"]} />
        </Card>
      </div>
      <div className="grid xl:grid-cols-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <OrderChart className="bg-white dark:bg-slate-800 rounded-sm p-4" />
        <OrderChart
          className="bg-white dark:bg-slate-800 rounded-sm p-4"
          barColor={"#F1595C"}
        />
        <OrderChart
          className="bg-white dark:bg-slate-800 rounded-sm p-4"
          barColor={"#50C793"}
        />
        <ProfitChart className="bg-white dark:bg-slate-800 rounded-sm p-4" />
        <ProfitChart
          className="bg-white dark:bg-slate-800 rounded-sm p-4"
          color={"#F1595C"}
        />{" "}
        <ProfitChart
          className="bg-white dark:bg-slate-800 rounded-sm p-4"
          color={"#50C793"}
        />
      </div>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
        <EarningChart className="bg-white dark:bg-slate-800 rounded-sm py-3 px-4" />
        <EarningChart className="bg-white dark:bg-slate-800 rounded-sm py-3 px-4" />
        <EarningChart className="bg-white dark:bg-slate-800 rounded-sm py-3 px-4" />
      </div>
    </div>
  );
};

export default StatisticWidget;
