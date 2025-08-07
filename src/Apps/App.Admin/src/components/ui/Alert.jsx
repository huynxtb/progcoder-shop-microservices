import React, { useState } from "react";
import Icon from "@/components/ui/Icon";

const Alert = ({
  children,
  className = "alert-dark",
  icon,
  toggle,
  dismissible,
  label,
}) => {
  const [isShow, setIsShow] = useState(true);

  const handleDestroy = () => {
    setIsShow(false);
  };

  return (
    <>
      {isShow ? (
        <div className={`alert  ${className}`}>
          <div className="flex items-start space-x-3 rtl:space-x-reverse">
            {icon && (
              <div className="flex-0 text-[22px]">
                <Icon icon={icon} />
              </div>
            )}
            <div className="flex-1">{children ? children : label}</div>
            {dismissible && (
              <div
                className="flex-0 text-2xl cursor-pointer"
                onClick={handleDestroy}
              >
                <Icon icon="heroicons-outline:x" />
              </div>
            )}
            {toggle && (
              <div className="flex-0 text-2xl cursor-pointer" onClick={toggle}>
                <Icon icon="heroicons-outline:x" />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Alert;
