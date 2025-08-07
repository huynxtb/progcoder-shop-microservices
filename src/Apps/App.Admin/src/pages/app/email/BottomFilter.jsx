import React from "react";

const BottomFilter = ({ onClick, item, filter }) => {
  return (
    <li
      onClick={onClick}
      className={` flex space-x-2 
                      text-sm capitalize py-2 cursor-pointer
                       items-center rtl:space-x-reverse
                        ${
                          filter === item.value
                            ? "font-medium text-slate-800 dark:text-slate-300"
                            : "font-normal text-slate-600 dark:text-slate-300"
                        }
                        `}
    >
      <span
        className={`  ${
                                   item.value === "personal"
                                     ? "bg-danger-500 ring-danger-500/30"
                                     : ""
                                 }
                  ${
                    item.value === "social"
                      ? "bg-success-500 ring-success-500/30"
                      : ""
                  }
                  ${
                    item.value === "promotions"
                      ? "bg-warning-500 ring-warning-500/30"
                      : ""
                  }
                  ${
                    item.value === "business"
                      ? "bg-primary-500 ring-primary-500/30"
                      : ""
                  }
                                ${filter === item.value ? "ring-4" : "ring-0"}
                                
                  inline-block h-2 w-2 rounded-full ring-opacity-30 transition-all duration-150 `}
      ></span>
      <span className="transition duration-150">{item.name}</span>
    </li>
  );
};

export default BottomFilter;
