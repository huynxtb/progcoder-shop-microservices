import React from "react";
import HorizentalWizard from "./HorizentalWizard";
import Vertical from "./Vertical";

const FormWizard = () => {
  return (
    <div className=" space-y-5">
      <div>
        <Vertical />
      </div>
      <div>
        <HorizentalWizard />
      </div>
    </div>
  );
};

export default FormWizard;
