import React, { useState } from "react";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";

const Step = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  const handleNext = () => {
    if (stepNumber < steps.length - 1) {
      setStepNumber(stepNumber + 1);
    }
  };
  const handlePrev = () => {
    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
    }
  };
  return (
    <div>
      <div className="mx-auto flex z-5 items-center relative justify-center">
        {steps.map((item, i) => (
          <div
            className="relative z-1 items-center item flex flex-start flex-1 last:flex-none"
            key={i}
          >
            <div
              className={`   ${
                stepNumber >= i
                  ? "bg-blue-500 text-white ring-primary-500 ring-offset-2"
                  : "bg-white ring-primary-500 ring-opacity-70  text-primary-500 text-opacity-70"
              }  icon-box h-12 w-12 rounded-full flex flex-col items-center justify-center relative z-66 ring-1 text-lg font-medium`}
            >
              {stepNumber <= i ? (
                <span> {i + 1}</span>
              ) : (
                <span className="text-3xl">
                  <Icon icon="bx:check-double" />
                </span>
              )}
            </div>

            <div
              className={`${
                stepNumber >= i ? "bg-primary-500" : "bg-[#E0EAFF]"
              } absolute top-1/2 h-[2px] w-full`}
            ></div>

            <div className="text-sm mt-[10px] leading-[16px] font-medium capitalize text-slate-500-500 text-center"></div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-10">
        <Button text="prev" disabled={stepNumber === 0} onClick={handlePrev} />
        <Button
          text="next"
          disabled={stepNumber === steps.length - 1}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default Step;
