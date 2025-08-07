import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import TotalTable from "./TotalTable";
import userDarkMode from "@/hooks/useDarkMode";

// import images
import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";

const InvoicePreviewPage = () => {
  const printPage = () => {
    window.print();
  };
  const [isDark] = userDarkMode();

  return (
    <div>
      <div className="lg:flex justify-between flex-wrap items-center mb-6">
        <h4>title</h4>
        <div className="flex lg:justify-end items-center flex-wrap space-xy-5">
          <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
            <span className="text-lg">
              <Icon icon="heroicons:pencil-square" />
            </span>
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={printPage}
            className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse"
          >
            <span className="text-lg">
              <Icon icon="heroicons:printer" />
            </span>
            <span>Print</span>
          </button>
          <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
            <span className="text-lg">
              <Icon icon="heroicons:arrow-down-tray" />
            </span>
            <span>Download</span>
          </button>
          <button className="invocie-btn inline-flex btn btn-sm whitespace-nowrap space-x-1 cursor-pointer bg-white dark:bg-slate-800 dark:text-slate-300 btn-md h-min text-sm font-normal text-slate-900 rtl:space-x-reverse">
            <span className="text-lg transform -rotate-45">
              <Icon icon="heroicons:paper-airplane" />
            </span>
            <span>Send invoice</span>
          </button>
        </div>
      </div>
      <Card bodyClass="p-0">
        <div className="flex justify-between flex-wrap space-y-4 px-6 pt-6 bg-slate-50 dark:bg-slate-800 pb-6 rounded-t-md">
          <div>
            <img src={isDark ? LogoWhite : MainLogo} alt="" />

            <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
              Dashcode <br />
              House# 339, New DOHS, Mohakhali, <br />
              Dhaka - 1206, Bangladesh
              <div className="flex space-x-2 mt-2 leading-none rtl:space-x-reverse">
                <Icon icon="heroicons-outline:phone" />
                <span>(252) 555-0126,(201) 555-0124</span>
              </div>
              <div className="mt-[6px] flex space-x-2 leading-none rtl:space-x-reverse">
                <Icon icon="heroicons-outline:mail" />
                <span>Dashcode@example.com</span>
              </div>
            </div>
          </div>
          <div>
            <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl">
              Bill to:
            </span>

            <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 mt-4 text-sm">
              Annette black-500 <br />
              4140 Parker Rd. Allentown, New <br />
              Mexico 31134
              <div className="flex space-x-2 mt-2 leading-none rtl:space-x-reverse">
                <Icon icon="heroicons-outline:phone" />
                <span>(252) 555-0126,(201) 555-0124</span>
              </div>
              <div className="mt-[6px] flex space-x-2 leading-none rtl:space-x-reverse">
                <Icon icon="heroicons-outline:mail" />
                <span>Dashcode@example.com</span>
              </div>
            </div>
          </div>
          <div className="space-y-[2px]">
            <span className="block text-slate-900 dark:text-slate-300 font-medium leading-5 text-xl mb-4">
              Invoice:
            </span>
            <h4 className="text-slate-600 font-medium dark:text-slate-300 text-xs uppercase">
              Invoice number:
            </h4>
            <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 text-sm">
              #89572935Kh
            </div>
            <h4 className="text-slate-600 font-medium dark:text-slate-300 text-xs uppercase">
              date
            </h4>
            <div className="text-slate-500 dark:text-slate-300 font-normal leading-5 text-sm">
              09 December 2021
            </div>
          </div>
        </div>
        <div className="max-w-[980px] mx-auto shadow-base dark:shadow-none my-8 rounded-md overflow-x-auto">
          <TotalTable />
        </div>
        <div className="py-10 text-center md:text-2xl text-xl font-normal text-slate-600 dark:text-slate-300">
          Thank you for your purchase!
        </div>
      </Card>
    </div>
  );
};

export default InvoicePreviewPage;
