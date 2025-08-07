import React from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import Bar from "@/components/ui/ProgressBar/Bar";
import Card from "@/components/ui/Card";
import Step from "./step";

const ProgressbarPage = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="Default Examples">
        <div className="space-y-4">
          <ProgressBar value={30} />
          <ProgressBar value={80} />
          <ProgressBar value={50} />
          <ProgressBar value={70} />
        </div>
      </Card>
      <Card title="Default Examples">
        <div className="space-y-4">
          <ProgressBar value={30} className="bg-primary-500" />
          <ProgressBar value={80} className="bg-danger-500" />
          <ProgressBar value={50} className="bg-warning-500" />
          <ProgressBar value={70} className=" bg-info-500" />
        </div>
      </Card>
      <Card title="Height Examples">
        <div className="space-y-4">
          <ProgressBar value={30} title="Progress sm" />
          <ProgressBar
            value={50}
            title="Progress md"
            backClass="h-[10px] rounded-[999px]"
            className="bg-primary-500"
          />
          <ProgressBar
            value={80}
            title="Progress xl"
            backClass="h-[14px] rounded-[999px]"
            className="bg-danger-500"
          />
          <ProgressBar
            value={70}
            title="Progress xl"
            backClass="h-4 rounded-[999px]"
            className="bg-warning-500"
          />
        </div>
      </Card>

      <Card title="Striped Examples">
        <div className="space-y-6">
          <ProgressBar
            value={30}
            className="bg-slate-900 "
            striped
            backClass="h-3 rounded-[999px]"
          />{" "}
          <ProgressBar
            value={30}
            className="bg-primary-500 "
            striped
            backClass="h-3 rounded-[999px]"
          />
          <ProgressBar
            value={80}
            className="bg-danger-500 "
            striped
            backClass="h-3 rounded-[999px]"
          />
          <ProgressBar
            value={50}
            className="bg-warning-500  "
            striped
            backClass="h-3 rounded-[999px]"
          />
          <ProgressBar
            value={70}
            className=" bg-info-500 "
            striped
            backClass="h-3 rounded-[999px]"
          />
        </div>
      </Card>
      <Card title="Striped Examples">
        <div className="space-y-6">
          <ProgressBar
            value={30}
            className="bg-slate-900 "
            striped
            backClass="h-3 rounded-[999px]"
            animate
          />
          <ProgressBar
            value={60}
            className="bg-primary-500 "
            striped
            backClass="h-3 rounded-[999px]"
            animate
          />
          <ProgressBar
            value={40}
            className="bg-danger-500 "
            striped
            backClass="h-3 rounded-[999px]"
            animate
          />
          <ProgressBar
            value={50}
            className="bg-warning-500  "
            striped
            backClass="h-3 rounded-[999px]"
            animate
          />
          <ProgressBar
            value={70}
            className=" bg-info-500 "
            striped
            backClass="h-3 rounded-[999px]"
            animate
          />
        </div>
      </Card>
      <Card title="Value Examples">
        <div className="space-y-6">
          <ProgressBar
            value={30}
            className="bg-slate-900 "
            showValue
            backClass="h-3 rounded-[999px]"
          />
          <ProgressBar
            value={60}
            className="bg-primary-500 "
            backClass="h-3 rounded-[999px]"
            showValue
          />
          <ProgressBar
            value={40}
            className="bg-danger-500 "
            showValue
            backClass="h-3 rounded-[999px]"
          />
          <ProgressBar
            value={50}
            className="bg-warning-500  "
            backClass="h-3 rounded-[999px]"
            showValue
          />
          <ProgressBar
            value={70}
            className=" bg-info-500 "
            backClass="h-3 rounded-[999px]"
            showValue
          />
        </div>
      </Card>
      <Card title="Multiple Bar Examples">
        <div className="grid grid-cols-1 gap-10">
          <ProgressBar backClass="h-3 rounded-[999px]">
            <Bar value={10} className="bg-primary-500" />
            <Bar value={20} className="bg-success-500" />
            <Bar value={20} className="bg-danger-500" />
          </ProgressBar>
          <ProgressBar backClass="h-3 rounded-[999px]">
            <Bar value={12} className="bg-primary-500" showValue />
            <Bar value={25} className="bg-success-500" showValue />
            <Bar value={25} className="bg-danger-500" showValue />
          </ProgressBar>
          <ProgressBar backClass="h-3 rounded-[999px]">
            <Bar value={15} className="bg-primary-500" striped />
            <Bar value={30} className="bg-success-500" striped />
            <Bar value={30} className="bg-danger-500" striped />
          </ProgressBar>
          <ProgressBar backClass="h-3 rounded-[999px]">
            <Bar value={18} className="bg-primary-500" showValue striped />
            <Bar value={33} className="bg-success-500" showValue striped />
            <Bar value={33} className="bg-danger-500" showValue striped />
          </ProgressBar>
        </div>
      </Card>
      <Card title="Step Progress Bar Examples">
        <Step />
      </Card>
    </div>
  );
};

export default ProgressbarPage;
