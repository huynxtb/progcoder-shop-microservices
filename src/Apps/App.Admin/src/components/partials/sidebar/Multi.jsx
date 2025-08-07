import Badge from "@/components/ui/Badge";
import React from "react";
import { Collapse } from "react-collapse";
import { NavLink } from "react-router-dom";

const LockLink = ({ to, children, item }) => {
  const { multiTitle, badge } = item;
  return (
    <>
      {item.badge ? (
        <span
          className={`text-slate-600 dark:text-slate-300 opacity-50 cursor-not-allowed
           text-sm flex space-x-3 rtl:space-x-reverse items-center `}
        >
          <span className="h-2 w-2 rounded-full border border-slate-600 dark:border-white inline-block flex-none"></span>
          <span className="flex-1 flex  space-x-2 rtl:space-x-reverse  truncate">
            <span className=" grow   truncate">{multiTitle}</span>
            <span className="grow-0">
              <Badge className="bg-slate-900 px-2 py-[3px]  font-normal text-xs rounded-full text-slate-100  capitalize">
                {badge}
              </Badge>
            </span>
          </span>
        </span>
      ) : (
        <NavLink to={to}>{children}</NavLink>
      )}
    </>
  );
};

const Multilevel = ({ activeMultiMenu, j, subItem }) => {
  return (
    <Collapse isOpened={activeMultiMenu === j}>
      <ul className="space-y-[14px] pl-4">
        {subItem?.multi_menu?.map((item, i) => (
          <li key={i} className=" first:pt-[14px]">
            <LockLink to={item.multiLink} item={item}>
              {({ isActive }) => (
                <span
                  className={`${
                    isActive
                      ? " text-black dark:text-white font-medium"
                      : "text-slate-600 dark:text-slate-300"
                  } text-sm flex space-x-3 rtl:space-x-reverse items-center transition-all duration-150`}
                >
                  <span
                    className={`${
                      isActive
                        ? " bg-slate-900 dark:bg-slate-300 ring-4 ring-slate-500/20 dark:ring-slate-300/20"
                        : ""
                    } h-2 w-2 rounded-full border border-slate-600! dark:border-white inline-block flex-none`}
                  ></span>
                  <span className="flex-1">{item.multiTitle}</span>
                </span>
              )}
            </LockLink>
          </li>
        ))}
      </ul>
    </Collapse>
  );
};

export default Multilevel;
