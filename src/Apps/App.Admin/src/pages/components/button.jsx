import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const button = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="Basic">
        <div className="space-xy-5">
          <Button text="primary" className="btn-primary " />
          <Button text="secondary" className="btn-secondary" />
          <Button text="success" className="btn-success" />
          <Button text="info" className="btn-info" />
          <Button text="warning" className="btn-warning" />
          <Button text="danger" className="btn-danger" />
          <Button text="Dark" className="btn-dark" />
          <Button text="Light" className="btn-light" />
          <Button text="White" className="bg-white text-slate-900" />
        </div>
      </Card>
      <Card title="Outline">
        <div className="space-xy-5">
          <Button text="primary" className="btn-outline-primary" />
          <Button text="secondary" className="btn-outline-secondary" />
          <Button text="success" className="btn-outline-success" />
          <Button text="info" className="btn-outline-info" />
          <Button text="warning" className="btn-outline-warning" />
          <Button text="danger" className="btn-outline-danger" />
          <Button text="dark" className="btn-outline-dark" />
          <Button text="light" className="btn-outline-light" />
        </div>
      </Card>
      <Card title="Light Color">
        <div className="space-xy-5">
          <Button text="primary" className="btn-primary light" />
          <Button text="secondary" className=" btn-secondary light" />
          <Button text="success" className=" btn-success light" />
          <Button text="info" className=" btn-info light" />
          <Button text="warning" className=" btn-warning light" />
          <Button text="danger" className=" btn-danger light" />
          <Button text="Dark" className=" btn-dark light" />
          <Button text="Light" className=" btn-light light" />
        </div>
      </Card>
      <Card title="Raised">
        <div className="space-xy-5">
          <Button text="primary" className="btn-primary shadow-base2" />
          <Button text="secondary" className=" btn-secondary shadow-base2" />
          <Button text="success" className=" btn-success shadow-base2" />
          <Button text="info" className=" btn-info shadow-base2" />
          <Button text="warning" className=" btn-warning shadow-base2" />
          <Button text="danger" className=" btn-danger shadow-base2" />
          <Button text="Dark" className=" btn-dark shadow-base2" />
          <Button text="Light" className=" btn-light shadow-base2" />
          <Button
            text="White"
            className=" bg-white text-slate-900 shadow-base2"
          />
        </div>
      </Card>
      <Card title="Rounded">
        <div className="space-xy-5">
          <Button text="primary" className="btn-primary rounded-[999px]" />
          <Button text="secondary" className=" btn-secondary rounded-[999px]" />
          <Button text="success" className=" btn-success rounded-[999px]" />
          <Button text="info" className=" btn-info rounded-[999px]" />
          <Button text="warning" className=" btn-warning rounded-[999px]" />
          <Button text="danger" className=" btn-danger rounded-[999px]" />
          <Button text="Dark" className=" btn-dark rounded-[999px]" />
          <Button text="Light" className=" btn-light rounded-[999px]" />
          <Button
            text="White"
            className=" bg-white text-slate-900 rounded-[999px]"
          />
        </div>
      </Card>
      <Card title="Rounded Outline">
        <div className="space-xy-5">
          <Button
            text="primary"
            className="btn-outline-primary rounded-[999px]"
          />
          <Button
            text="secondary"
            className="btn-outline-secondary rounded-[999px]"
          />
          <Button
            text="success"
            className="btn-outline-success rounded-[999px]"
          />
          <Button text="info" className="btn-outline-info rounded-[999px]" />
          <Button
            text="warning"
            className="btn-outline-warning rounded-[999px]"
          />
          <Button
            text="danger"
            className="btn-outline-danger rounded-[999px]"
          />
          <Button text="dark" className="btn-outline-dark rounded-[999px]" />
          <Button text="light" className="btn-outline-light rounded-[999px]" />
        </div>
      </Card>
      <Card title="Icon">
        <div className="space-xy-5">
          <Button
            icon="heroicons-outline:newspaper"
            text="Left Icon"
            className="btn-primary "
          />
          <Button
            icon="heroicons-outline:newspaper"
            text="Left Icon"
            className="btn-outline-primary "
          />
          <Button
            icon="heroicons-outline:newspaper"
            text="Right Icon"
            className="btn-primary "
            iconPosition="right"
          />
          <Button
            icon="heroicons-outline:newspaper"
            text="Right Icon"
            className="btn-outline-primary "
            iconPosition="right"
          />
          <Button
            icon="heroicons-outline:newspaper"
            className="btn-outline-primary"
          />
          <Button icon="heroicons-outline:newspaper" className="btn-primary" />
        </div>
      </Card>
      <Card title="Icon Rounded">
        <div className="space-xy-5">
          <Button
            icon="heroicons-outline:newspaper"
            text="Left Icon"
            className="btn-primary  rounded-[999px]"
          />
          <Button
            icon="heroicons-outline:newspaper"
            text="Left Icon"
            className="btn-outline-primary rounded-[999px] "
          />
          <Button
            icon="heroicons-outline:newspaper"
            text="Right Icon"
            className="btn-primary rounded-[999px]"
            iconPosition="right"
          />
          <Button
            icon="heroicons-outline:newspaper"
            text="Right Icon"
            className="btn-outline-primary rounded-[999px]"
            iconPosition="right"
          />
          <Button
            icon="heroicons-outline:newspaper"
            className="btn-outline-primary  rounded-[999px]"
          />
          <Button
            icon="heroicons-outline:newspaper"
            className="btn-primary  rounded-[999px]"
          />
          <Button
            icon="heroicons-outline:newspaper"
            className="btn-primary  p-0 h-12 w-12 flex items-center justify-center rounded-full"
          />
        </div>
      </Card>
      <Card title="Size">
        <div className="space-xy-5">
          <Button text="Large Button" className="btn-primary btn-xl" />
          <Button text="Default" className="btn-primary" />
          <Button text="Small" className="btn-primary btn-sm" />
        </div>
      </Card>
      <Card title="Disabled">
        <div className="space-xy-5">
          <Button text="primary" className="btn-primary " disabled />
          <Button text="secondary" className=" btn-secondary" disabled />
          <Button text="success" className=" btn-success" disabled />
          <Button text="info" className=" btn-info" disabled />
          <Button text="warning" className=" btn-warning" disabled />
          <Button text="danger" className=" btn-danger" disabled />
          <Button text="Dark" className=" btn-dark" disabled />
          <Button text="Light" className=" btn-light" disabled />
          <Button text="White" className=" bg-white text-slate-900" disabled />
        </div>
      </Card>
      <Card title="Loading">
        <div className="space-xy-5">
          <Button text="primary" className="btn-primary " isLoading />
          <Button text="secondary" className=" btn-secondary" isLoading />
          <Button text="success" className=" btn-success" isLoading />
          <Button text="info" className=" btn-info" isLoading />
          <Button text="warning" className=" btn-warning" isLoading />
          <Button text="danger" className=" btn-danger" isLoading />
          <Button text="Dark" className=" btn-dark" isLoading />
          <Button text="Light" className=" btn-light" isLoading />
          <Button text="White" className=" bg-white text-slate-900" isLoading />
        </div>
      </Card>

      <Card title="Block">
        <div className="grid grid-cols-1 gap-4">
          <Button
            text="primary"
            className="btn-primary block-btn"
            type="submit"
          />
          <Button
            icon="heroicons-outline:newspaper"
            text="Left Icon"
            className="btn-secondary block-btn"
          />
          <Button
            icon="heroicons-outline:newspaper"
            text="Right Icon"
            className=" btn-success block-btn"
            iconPosition="right"
          />
        </div>
      </Card>
      <Card title="Router Link">
        <div className="space-xy-5">
          <Button text="primary" className="btn-primary" link="/dashboard" />
          <Button
            text="secondary"
            className=" btn-secondary"
            link="/dashboard"
          />
          <Button text="success" className=" btn-success" link="/dashboard" />
          <Button text="info" className=" btn-info" link="/dashboard" />
          <Button text="warning" className=" btn-warning" link="/dashboard" />
          <Button text="danger" className=" btn-danger" link="/dashboard" />
          <Button text="Dark" className=" btn-dark" link="/dashboard" />
          <Button text="Light" className=" btn-light" link="/dashboard" />
          <Button
            text="White"
            className=" bg-white text-slate-900"
            link="/dashboard"
          />
        </div>
      </Card>
    </div>
  );
};

export default button;
