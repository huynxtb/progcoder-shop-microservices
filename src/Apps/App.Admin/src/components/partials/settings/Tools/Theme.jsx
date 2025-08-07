import React from "react";
import Radio from "@/components/ui/Radio";
import useDarkmode from "@/hooks/useDarkMode";

const Theme = () => {
  const [isDark, setDarkMode] = useDarkmode();

  return (
    <div>
      <h4 className="text-slate-600 text-base dark:text-slate-300 mb-2 font-normal">
        Theme
      </h4>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        <Radio
          label="Light"
          name="theme"
          value="light"
          checked={!isDark}
          onChange={() => setDarkMode(!isDark)}
          className="h-4 w-4"
        />
        <Radio
          label="Dark"
          name="theme"
          value="dark"
          checked={isDark}
          onChange={() => setDarkMode(!isDark)}
          className="h-4 w-4"
        />
      </div>
    </div>
  );
};

export default Theme;
