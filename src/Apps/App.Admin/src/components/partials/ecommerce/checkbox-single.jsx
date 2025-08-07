import React, { useState } from "react";
import Checkbox from "@/components/ui/Checkbox";
import Icon from "@/components/ui/Icon";

const CheckboxSingle = ({ item }) => {
  const { label, count, value } = item;

  const [checked, setChecked] = useState(false);

  const normalStar = <Icon icon="ph:star-fill" />;
  const coloredStar = <Icon icon="ph:star-fill" className="text-yellow-400" />;

  const generateStars = (rating) => {
    const stars = Array.from({ length: value }, (_, starIndex) => (
      <span key={`star_${starIndex}`} className="flex">
        {starIndex < rating ? coloredStar : normalStar}
      </span>
    ));
    return <span className="flex">{stars}</span>;
  };

  return (
    <div className="flex justify-between space-y-1">
      <Checkbox
        className="font-normal text-sm text-slate-900 dark:text-slate-300"
        label={label ? label : generateStars(value)}
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <span className="text-slate-500 dark:text-slate-500 text-xs font-normal">
        {count}
      </span>
    </div>
  );
};

export default CheckboxSingle;
