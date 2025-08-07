import React from "react";
import Radio from "@/components/ui/Radio";
import useMenuLayout from "@/hooks/useMenulayout";

const Menulayout = () => {
  const [menuType, setMenuLayout] = useMenuLayout();
  const handleChange = (e) => {
    setMenuLayout(e.target.value);
  };

  return (
    <div>
      <h4 className="text-slate-600 text-base dark:text-slate-300 mb-2 font-normal">
        Menu Layout
      </h4>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        <Radio
          label="Vertical"
          name="menulayout"
          value="vertical"
          checked={menuType === "vertical"}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <Radio
          label="Horizontal"
          name="menulayout"
          value="horizontal"
          checked={menuType === "horizontal"}
          onChange={handleChange}
          className="h-4 w-4"
        />
      </div>
    </div>
  );
};

export default Menulayout;
