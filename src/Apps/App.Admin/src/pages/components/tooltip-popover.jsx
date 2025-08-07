import React from "react";
import Tooltip from "@/components/ui/Tooltip";
import Card from "@/components/ui/Card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/Popover";

const TooltipPage = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="Tooltip Position">
        <p className="dark:text-slate-300 text-slate-600 text-base mb-4">
          available options for positioning:
          <code className="font-Inter p-1 rounded-sm bg-[#E0EAFF] dark:bg-slate-700 text-slate-900 dark:text-slate-300 text-sm">
            top,bottom,left,right
          </code>
        </p>
        <div className="space-xy-5 flex flex-wrap">
          <Tooltip
            className="btn btn-outline-dark"
            title="Tooltip On Top"
            content="This is a tooltip"
            side="top"
          />
          <Tooltip
            className="btn btn-outline-dark"
            title="Tooltip On Right"
            content="This is a tooltip"
            side="right"
          />
          <Tooltip
            className="btn btn-outline-dark"
            title="Tooltip On Left"
            content="This is a tooltip"
            side="left"
          />
          <Tooltip
            className="btn btn-outline-dark"
            title="Tooltip On Bottom"
            content="This is a tooltip"
            side="bottom"
          />
        </div>
      </Card>
      <Card title="Theme Style Tooltip">
        <div className="space-xy-5 flex flex-wrap">
          <Tooltip
            className="btn btn-outline-primary"
            title="Primary"
            content="This is a tooltip"
            side="top"
            theme="primary"
          />
          <Tooltip
            className="btn btn-outline-secondary"
            title="Secondary"
            content="This is a tooltip"
            side="top"
            theme="secondary"
          />
          <Tooltip
            className="btn btn-outline-warning"
            title="Warning"
            content="This is a tooltip"
            side="top"
            theme="warning"
          />
          <Tooltip
            className="btn btn-outline-danger"
            title="Danger"
            content="This is a tooltip"
            side="top"
            theme="danger"
          />
          <Tooltip
            className="btn btn-outline-success"
            title="Success"
            content="This is a tooltip"
            side="top"
            theme="success"
          />
          <Tooltip
            className="btn btn-outline-dark"
            title="Dark"
            content="This is a tooltip"
            side="top"
          />
        </div>
      </Card>
      <Card title="Popover">
        <div className="space-xy-5 flex flex-wrap">
          <Popover>
            <PopoverTrigger className="btn btn-outline-dark" title="Popover Top" />
            <PopoverContent title="Popover Top Start" align="start" side="top">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates natus laborum cum, eveniet sequi sint harum voluptatum, dolor exercitationem officiis labore sed earum error. Quod maxime rem aliquid eveniet deserunt.
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger className="btn btn-outline-dark" title="Popover Right" />
            <PopoverContent title="Popover Content" align="center" side="right">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates natus laborum cum, eveniet sequi sint harum voluptatum, dolor exercitationem officiis labore sed earum error. Quod maxime rem aliquid eveniet deserunt.
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger className="btn btn-outline-dark" title="Popover Bottom" />
            <PopoverContent title="Popover Content" align="center" side="bottom">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates natus laborum cum, eveniet sequi sint harum voluptatum, dolor exercitationem officiis labore sed earum error. Quod maxime rem aliquid eveniet deserunt.
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger className="btn btn-outline-dark" title="Popover Left" />
            <PopoverContent title="Popover Content" align="center" side="left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates natus laborum cum, eveniet sequi sint harum voluptatum, dolor exercitationem officiis labore sed earum error. Quod maxime rem aliquid eveniet deserunt.
            </PopoverContent>
          </Popover>
        </div>
      </Card>
    </div>
  );
};

export default TooltipPage;
