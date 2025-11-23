import Icon from "@/components/ui/Icon";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React, { useState } from "react";
import { DateRangePicker, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useTranslation } from "react-i18next";

const HomeBredCurbs = ({ title }) => {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(11)),
    key: "selection",
  });

  const singleSelect = (date) => {
    setSelectedDate(date);
    console.log(date);
  };
  const handleSelect = (ranges) => {
    setSelectionRange({
      ...selectionRange,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  return (
    <div className="flex justify-between flex-wrap items-center gap-6 mb-6">
      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
        {title}
      </h4>
      <div className="flex sm:space-x-4 space-x-2 sm:justify-end items-center rtl:space-x-reverse">
        <Popover>
          <PopoverButton className="flex items-center gap-1.5 text-sm/relaxed text-slate-900 bg-white dark:bg-slate-800 dark:text-white px-7 py-2.5 w-full rounded focus:outline-none">
            <Icon icon="heroicons-outline:calendar" />
            <span>{t("common.weekly", "Weekly")}</span>
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="bg-white dark:bg-slate-800 shadow-lg rounded-lg px-3 mt-3"
          >
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
          </PopoverPanel>
        </Popover>
        <Popover>
          <PopoverButton className="flex items-center gap-1.5 text-sm/relaxed text-slate-900 bg-white dark:bg-slate-800 dark:text-white px-7 py-2.5 w-full rounded focus:outline-none">
            <Icon icon="heroicons-outline:filter" />
            <span>{t("common.selectDate", "Select Date")}</span>
          </PopoverButton>
          <PopoverPanel
            transition
            anchor="bottom"
            className="bg-white dark:bg-slate-800  shadow-lg rounded-lg px-3 mt-3"
          >
            <Calendar date={selectedDate} onChange={singleSelect} />
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
};

export default HomeBredCurbs;
