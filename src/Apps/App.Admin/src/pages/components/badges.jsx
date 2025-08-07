import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const badges = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="Basic Badges">
        <div className="space-xy-5">
          <Badge label="primary" className="bg-primary-500 text-white" />
          <Badge label="secondary" className="bg-secondary-500 text-white" />
          <Badge label="danger" className="bg-danger-500 text-white" />
          <Badge label="success" className="bg-success-500 text-white" />
          <Badge label="info" className="bg-info-500 text-white" />
          <Badge label="warning" className="bg-warning-500 text-white" />
          <Badge
            label="Dark"
            className="bg-slate-800 dark:bg-slate-900  text-white"
          />
        </div>
      </Card>
      <Card title="Pill Badges">
        <div className="space-xy-5">
          <Badge label="primary" className="bg-primary-500 text-white pill" />
          <Badge
            label="secondary"
            className="bg-secondary-500 text-white pill"
          />
          <Badge label="danger" className="bg-danger-500 text-white pill" />
          <Badge label="success" className="bg-success-500 text-white pill" />
          <Badge label="info" className="bg-info-500 text-white pill" />
          <Badge label="warning" className="bg-warning-500 text-white pill" />
          <Badge
            label="Dark"
            className="bg-slate-800 dark:bg-slate-900 text-white pill"
          />
        </div>
      </Card>
      <Card title="Soft Badges">
        <div className="space-xy-5">
          <Badge
            label="primary"
            className="bg-primary-500/15 text-primary-500"
          />
          <Badge
            label="secondary"
            className="bg-secondary-500/15 text-secondary-500"
          />
          <Badge
            label="danger"
            className="bg-danger-500/15 text-danger-500"
          />
          <Badge
            label="success"
            className="bg-success-500/15 text-success-500"
          />
          <Badge
            label="info"
            className="bg-info-500/15 text-info-500"
          />
          <Badge
            label="warning"
            className="bg-warning-500/15 text-warning-500"
          />
          <Badge
            label="Dark"
            className="bg-slate-800/15 dark:bg-slate-900 text-slate-800 dark:text-slate-400"
          />
        </div>
      </Card>
      <Card title="Soft Pill Badges">
        <div className="space-xy-5">
          <Badge
            label="primary"
            className="bg-primary-500/15 text-primary-500 rounded-full"
          />
          <Badge
            label="secondary"
            className="bg-secondary-500/15 text-secondary-500 rounded-full"
          />
          <Badge
            label="danger"
            className="bg-danger-500/15 text-danger-500 rounded-full"
          />
          <Badge
            label="success"
            className="bg-success-500/15 text-success-500 rounded-full"
          />
          <Badge
            label="info"
            className="bg-info-500/15 text-info-500 rounded-full"
          />
          <Badge
            label="warning"
            className="bg-warning-500/15 text-warning-500 rounded-full"
          />
          <Badge
            label="Dark"
            className="bg-slate-800/15 dark:bg-slate-900 text-slate-800 dark:text-slate-400 rounded-full"
          />
        </div>
      </Card>
      <Card title="Badges With Icon">
        <div className="space-xy-5">
          <Badge
            label="primary"
            className="bg-primary-500 text-white "
            icon="heroicons-outline:star"
          />
          <Badge
            label="secondary"
            className="bg-secondary-500 text-white"
            icon="heroicons-outline:star"
          />
          <Badge
            label="danger"
            className="bg-danger-500 text-white"
            icon="heroicons-outline:star"
          />
          <Badge
            label="success"
            className="bg-success-500 text-white"
            icon="heroicons-outline:star"
          />
          <Badge
            label="info"
            className="bg-info-500 text-white"
            icon="heroicons-outline:star"
          />
          <Badge
            label="warning"
            className="bg-warning-500 text-white"
            icon="heroicons-outline:star"
          />
          <Badge
            label="Dark"
            className="bg-slate-800 dark:bg-slate-900 text-white"
            icon="heroicons-outline:star"
          />
        </div>
      </Card>
      <Card title="Badges in Buttons">
        <div className="space-xy-5">
          <Button className="btn-dark">
            <div className="space-x-1 rtl:space-x-reverse">
              <span>Notifications</span>
              <Badge label="2" className="bg-white text-slate-900 " />
            </div>
          </Button>
          <Button className="btn-success">
            <div className="space-x-1 rtl:space-x-reverse">
              <span>Messages</span>
              <Badge label="4" className="bg-white text-slate-900 " />
            </div>
          </Button>
          <Button className="btn-info">
            <div className="space-x-1 rtl:space-x-reverse">
              <span>Draft</span>
              <Badge label="3" className="bg-white text-slate-900" />
            </div>
          </Button>
        </div>
      </Card>
      <div className="xl:col-span-2 col-span-1">
        <Card title="Badges Position Examples">
          <div className="space-xy-5 flex items-center">
            <Button className=" btn-primary ">
              Mails
              <Badge
                label="2"
                className="bg-danger-500  text-white absolute -top-3 ltr:-right-2 rtl:-left-2"
              />
            </Button>
            <Button className=" btn-secondary">
              Alerts
              <Badge
                label={null}
                className="bg-danger-500 rounded-circile h-4 w-4  text-white absolute -top-2 ltr:-right-2 rtl:-left-2"
              />
            </Button>
            <Button className=" btn-success ">
              <div className="text-2xl">
                <Icon icon="heroicons:envelope" />
              </div>
              <Badge
                label={null}
                className="bg-danger-500 rounded-circile h-4 w-4  text-white absolute -top-2 ltr:-right-2 rtl:-left-2"
              />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default badges;
