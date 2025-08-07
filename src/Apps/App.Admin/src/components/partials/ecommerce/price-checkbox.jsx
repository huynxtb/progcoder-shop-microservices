import React from "react";
function PriceCheckbox({ item }) {
  return (
    <div className="flex justify-between space-y-1">
      <label
        key={item.value}
        className=" flex items-center space-x-3 rtl:space-x-reverse  font-normal text-sm text-slate-900 dark:text-slate-300"
      >
        <input type="checkbox" className="table-checkbox" value={item.value} />
        <span>{item.label}</span>
      </label>
      <span className="text-slate-500 dark:text-slate-500 text-xs font-normal">
        {item.count}
      </span>
    </div>
  );
}

export default PriceCheckbox;
