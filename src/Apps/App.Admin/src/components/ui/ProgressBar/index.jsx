import React from "react";
import Bar from "./Bar";
const ProgressBar = ({
  title,
  children,
  value,
  backClass = "rounded-[999px]",
  className = "bg-slate-900",
  titleClass = "text-base font-normal",
  striped,
  animate,
  showValue,
}) => {
  return (
    <div className="relative">
      {title && (
        <span
          className={`block text-slate-500   tracking-[0.01em] mb-2 ${titleClass}`}
        >
          {title}
        </span>
      )}
      {
        // if no children, then show the progress bar
        !children && (
          <div
            className={`w-full  overflow-hidden bg-slate-300 dark:bg-slate-600 progress  ${backClass}`}
          >
            <Bar
              value={value}
              className={className}
              striped={striped}
              animate={animate}
              showValue={showValue}
            />
          </div>
        )
      }
      {
        // if children, then show the progress bar with children
        children && (
          <div
            className={`w-full  overflow-hidden bg-slate-300 dark:bg-slate-600 flex progress  ${backClass}`}
          >
            {children}
          </div>
        )
      }
    </div>
  );
};

export default ProgressBar;
