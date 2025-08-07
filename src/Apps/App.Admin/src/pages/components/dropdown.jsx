import React from "react";
import Card from "@/components/ui/Card";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";
import SplitDropdown from "@/components/ui/Split-dropdown";

const dropdown = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
      <Card title="Basic dropdowns">
        <div className="space-xy-5">
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="primary"
                className="btn-primary"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="secondary"
                className="btn-secondary"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="success"
                className="btn-success"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="info"
                className="btn-info"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="warning"
                className="btn-warning"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="danger"
                className="btn-danger"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="Dark"
                className="btn-dark"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="Light"
                className="btn-light"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
        </div>
      </Card>
      <Card title="Outline Dropdowns">
        <div className="space-xy-5">
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="primary"
                className="btn-outline-primary"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="secondary"
                className="btn-outline-secondary"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="success"
                className="btn-outline-success"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="info"
                className="btn-outline-info"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="warning"
                className="btn-outline-warning"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="danger"
                className="btn-outline-danger"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="Dark"
                className="btn-outline-dark"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="Light"
                className="btn-outline-light"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
        </div>
      </Card>
      <Card title="Flat Dropdowns">
        <div className="space-xy-5">
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="primary"
                className="text-primary-500 hover:bg-primary-500/20"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="secondary"
                className="text-secondary-500 hover:bg-secondary-500/20"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="success"
                className="text-success-500 hover:bg-success-500/20"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="info"
                className="text-info-500 hover:bg-info-500/20"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="warning"
                className="text-warning-500 hover:bg-warning-500/20"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="danger"
                className=" text-danger-500 hover:bg-danger-500/20"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="Dark"
                className="text-slate-800 dark:text-slate-50 hover:bg-slate-800/20"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="Light"
                className="text-slate-600 hover:bg-light/10"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          ></Dropdown>
        </div>
      </Card>
      <Card title="Dropdown Sizes">
        <div className="space-xy-5">
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="Large Button"
                className="btn-primary btn-xl"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-2xl"
              />
            }
          />
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="Default"
                className="btn-dark"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          />

          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%] "
            label={
              <Button
                text="success"
                className=" btn-success btn-sm"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-sm"
              />
            }
          />
        </div>
      </Card>
      <Card title="Split Dropdowns">
        <div className="space-xy-5">
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="primary"
            labelClass="btn-primary"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="secondary"
            labelClass="btn-secondary"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="success"
            labelClass="btn-success"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="info"
            labelClass="btn-info"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="warning"
            labelClass="btn-warning"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="danger"
            labelClass="btn-danger"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="Light"
            labelClass="btn-light"
          />
        </div>
      </Card>
      <Card title=" Split Outline Dropdowns">
        <div className="space-xy-5">
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="primary"
            labelClass="btn-outline-primary"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="secondary"
            labelClass="btn-outline-secondary"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="success"
            labelClass="btn-outline-success"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="info"
            labelClass="btn-outline-info"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="warning"
            labelClass="btn-outline-warning"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="danger"
            labelClass="btn-outline-danger"
          />
          <SplitDropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label="Light"
            labelClass="btn-outline-light"
          />
        </div>
      </Card>
      <Card title="Dropdown Directions">
        <div className="space-xy-5">
          <Dropdown
            classMenuItems="left-0  w-[220px] top-[110%]"
            label={
              <Button
                text="Left align"
                className="btn-primary"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          />
          <Dropdown
            classMenuItems="w-[220px] top-[110%]"
            label={
              <Button
                text="Right align"
                className="btn-primary"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          />
          <Dropdown
            classMenuItems="right-unset left-full w-[200px] top-0 ml-3"
            label={
              <Button
                text="Drop-right-top"
                className="btn-primary"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          />
          <Dropdown
            classMenuItems="right-full  w-[200px] top-0 ml-3"
            label={
              <Button
                text="Drop-left-left"
                className="btn-primary"
                icon="heroicons-outline:chevron-left"
                div
                iconClass="text-lg"
              />
            }
          />
        </div>
      </Card>
      <Card title="Dropdown Directions">
        <div className="space-xy-5">
          <Dropdown
            classMenuItems="left-0  w-full top-[110%]"
            wrapperClass="block"
            label={
              <Button
                text="primary"
                className="btn-primary block-btn"
                icon="heroicons-outline:chevron-right"
                iconPosition="right"
                div
                iconClass="text-lg"
              />
            }
          />
          <SplitDropdown
            classMenuItems="left-0  w-full top-[110%]"
            label="primary"
            labelClass="btn-primary"
            wrapperClass="block"
          />
          <SplitDropdown
            classMenuItems="left-0 w-full top-[110%]"
            label="primary"
            labelClass="btn-outline-primary"
            wrapperClass="block"
          />
        </div>
      </Card>
    </div>
  );
};

export default dropdown;
