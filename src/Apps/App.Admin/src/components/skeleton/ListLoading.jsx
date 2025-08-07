import React from "react";

const ListLoading = ({ items, count }) => {
  items = items || Array.from({ length: count });
  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-700">
      {items.map((item, i) => (
        <div className="p-4 w-full mx-auto" key={i}>
          <div className="animate-pulse flex items-center space-x-4">
            <div className="flex-none flex space-x-2 items-center">
              <div className="rounded-sm h-5 w-5 bg-[#C4C4C4] dark:bg-slate-500"></div>
              <div className="rounded-sm h-5 w-5 bg-[#C4C4C4] dark:bg-slate-500"></div>
              <div className="h-8 w-8 rounded-full bg-[#C4C4C4] dark:bg-slate-500"></div>
            </div>
            <div className="flex-1 bg-[#C4C4C4] dark:bg-slate-500 h-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListLoading;
