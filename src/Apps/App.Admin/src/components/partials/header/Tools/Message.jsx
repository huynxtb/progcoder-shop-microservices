import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";
import { MenuItem } from "@headlessui/react";
import { message } from "@/constant/data";

const messagelabel = () => {
  return (
    <span className="relative lg:h-[32px] lg:w-[32px] lg:bg-slate-100 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center">
      <Icon icon="heroicons-outline:mail" />
      <span className="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-99">
        10
      </span>
    </span>
  );
};
// message slice  0-4
const newMessage = message.slice(0, 4);

const Message = () => {
  return (
    <Dropdown
      classMenuItems="md:w-[335px] w-min top-[58px]"
      label={messagelabel()}
    >
      <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600">
        <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
          Messages
        </div>
        <div className="text-slate-800 dark:text-slate-200 text-xs md:text-right">
          <Link to="/chat" className="underline">
            View all
          </Link>
        </div>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {newMessage?.map((item, i) => (
          <MenuItem key={i}>
            {({ isActive }) => (
              <div
                className={`${
                  isActive
                    ? "bg-slate-100 text-slate-800 dark:bg-slate-600 dark:bg-opacity-70"
                    : "text-slate-600 dark:text-slate-300"
                } block w-full px-4 py-2 text-sm  cursor-pointer`}
              >
                <div className="flex ltr:text-left rtl:text-right space-x-3 rtl:space-x-reverse">
                  <div className="flex-none">
                    <div className="h-8 w-8 bg-white dark:bg-slate-700 rounded-full relative">
                      <span
                        className={`${
                          item.active ? "bg-secondary-500" : "bg-green-500"
                        } w-[10px] h-[10px] rounded-full border border-white dark:border-slate-700  inline-block absolute right-0 top-0`}
                      ></span>
                      <img
                        src={item.image}
                        alt=""
                        className="block w-full h-full object-cover rounded-full border hover:border-white border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-800 dark:text-slate-300 text-sm font-medium mb-1`">
                      {item.title}
                    </div>
                    <div className="text-xs hover:text-[#68768A] text-slate-600 dark:text-slate-300 mb-1">
                      {item.desc}
                    </div>
                    <div className="text-slate-400 dark:text-slate-400 text-xs">
                      3 min ago
                    </div>
                  </div>
                  {item.hasnotifaction && (
                    <div className="flex-0">
                      <span className="h-4 w-4 bg-danger-500 border border-white rounded-full text-[10px] flex items-center justify-center text-white">
                        {item.notification_count}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </MenuItem>
        ))}
      </div>
    </Dropdown>
  );
};

export default Message;
