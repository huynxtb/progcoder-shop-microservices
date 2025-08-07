import React from "react";
import Radio from "@/components/ui/Radio";
import useContentWidth from "@/hooks/useContentWidth";

const CWidth = () => {
  const [contentWidth, setContentWidth] = useContentWidth();
  const handleChange = (e) => {
    setContentWidth(e.target.value);
  };

  return (
    <div>
      <h4 className="text-slate-600 text-base dark:text-slate-300 mb-2 font-normal">
        Content Width
      </h4>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        <Radio
          label="Full Width"
          name="cwidth"
          value="full"
          checked={contentWidth === "full"}
          className="h-4 w-4"
          onChange={handleChange}
        />
        <Radio
          label="Boxed"
          name="cwidth"
          value="boxed"
          className="h-4 w-4"
          checked={contentWidth === "boxed"}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default CWidth;
