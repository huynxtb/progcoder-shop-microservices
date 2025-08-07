import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";

const Textareapage = () => {
  const errorMessage = {
    message: "This is invalid state",
  };
  const [value, setValue] = useState("");

  const handleFormatter = (e) => {
    const value = e.target.value;
    setValue(value);
  };
  return (
    <div className="grid xl:grid-cols-2 gap-5 ">
      <Card title="Basic Textarea">
        <Textarea label="Textarea" id="pn4" placeholder="Textarea" />
      </Card>
      <Card title="Displayed Rows">
        <Textarea label="Textarea" id="pn4" placeholder="Textarea" row="5" />
      </Card>
      <Card title="Horizontal Form Label Sizing">
        <div className=" space-y-3">
          <Textarea
            label="Large"
            id="largesize2"
            type="text"
            placeholder="Large Input"
            rows="4"
            horizontal
          />
          <Textarea
            label="Default"
            type="text"
            id="df"
            placeholder="Default Input"
            horizontal
          />
          <Textarea
            label="Small"
            id="smallsize2"
            type="text"
            placeholder="Small Input"
            rows="2"
            horizontal
          />
        </div>
      </Card>
      <Card title="States">
        <div className=" space-y-3">
          <Textarea
            label="Valid State"
            id="ValidState"
            placeholder="Valid"
            validate="This is valid state."
          />
          <Textarea
            label="Invalid State"
            id="InvalidState"
            placeholder="Invalid"
            error={errorMessage}
          />
        </div>
      </Card>
      <Card title="Input Validation States With Tootltips">
        <div className=" space-y-3">
          <Textarea
            label="Valid State"
            id="ValidState"
            placeholder="Valid"
            validate="This is valid state."
            msgTooltip
          />
          <Textarea
            label="Invalid State"
            id="InvalidState"
            placeholder="Invalid"
            error={errorMessage}
            msgTooltip
          />
        </div>
      </Card>
      <Card title=" Formatter Support">
        <Textarea
          label="Text input with formatter (on input)"
          id="formatter-pn"
          type="text"
          placeholder="Enter your name"
          description="We will convert your name to lowercase instantly"
          onChange={handleFormatter}
        />
        {value.toLowerCase()}
      </Card>
    </div>
  );
};

export default Textareapage;
