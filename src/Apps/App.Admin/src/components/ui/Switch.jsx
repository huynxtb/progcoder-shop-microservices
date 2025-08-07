import React from "react";
import Icon from "@/components/ui/Icon";

const Swicth = ({
  prevIcon,
  nextIcon,
  label,
  id,
  disabled,
  value,
  onChange,
  activeClass = "bg-slate-900 dark:bg-slate-900",
  wrapperClass = " ",
  labelClass = "text-slate-500 dark:text-slate-400 text-sm leading-6",
  badge,
}) => {
  return (
    <div>
      <label
        className={
          `flex items-center ${
            disabled ? " cursor-not-allowed opacity-50" : "cursor-pointer "
          }` +
          "" +
          wrapperClass
        }
        id={id}
      >
        <input
          type="checkbox"
          className="hidden"
          checked={value}
          onChange={onChange}
          htmlFor={id}
          disabled={disabled}
        />
        <div
          className={`relative inline-flex h-6 w-[46px] ltr:mr-3 rtl:ml-3 items-center rounded-full transition-all duration-150
          ${value ? activeClass : "bg-secondary-500"}
          `}
        >
          {badge && value && (
            <span className="absolute leading-[1px] left-1 top-1/2 -translate-y-1/2 capitalize font-bold text-white tracking-[1px]">
              {prevIcon ? (
                <Icon icon={prevIcon} />
              ) : (
                <span className="text-[9px] ">on</span>
              )}
            </span>
          )}
          {badge && !value && (
            <span className="absolute right-1 leading-[1px] top-1/2 -translate-y-1/2 capitalize font-bold text-slate-900 tracking-[1px]">
              {nextIcon ? (
                <Icon icon={nextIcon} />
              ) : (
                <span className="text-[9px]">Off</span>
              )}
            </span>
          )}

          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-150 
          ${
            value
              ? "ltr:translate-x-6 rtl:-translate-x-6"
              : "ltr:translate-x-[2px] rtl:-translate-x-[2px]"
          }
          `}
          />
        </div>
        {label && <span className={labelClass}>{label}</span>}
      </label>
    </div>
  );
};

export default Swicth;
