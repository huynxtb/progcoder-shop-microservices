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
    </div>
  );
};

export default HomeBredCurbs;
