import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import GroupChart5 from "@/components/partials/widget/chart/group-chart5";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import HistoryChart from "@/components/partials/widget/chart/history-chart";
import AccountReceivable from "@/components/partials/widget/chart/account-receivable";
import AccountPayable from "@/components/partials/widget/chart/account-payable";
import CardSlider from "@/components/partials/widget/CardSlider";
import TransactionsTable from "@/components/partials/Table/transactions";
import SelectMonth from "@/components/partials/SelectMonth";
import HomeBredCurbs from "./HomeBredCurbs";

import Mainuser from "@/assets/images/all-img/main-user.png";
const users = [
  {
    name: "Ab",
  },
  {
    name: "Bc",
  },
  {
    name: "Cd",
  },
  {
    name: "Df",
  },
  {
    name: "Ab",
  },
  {
    name: "Sd",
  },
  {
    name: "Sg",
  },
];

const BankingPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="space-y-5">
      <HomeBredCurbs title="Banking" />
      <Card>
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 place-content-center">
          <div className="flex space-x-4 h-full items-center rtl:space-x-reverse">
            <div className="flex-none">
              <div className="h-20 w-20 rounded-full">
                <img src={Mainuser} alt="" className="w-full h-full" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-medium mb-2">
                <span className="block font-light">Good evening,</span>
                <span className="block">Mr. Jone Doe</span>
              </h4>
              <p className="text-sm dark:text-slate-300">Welcome to Dashcode</p>
            </div>
          </div>
          <GroupChart5 />
        </div>
      </Card>
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-4 col-span-12 space-y-5">
          <Card title="My card">
            <div className="max-w-[90%] mx-auto mt-2">
              <CardSlider />
            </div>
          </Card>
          <Card title="Quick transfer">
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-lg text-slate-900 dark:text-white">
                    Contacts
                  </span>
                  <Link
                    to="#"
                    className="font-medium text-slate-900 dark:text-white underline text-sm"
                  >
                    View all
                  </Link>
                </div>
                <SimpleBar>
                  <ul className="flex space-x-6 py-3 px-1">
                    {users.map((item, i) => (
                      <li
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={` h-[42px] w-[42px] cursor-pointer text-xl font-medium capitalize flex-none rounded-full bg-primary-500 text-white flex flex-col items-center justify-center
                     ${
                       activeIndex === i
                         ? "ring-2 ring-primary-500 ring-offset-2 "
                         : ""
                     }
                      `}
                      >
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </SimpleBar>
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-md p-4">
                <span
                  className="text-xs text-slate-500 dark:text-slate-400 block mb-1 cursor-pointer font-normal"
                  htmlFor="cdp"
                >
                  Amount
                </span>
                <Textinput
                  placeholder="$6547"
                  id="cdp"
                  className="bg-transparent border-none focus:ring-0 focus:border-none p-0 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 placeholder:font-medium  h-auto font-medium"
                />
              </div>
              <div className="bg-slate-100 dark:bg-slate-900 rounded-md p-4">
                <label
                  className="text-xs text-slate-500 dark:text-slate-400 block cursor-pointer mb-1"
                  htmlFor="cd"
                >
                  Recipient account number
                </label>

                <Textinput
                  placeholder="3458-3548-6548-3244"
                  isMask
                  id="cd"
                  className="bg-transparent border-none focus:ring-0 focus:border-none p-0 text-slate-900 dark:text-white text-sm placeholder:text-slate-400 h-auto placeholder:font-medium font-medium"
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    Total amount
                  </span>
                  <span className="text-lg font-medium text-slate-900 dark:text-white block">
                    $6547
                  </span>
                </div>
                <div>
                  <button type="button" className="btn btn-dark">
                    Send money
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <div className="space-y-5 bank-table">
            <TransactionsTable />
            <Card title="History" headerSlot={<SelectMonth />}>
              <div className="legend-ring4">
                <HistoryChart />
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <Card title="Account Receivable" headerSlot={<SelectMonth />}>
          <AccountReceivable />
        </Card>
        <Card title="Account Payable" headerSlot={<SelectMonth />}>
          <AccountPayable />
        </Card>
      </div>
    </div>
  );
};

export default BankingPage;
