import React from "react";

function CatagoriesFilterCheckbox({
  category,
  categoryFilter,
  handleCategoryChange,
}) {
  return (
    <div className="flex justify-between space-y-1">
      <label className=" flex items-center space-x-3 rtl:space-x-reverse  font-normal text-sm text-slate-900 dark:text-slate-300">
        <input
          type="checkbox"
          className="table-checkbox"
          value={category.value}
          checked={categoryFilter === category.value}
          onChange={handleCategoryChange}
        />
        <span>{category.label}</span>
      </label>
      <span className="text-slate-500 dark:text-slate-500 text-xs font-normal">
        {category.count}
      </span>
    </div>
  );
}

export default CatagoriesFilterCheckbox;
