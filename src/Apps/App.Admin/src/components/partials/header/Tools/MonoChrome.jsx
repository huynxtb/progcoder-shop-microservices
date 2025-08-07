import React from "react";
import useMonoChrome from "@/hooks/useMonoChrome";
import Icon from "@/components/ui/Icon";
const MonoChrome = () => {
  const [isMonoChrome, setMonoChrome] = useMonoChrome();
  return (
    <span>
      <div
        className="lg:h-[32px] lg:w-[32px] lg:bg-slate-100 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center"
        onClick={() => setMonoChrome(!isMonoChrome)}
      >
        <Icon icon="mdi:palette-outline" />
      </div>
    </span>
  );
};

export default MonoChrome;
