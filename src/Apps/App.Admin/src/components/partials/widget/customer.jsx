import React from "react";
import ProgressBar from "@/components/ui/ProgressBar";

import Image1 from "@/assets/images/all-img/cus-1.png";
import Image2 from "@/assets/images/all-img/cus-2.png";
import Image3 from "@/assets/images/all-img/cus-3.png";

import Cuser1 from "@/assets/images/users/user-1.jpg";
import Cuser2 from "@/assets/images/users/user-2.jpg";
import Cuser3 from "@/assets/images/users/user-3.jpg";
import customerCrownImage from "@/assets/images/icon/crown.svg";
const Customer = () => {
  const customers = [
    {
      title: "Nicole Kidman",
      img: Image1,
      value: 70,
      bg: "before:bg-info-500/25",
      barColor: "bg-info-500",
      number: 2,
    },
    {
      title: "Monica Bellucci",
      img: Image2,
      value: 80,
      bg: "before:bg-warning-500/25",
      barColor: "bg-warning-500",
      active: true,
      number: 1,
    },
    {
      title: "Pamela Anderson",
      img: Image3,
      value: 65,
      bg: "before:bg-success-500/25",
      barColor: "bg-success-500",
      number: 3,
    },
  ];
  const customers2 = [
    {
      title: "Dianne Russell",
      img: Cuser1,
      value: 60,
      bg: "before:bg-info-500/25",
      barColor: "bg-info-500",
      number: 4,
    },
    {
      title: "Robert De Niro",
      img: Cuser2,
      value: 50,
      bg: "before:bg-warning-500/25",
      barColor: "bg-warning-500",

      number: 5,
    },
    {
      title: "De Niro",
      img: Cuser3,
      value: 60,
      bg: "before:bg-warning-500/25",
      barColor: "bg-warning-500",

      number: 6,
    },
  ];
  return (
    <div className="pb-2">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {customers.map((item, i) => (
          <div
            key={i}
            className={` relative z-1 text-center p-4 rounded-sm before:w-full before:h-[calc(100%-60px)] before:absolute before:left-0 before:top-[60px] before:rounded-sm before:z-[-1] before:bg-opacity-[0.1] ${item.bg}`}
          >
            <div
              className={`${
                item.active ? "ring-2 ring-[#FFC155]" : ""
              } h-[70px] w-[70px] rounded-full mx-auto mb-4 relative`}
            >
              {item.active && (
                <span className="crown absolute -top-[24px] left-1/2 -translate-x-1/2">
                  <img src={customerCrownImage} alt="" />
                </span>
              )}
              <img
                src={item.img}
                alt=""
                className="w-full h-full rounded-full"
              />
              <span className="h-[27px] w-[27px] absolute right-0 bottom-0 rounded-full bg-[#FFC155] border border-white flex flex-col items-center justify-center text-white text-xs font-medium">
                {item.number}
              </span>
            </div>
            <h4 className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-4">
              {item.title}
            </h4>
            <div className="inline-block bg-slate-900 text-white px-[10px] py-[6px] text-xs font-medium rounded-full min-w-[60px]">
              {item.value}
            </div>
            <div>
              <div className="flex justify-between text-sm font-normal dark:text-slate-300 mb-3 mt-4">
                <span>Progress</span>
                <span className="font-normal">{item.value}%</span>
              </div>
              <ProgressBar value={item.value} className={item.barColor} />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5">
        {customers2.map((item, i) => (
          <div
            key={i}
            className="relative z-1 p-4 rounded-sm md:flex items-center bg-gray-5003 dark:bg-slate-900 md:space-x-10 md:space-y-0 space-y-3 rtl:space-x-reverse"
          >
            <div
              className={`${
                item.active ? "ring-2 ring-[#FFC155]" : ""
              } h-10 w-10 rounded-full relative`}
            >
              {item.active && (
                <span className="crown absolute -top-[14px] left-1/2 -translate-x-1/2">
                  <img src={customerCrownImage} alt="" />
                </span>
              )}
              <img
                src={item.img}
                alt=""
                className="w-full h-full rounded-full"
              />
              <span className="h-4 w-4 absolute right-0 bottom-0 rounded-full bg-[#FFC155] border border-white flex flex-col items-center justify-center text-white text-[10px] font-medium">
                {item.number}
              </span>
            </div>
            <h4 className="text-sm text-slate-600 font-semibold">
              {item.title}
            </h4>
            <div className="inline-block text-center bg-slate-900 text-white px-[10px] py-[6px] text-xs font-medium rounded-full min-w-[60px]">
              {item.value}
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-sm font-normal dark:text-slate-300 mb-3">
                <span>Progress</span>
                <span className="font-normal">{item.value}%</span>
              </div>
              <ProgressBar value={item.value} className={item.barColor} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
