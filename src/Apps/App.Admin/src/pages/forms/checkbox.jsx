import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Checkbox from "@/components/ui/Checkbox";

const CheckboxPage = () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(true);
  const [checked5, setChecked5] = useState(true);
  const [checked6, setChecked6] = useState(true);
  const [checked7, setChecked7] = useState(true);
  const [checked8, setChecked8] = useState(true);
  const [checked9, setChecked9] = useState(true);
  const [checked10, setChecked10] = useState(true);

  const [selected, setSelected] = useState([]);
  const options = [
    {
      value: "orange",
      label: "Orange",
    },
    {
      value: "apple",
      label: "Apple",
    },
    {
      value: "banana",
      label: "Banana",
    },
  ];
  return (
    <div className=" space-y-5">
      <Card title="Checkboxes">
        <div className="flex flex-wrap space-xy-6">
          <Checkbox
            label="Checked"
            value={checked}
            onChange={() => setChecked(!checked)}
          />
          <Checkbox
            label="UnChecked"
            value={checked2}
            onChange={() => setChecked2(!checked2)}
          />
          <Checkbox
            label="Checked disabled"
            disabled
            value={checked3}
            onChange={() => setChecked3(!checked3)}
          />
          <Checkbox
            label="UnChecked disabled"
            disabled
            value={checked4}
            onChange={() => setChecked4(!checked4)}
          />
        </div>
      </Card>
      <Card title="Color">
        <div className="flex flex-wrap space-xy-6">
          <Checkbox
            label="Primary"
            value={checked5}
            activeClass="ring-primary-500 bg-primary-500"
            onChange={() => setChecked5(!checked5)}
          />
          <Checkbox
            label="Secondary"
            value={checked6}
            activeClass="ring-secondary-500 bg-secondary-500"
            onChange={() => setChecked6(!checked6)}
          />
          <Checkbox
            label="Success"
            value={checked7}
            activeClass="ring-success-500 bg-success-500"
            onChange={() => setChecked7(!checked7)}
          />
          <Checkbox
            label="Danger"
            value={checked8}
            activeClass="ring-danger-500 bg-danger-500"
            onChange={() => setChecked8(!checked8)}
          />
          <Checkbox
            label="Warning"
            value={checked9}
            activeClass="ring-warning-500 bg-warning-500"
            onChange={() => setChecked9(!checked9)}
          />
          <Checkbox
            label="Info"
            value={checked10}
            activeClass="ring-info-500 bg-info-500"
            onChange={() => setChecked10(!checked10)}
          />
        </div>
      </Card>
      <Card title="Using Options Array">
        <div className=" space-y-4">
          {options.map((option, i) => (
            <Checkbox
              key={i}
              name="jorina"
              label={option.label}
              value={selected.includes(option.value)}
              onChange={() => {
                if (selected.includes(option.value)) {
                  setSelected(selected.filter((item) => item !== option.value));
                } else {
                  setSelected([...selected, option.value]);
                }
              }}
            />
          ))}
          {selected.length > 0 && (
            <div className="text-slate-900 dark:text-white ">
              Selected: [{selected.join(", ")}]
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CheckboxPage;
