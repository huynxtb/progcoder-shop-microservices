import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
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
  const { t } = useTranslation();
  const [filterMap, setFilterMap] = useState("usa");
  const [refreshFunctions, setRefreshFunctions] = useState({
    statistics: null,
    orderGrowth: null,
    topProducts: null,
  });
  const [loadingStates, setLoadingStates] = useState({
    statistics: false,
    orderGrowth: false,
    topProducts: false,
  });

  const handleRefresh = async (key) => {
    if (refreshFunctions[key]) {
      setLoadingStates(prev => ({ ...prev, [key]: true }));
      await refreshFunctions[key]();
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }
  };

  const registerRefresh = (key) => (refreshFn) => {
    setRefreshFunctions(prev => ({ ...prev, [key]: refreshFn }));
  };

  return (
    <div>
      <HomeBredCurbs title="Ecommerce" />
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-lg font-medium text-slate-900 dark:text-slate-200">
              {t("dashboard.statistics")}
            </h5>
            <Tooltip
              content={t("common.refresh")}
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleRefresh('statistics')}
                disabled={loadingStates.statistics}
              >
                <Icon icon="heroicons:arrow-path" className={loadingStates.statistics ? 'animate-spin' : ''} />
              </button>
            </Tooltip>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
            <GroupChart2 onRefresh={registerRefresh('statistics')} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card>
            <div className="flex justify-end mb-4">
              <Tooltip
                content={t("common.refresh")}
                placement="top"
                arrow
                animation="shift-away"
              >
                <button
                  className="action-btn"
                  type="button"
                  onClick={() => handleRefresh('orderGrowth')}
                  disabled={loadingStates.orderGrowth}
                >
                  <Icon icon="heroicons:arrow-path" className={loadingStates.orderGrowth ? 'animate-spin' : ''} />
                </button>
              </Tooltip>
            </div>
            <div className="legend-ring">
              <OrderGrowthLineChart height={420} onRefresh={registerRefresh('orderGrowth')} />
            </div>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="2xl:col-span-12 lg:col-span-12 col-span-12">
          <Card>
            <div className="flex justify-end mb-4">
              <Tooltip
                content={t("common.refresh")}
                placement="top"
                arrow
                animation="shift-away"
              >
                <button
                  className="action-btn"
                  type="button"
                  onClick={() => handleRefresh('topProducts')}
                  disabled={loadingStates.topProducts}
                >
                  <Icon icon="heroicons:arrow-path" className={loadingStates.topProducts ? 'animate-spin' : ''} />
                </button>
              </Tooltip>
            </div>
            <div className="legend-ring">
              <TopProductsPieChart height={420} onRefresh={registerRefresh('topProducts')} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
