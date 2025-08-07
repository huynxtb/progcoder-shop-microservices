import { Icon } from "@iconify/react";
import React from "react";

const NoItem = () => {
  return (
    <div className="  ">
      <div className="h-40 w-40 overflow-hidden bg-slate-200/60 dark:bg-slate-700 rounded-full mx-auto relative flex items-center justify-center">
        <Icon
          icon="solar:cart-2-bold-duotone"
          className=" w-32  h-32 relative "
        />
      </div>
    </div>
  );
};

export default NoItem;
