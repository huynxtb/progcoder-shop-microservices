import React from "react";
import { Link } from "react-router-dom";
import { message } from "@/constant/data";

const MessageList = () => {
  const newMessage = message.slice(0, 5);
  return (
    <div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-700! -mx-6 -mb-6">
        {newMessage?.map((item, i) => (
          <li key={i}>
            <Link
              to="chat"
              className="hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-slate-800 text-slate-600 dark:text-slate-300 block w-full px-4 py-3 text-sm mb-2 last:mb-0 cursor-pointer"
            >
              <div className="flex ltr:text-left rtl:text-right">
                <div className="flex-none ltr:mr-3 rtl:ml-3">
                  <div className="h-8 w-8 bg-white dark:bg-slate-700 rounded-full relative">
                    <span
                      className={`${
                        item.active ? "bg-secondary-500" : "bg-success-500"
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
                  <div className="text-xs hover:text-[#68768A] font-normal text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </div>
                  <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                    3 min ago
                  </div>
                </div>
                {item.hasnotifaction && (
                  <div className="flex-0">
                    <span className="h-4 w-4 bg-danger-500 border border-none rounded-full text-[10px] flex items-center justify-center text-white">
                      {item.notification_count}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
