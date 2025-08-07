import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Radio from "@/components/ui/Radio";
const RadioPage = () => {
  const [value, setValue] = useState("A");
  const [value2, setValue2] = useState("C");
  const [selectColor, setSelectColor] = useState("primary-500");
  const [selectOption, setSelectOption] = useState("Orange");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleChange2 = (e) => {
    setValue2(e.target.value);
  };

  const handleColor = (e) => {
    setSelectColor(e.target.value);
  };
  const handleOption = (e) => {
    setSelectOption(e.target.value);
  };
  const options = [
    {
      value: "Orange",
      label: "Orange",
    },
    {
      value: "Apple",
      label: "Apple",
    },
    {
      value: "Banana",
      label: "Banana",
    },
  ];

  const colors = [
    {
      value: "primary-500",
      label: "Primary",
      activeClass: "ring-primary-500 border-primary-500",
    },
    {
      value: "secondary-500",
      label: "Secondary",
      activeClass: "ring-secondary-500 border-secondary-500",
    },
    {
      value: "success-500",
      label: "Success",
      activeClass: "ring-success-500 border-success-500",
    },
    {
      value: "danger-500",
      label: "Danger",
      activeClass: "ring-danger-500 border-danger-500",
    },
    {
      value: "warning-500",
      label: "Warning",
      activeClass: "ring-warning-500 border-warning-500",
    },
    {
      value: "info-500",
      label: "Info",
      activeClass: "ring-info-500 border-info-500",
    },
  ];
  return (
    <div className="space-y-5">
      <Card title="Basic Radio Buttons">
        <div className="flex flex-wrap space-xy-5">
          <Radio
            label="Checked"
            name="x"
            value="A"
            checked={value === "A"}
            onChange={handleChange}
          />
          <Radio
            label="UnChecked"
            name="x"
            value="B"
            checked={value === "B"}
            onChange={handleChange}
          />
          <Radio
            label="Checked disabled"
            disabled
            name="x2"
            value="C"
            checked={value2 === "C"}
            onChange={handleChange2}
          />
          <Radio
            label="UnChecked disabled"
            name="x2"
            disabled
            value="D"
            checked={value2 === "D"}
            onChange={handleChange2}
          />
        </div>
      </Card>
      <Card title="Theme Color">
        <div className="flex flex-wrap space-xy-5">
          {colors.map((color, i) => (
            <Radio
              key={i}
              label={color.label}
              name="color"
              value={color.value}
              checked={selectColor === color.value}
              onChange={handleColor}
              activeClass={color.activeClass}
            />
          ))}
        </div>
      </Card>

      <Card title="Radio Group Options Array">
        <div className="flex flex-wrap space-xy-5">
          {options.map((option, i) => (
            <Radio
              key={i}
              label={option.label}
              name="option"
              value={option.value}
              checked={selectOption === option.value}
              onChange={handleOption}
            />
          ))}
        </div>
        {selectOption && (
          <div className="mt-3">
            <span className="text-sm text-gray-500">Selected Option: </span>
            <span className="text-sm text-gray-700">{selectOption}</span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RadioPage;
