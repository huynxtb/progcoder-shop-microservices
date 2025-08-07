import React from "react";
import Card from "@/components/ui/Card";
import GroupChart3 from "../../components/partials/widget/chart/group-chart-3";
import SelectMonth from "@/components/partials/SelectMonth";
import StackBarChart from "../../components/partials/widget/chart/stack-bar";
import Calculation from "../../components/partials/widget/chart/Calculation";
import ExampleTwo from "../table/react-tables/ExampleTwo";
import HomeBredCurbs from "./HomeBredCurbs";
const campaigns = [
  {
    name: "Channel",
    value: "roi",
  },
  {
    name: "Email",
    value: "40%",
  },
  {
    name: "Website",
    value: "28%",
  },
  {
    name: "Facebook",
    value: "34%",
  },
  {
    name: "Offline",
    value: "17%",
  },
];
const CrmPage = () => {
  return (
    <div>
      <HomeBredCurbs title="Crm" />
      <div className="space-y-5">
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-8 col-span-12 space-y-5">
            <Card>
              <div className="grid xl:grid-cols-4 lg:grid-cols-2 col-span-1 gap-3">
                <GroupChart3 />
              </div>
            </Card>
            <Card>
              <header className="md:flex md:space-y-0 space-y-4">
                <h6 className="flex-1 text-slate-900 dark:text-white capitalize">
                  Deal distribution by stage
                </h6>
                <div className="flex-none">
                  <SelectMonth />
                </div>
              </header>
              <div className="legend-ring">
                <StackBarChart />
              </div>
            </Card>
          </div>
          <div className="lg:col-span-4 col-span-12 space-y-5">
            <div className="lg:col-span-4 col-span-12 space-y-5">
              <Card title="Campaigns" headerSlot={<SelectMonth />}>
                <ul className="divide-y divide-slate-100 dark:divide-slate-700!">
                  {campaigns.map((item, i) => (
                    <li
                      key={i}
                      className="first:text-xs text-sm first:text-slate-600 text-slate-600 dark:text-slate-300 py-2 first:uppercase"
                    >
                      <div className="flex justify-between">
                        <span>{item.name}</span>
                        <span>{item.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card title="trends calcultation" headerSlot={<SelectMonth />}>
                <div className="legend-ring3">
                  <Calculation />
                </div>
              </Card>
            </div>
          </div>
        </div>

        <ExampleTwo title="Latest Transaction" />
      </div>
    </div>
  );
};

export default CrmPage;
