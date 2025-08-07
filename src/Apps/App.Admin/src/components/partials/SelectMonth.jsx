import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { MenuItem } from "@headlessui/react";
const actions = [
  {
    name: "Last 28 Days",
  },
  {
    name: " Last Month ",
  },
  {
    name: "  Last Year ",
  },
];
const SelectMonth = () => {
  return (
    <>
      <Dropdown
        classMenuItems=" w-[140px]"
        label={
          <span className="text-lg inline-flex h-6 w-6 flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded-sm dark:text-slate-400">
            <Icon icon="heroicons-outline:dots-horizontal" />
          </span>
        }
      >
        <div>
          {actions.map((item, i) => (
            <MenuItem key={i}>
              <div
                className="`
                
                  hover:bg-secondary-500 dark:hover:bg-slate-600 dark:bg-slate-600/60 hover:text-white text-slate-900 dark:text-slate-300
                   w-full border-b border-b-gray-500/10 dark:border-slate-700/10 px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center `"
              >
                <span>{item.name}</span>
              </div>
            </MenuItem>
          ))}
        </div>
      </Dropdown>
    </>
  );
};

export default SelectMonth;
