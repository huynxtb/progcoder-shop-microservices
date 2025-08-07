import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import InputGroup from "@/components/ui/InputGroup";
import Icon from "@/components/ui/Icon";

const InputlayoutPage = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="Horizontal Form">
        <div className="space-y-4">
          <Textinput
            label="Full name"
            id="h_Fullname"
            type="text"
            placeholder="Full name"
            horizontal
          />
          <Textinput
            label="Email"
            id="h_email"
            type="email"
            placeholder="Type your email"
            horizontal
          />
          <Textinput
            label="Phone"
            id="h_phone"
            type="phone"
            placeholder="Type your email"
            horizontal
          />
          <Textinput
            label="Password"
            id="h_password"
            type="Password"
            placeholder="8+ characters, 1 capitat letter "
            horizontal
          />
          <div className="ml-[124px] space-y-4">
            <Checkbox
              label="Remember me"
              value={checked}
              onChange={() => setChecked(!checked)}
            />
            <Button text="Submit" className="btn-dark" />
          </div>
        </div>
      </Card>
      <Card title="Horizontal Form With Icons">
        <div className="space-y-4">
          <InputGroup
            label="Full name"
            id="hi_Fullname"
            type="text"
            placeholder="Full name"
            horizontal
            prepend={<Icon icon="heroicons-outline:user" />}
            merged
          />
          <InputGroup
            label="Email"
            id="hi_email"
            type="email"
            placeholder="Type your email"
            prepend={<Icon icon="heroicons-outline:mail" />}
            horizontal
            merged
          />
          <InputGroup
            label="Phone"
            id="hi_phone"
            type="phone"
            placeholder="Type your email"
            prepend={<Icon icon="heroicons-outline:phone" />}
            horizontal
            merged
          />
          <InputGroup
            label="Password"
            id="hi_password"
            type="Password"
            placeholder="8+ characters, 1 capitat letter "
            prepend={<Icon icon="heroicons-outline:lock-closed" />}
            horizontal
            merged
          />
          <div className="ml-[124px] space-y-4">
            <Checkbox
              label="Remember me"
              value={checked}
              onChange={() => setChecked(!checked)}
            />
            <Button text="Submit" className="btn-dark" />
          </div>
        </div>
      </Card>
      <Card title="Vertical Form">
        <div className="space-y-4">
          <Textinput
            label="Full name"
            id="h_Fullname2"
            type="text"
            placeholder="Full name"
          />
          <Textinput
            label="Email"
            id="h_email2"
            type="email"
            placeholder="Type your email"
          />
          <Textinput
            label="Phone"
            id="h_phone2"
            type="phone"
            placeholder="Type your email"
          />
          <Textinput
            label="Password"
            id="h_password2"
            type="Password"
            placeholder="8+ characters, 1 capitat letter "
          />
          <div className=" space-y-4">
            <Checkbox
              label="Remember me"
              value={checked}
              onChange={() => setChecked(!checked)}
            />
            <Button text="Submit" className="btn-dark" />
          </div>
        </div>
      </Card>
      <Card title="Vertical Form With Icon">
        <div className="space-y-4">
          <InputGroup
            label="Full name"
            id="hi_Fullname1"
            type="text"
            placeholder="Full name"
            prepend={<Icon icon="heroicons-outline:user" />}
            merged
          />
          <InputGroup
            label="Email"
            id="hi_email1"
            type="email"
            placeholder="Type your email"
            prepend={<Icon icon="heroicons-outline:mail" />}
            merged
          />
          <InputGroup
            label="Phone"
            id="hi_phone1"
            type="phone"
            placeholder="Type your email"
            prepend={<Icon icon="heroicons-outline:phone" />}
            merged
          />
          <InputGroup
            label="Password"
            id="hi_password1"
            type="Password"
            placeholder="8+ characters, 1 capitat letter "
            prepend={<Icon icon="heroicons-outline:lock-closed" />}
            merged
          />
          <div className=" space-y-4">
            <Checkbox
              label="Remember me"
              value={checked}
              onChange={() => setChecked(!checked)}
            />
            <Button text="Submit" className="btn-dark" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InputlayoutPage;
