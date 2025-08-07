import React from "react";
import Card from "@/components/ui/Card";
import Simple from "./Simple";
import SimpleTooltip from "./SimpleTooltip";
import MultiValidation from "./multiple-rules";
import ValidationTypes from "./validation-types";

const FormValidation = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="Simple Form Validation">
        <Simple />
      </Card>
      <Card title="Simple Form Validation With Tooltip">
        <SimpleTooltip />
      </Card>
      <div className="xl:col-span-2 col-span-1">
        <Card title="Validating Multiple Rules">
          <MultiValidation />
        </Card>
      </div>{" "}
      <div className="xl:col-span-2 col-span-1">
        <Card title="Validation Types">
          <ValidationTypes />
        </Card>
      </div>
    </div>
  );
};

export default FormValidation;
