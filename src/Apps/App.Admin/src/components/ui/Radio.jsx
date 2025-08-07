import React from "react";

const Radio = ({
  label,
  id,
  name,
  disabled,
  value,
  onChange,
  activeClass = "ring-slate-500 dark:ring-slate-400",
  wrapperClass = " ",
  labelClass = "text-slate-500 dark:text-slate-400 text-sm leading-6",
  checked,
  className = "h-[18px] w-[18px]",
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
          type="radio"
          className="hidden"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          htmlFor={id}
          disabled={disabled}
        />
        <span
          className={` flex-none  bg-white dark:bg-slate-500 rounded-full border inline-flex  ltr:mr-3 rtl:ml-3 relative transition-all duration-150
          ${className}
          ${
            checked
              ? activeClass +
                " ring-[6px]  ring-inset ring-offset-2 dark:ring-offset-slate-600  dark:ring-offset-4 border-slate-700"
              : "border-slate-400 dark:border-slate-600 dark:ring-slate-700"
          }
          `}
        ></span>
        {label && <span className={labelClass}>{label}</span>}
      </label>
    </div>
  );
};

export default Radio;
