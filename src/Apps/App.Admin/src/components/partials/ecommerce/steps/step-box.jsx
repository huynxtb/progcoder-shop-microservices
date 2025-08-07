import React from "react";
import Icon from "@/components/ui/Icon";
import clsx from "clsx";

const StepBox = ({ item, index, stepNumber }) => {
  const { step, title, icon } = item;
  return (
    <li
      className={clsx(
        "relative flex  bg-white dark:bg-slate-700  items-center justify-center text-center  lg:border border-slate-300 dark:border-slate-700 rounded-t xl:px-10 xl:py-7 lg:px-3 lg:py-6  transition-all duration-150 after:absolute  after:bottom-[-8px] after:rounded-b after:w-full lg:after:h-2",
        {
          " after:bg-success-500  text-success-500 ": stepNumber > index,
          "after:bg-slate-300 dark:after:bg-slate-700 text-slate-500 dark:text-slate-500 ":
            stepNumber < index,
          "after:bg-slate-900 dark:after:bg-slate-300 text-slate-900 dark:text-slate-300  ":
            stepNumber === index,
        }
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-3 ">
        <Icon className=" h-8 w-8" icon={icon} />
        <div className="text-base font-medium lg:block hidden ">
          {step}. {title}
        </div>
      </div>
    </li>
  );
};

export default StepBox;
