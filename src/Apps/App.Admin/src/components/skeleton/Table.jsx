import React from "react";

const SkeletionTable = ({ items, count }) => {
  items = items || Array.from({ length: count });
  return (
    <div className="w-full bg-white dark:bg-slate-700 shadow-base p-6 rounded-md">
      <table className="animate-pulse w-full border-separate border-spacing-4 table-fixed">
        <thead>
          <tr>
            <th scope="col">
              <div className="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div>
            </th>
            <th scope="col">
              <div className="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div>
            </th>
            <th scope="col">
              <div className="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div>
            </th>
            <th scope="col">
              <div className="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div>
            </th>
            <th scope="col">
              <div className="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div>
            </th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {items.map((item, i) => (
            <tr key={i}>
              <td>
                <div className="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div>
              </td>
              <td>
                <div className="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div>
              </td>
              <td>
                <div className="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div>
              </td>
              <td>
                <div className="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div>
              </td>
              <td>
                <div className="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletionTable;
