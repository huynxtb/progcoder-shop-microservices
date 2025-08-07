import React from "react";
import world from "@/constant/world-map.json";
import { VectorMap } from "@south-paw/react-vector-maps";

const slaes = [
  {
    title: "Nevada",
    amount: "$125k",
    cls: "bg-primary-500 ring-primary-500",
  },
  {
    title: "Colorado",
    amount: "$$325k",
    cls: "bg-success-500 ring-success-500",
  },
  {
    title: "Iowa",
    amount: "$67",
    cls: "bg-info-500 ring-info-500",
  },
  {
    title: "Arkansas",
    amount: "$354k",
    cls: "bg-warning-500 ring-warning-500",
  },
  {
    title: "Wyoming",
    amount: "$195k",
    cls: "bg-success-500 ring-success-500",
  },
  {
    title: "Other countries",
    amount: "$295k",
    cls: "bg-secondary-500 ring-secondary-500",
  },
];

const MostSales = ({ filterMap }) => {
  return (
    <div className="md:flex items-center">
      <div className="flex-none">
        <h4 className="text-slate-600 dark:text-slate-200 text-sm font-normal mb-[6px]">
          Total earnings
        </h4>
        {filterMap === "usa" && (
          <div className="text-lg font-medium mb-[6px] dark:text-white text-slate-900">
            $12,65,64787.00
          </div>
        )}
        {filterMap === "global" && (
          <div className="text-lg font-medium mb-[6px] dark:text-white text-slate-900">
            $12,65.00
          </div>
        )}
        <div className="text-xs font-light dark:text-slate-200">
          <span className="text-primary-500">+08%</span> From last month
        </div>
        <ul className="bg-slate-50 dark:bg-slate-900 rounded-sm p-4 min-w-[184px] space-y-5 mt-4">
          {slaes.map((item, i) => (
            <li
              key={i}
              className="flex justify-between text-xs text-slate-600 dark:text-slate-300"
            >
              <span className="flex space-x-2 rtl:space-x-reverse items-center">
                <span
                  className={` inline-flex h-[6px] w-[6px] bg-primary-500 ring-opacity-25 rounded-full ring-4
                        ${item.cls}
                        `}
                ></span>
                <span>{item.title}</span>
              </span>
              <span>{item.amount}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">
        <VectorMap {...world} className="dash-codevmap" />
      </div>
    </div>
  );
};

export default MostSales;
