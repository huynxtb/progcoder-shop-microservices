import React from "react";
import Card from "@/components/ui/Card";
import Alert from "@/components/ui/Alert";
import { Link } from "react-router-dom";

const alert = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="Theme Color Alerts">
        <div className=" space-y-4">
          <Alert
            label="This is an alert—check it out!"
            className="alert-primary"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-secondary"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-success"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-danger"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-warning"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-info"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-light"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-dark"
          />
        </div>
      </Card>
      <Card title="Light Color Alerts">
        <div className=" space-y-4">
          <Alert
            label="This is an alert—check it out!"
            className="alert-primary light-mode"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-secondary light-mode"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-success light-mode"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-danger light-mode"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-warning light-mode"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-info light-mode"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-light light-mode"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-dark light-mode"
          />
        </div>
      </Card>
      <div className="xl:col-span-2 col-span-1">
        <Card title="Link Colors">
          <div className="space-y-5">
            <Alert className="bg-slate-800/15 text-slate-800 dark:bg-slate-500/15  dark:text-slate-300">
              This is an alert with
              <Link
                to="#"
                className="underline text-slate-900 dark:text-slate-300 text-sm font-medium"
              >
                an example link
              </Link>
              .Check it out!
            </Alert>
            <Alert className="bg-primary-500/15 text-primary-500 dark:bg-primary-500/15">
              This is an alert with
              <Link
                to="#"
                className="underline text-primary-500 text-sm font-medium"
              >
                an example link
              </Link>
              .Click It out!
            </Alert>
            <Alert className="bg-secondary-500/15 text-slate-600 dark:bg-secondary-500/15">
              This is an alert with
              <Link
                to="#"
                className="underline text-slate-600 text-sm font-medium"
              >
                an example link
              </Link>
              .Click It out!
            </Alert>
            <Alert className="bg-success-500/15 text-success-500 dark:bg-success-500/15">
              This is an alert with
              <Link
                to="#"
                className="underline text-success-500 text-sm font-medium"
              >
                an example link
              </Link>
              .Click It out!
            </Alert>
            <Alert className="bg-info-500/15 text-info-500 dark:bg-info-500/15">
              This is an alert with
              <Link
                to="#"
                className="underline text-info-500 text-sm font-medium"
              >
                an example link
              </Link>
              .Click It out!
            </Alert>
            <Alert className="bg-warning-500/15 text-warning-500 dark:bg-warning-500/15">
              This is an alert with
              <Link
                to="#"
                className="underline text-warning-500 text-sm font-medium"
              >
                an example link
              </Link>
              .Click It out!
            </Alert>
            <Alert className="bg-danger-500/15 text-danger-500 dark:bg-danger-500/15">
              This is an alert with
              <Link
                to="#"
                className="underline text-danger-500 text-sm font-medium"
              >
                an example link
              </Link>
              .Click It out!
            </Alert>
          </div>
        </Card>
      </div>
      <Card title="Dismissible Theme Color Alerts With Icon ">
        <div className="space-y-4">
          <Alert dismissible icon="fluent:target-20-regular">
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="fluent:target-20-regular"
            className="alert-primary"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:support"
            className="alert-secondary"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="akar-icons:double-check"
            className="alert-success"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:exclamation"
            className="alert-danger"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:ban"
            className="alert-warning"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:information-circle"
            className="alert-info"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:exclamation"
            className="alert-light"
          >
            This is an alert—check it out!
          </Alert>
        </div>
      </Card>
      <Card title="Dismissible Light Color Alerts With Icon ">
        <div className=" light-mode space-y-4">
          <Alert
            dismissible
            icon="fluent:target-20-regular"
            className=" alert-dark light-mode"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="fluent:target-20-regular"
            className=" light-mode alert-primary"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:support"
            className=" light-mode alert-secondary"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="akar-icons:double-check"
            className=" light-mode alert-success"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:exclamation"
            className=" light-mode alert-danger"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:ban"
            className=" light-mode alert-warning"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:information-circle"
            className=" light-mode alert-info"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:exclamation"
            className=" light-mode alert-light"
          >
            This is an alert—check it out!
          </Alert>
        </div>
      </Card>
      <Card title="Outline Theme Color Alerts">
        <div className=" space-y-4">
          <Alert
            label="This is an alert—check it out!"
            className="alert-outline-primary"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-outline-secondary"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-outline-success"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-outline-danger"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-outline-warning"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-outline-info"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-outline-light"
          />
          <Alert
            label="This is an alert—check it out!"
            className="alert-outline-dark"
          />
        </div>
      </Card>
      <Card title="Outline Light Color Alerts With Icon ">
        <div className="space-y-4">
          <Alert
            dismissible
            icon="fluent:target-20-regular"
            className="alert-outline-dark"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="fluent:target-20-regular"
            className="alert-outline-primary"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:support"
            className="alert-outline-secondary"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="akar-icons:double-check"
            className="alert-outline-success"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:exclamation"
            className="alert-outline-danger"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:ban"
            className="alert-outline-warning"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:information-circle"
            className="alert-outline-info"
          >
            This is an alert—check it out!
          </Alert>
          <Alert
            dismissible
            icon="heroicons-outline:exclamation"
            className="alert-outline-light"
          >
            This is an alert—check it out!
          </Alert>
        </div>
      </Card>
      ;
    </div>
  );
};

export default alert;
