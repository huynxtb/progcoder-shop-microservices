import React, { useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Radio from "@/components/ui/Radio";
import { toggleProfile } from "./store";

import MainUser from "@/assets/images/users/user-1.jpg";

const allStatus = [
  {
    value: "online",
    label: "Active",
    activeClass: "ring-success-500 border-success-500",
  },
  {
    value: "busy",
    label: "Do Not Disturb",
    activeClass: "ring-danger-500 border-danger-500",
  },
  {
    value: "away",
    label: "Away",
    activeClass: "ring-warning-500 border-warning-500",
  },
  {
    value: "offline",
    label: "Offline",
    activeClass: "ring-warning-500 border-warning-500",
  },
];

import SimpleBar from "simplebar-react";
const MyProfile = () => {
  const { openProfile } = useSelector((state) => state.chat);
  const [status, setStatus] = useState("online");
  const nodeRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <div>
      <header>
        <div className="flex px-6 pt-6">
          <div className="flex-1">
            <div className="flex space-x-3 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="h-10 w-10 rounded-full">
                  <img
                    src={MainUser}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex-1 text-start">
                <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]">
                  Jane Cooper
                  <span className="status bg-success-500 inline-block h-[10px] w-[10px] rounded-full ml-3"></span>
                </span>
                <span className="block text-slate-500 dark:text-slate-300 text-xs font-normal">
                  Available
                </span>
              </div>
            </div>
          </div>
          <div className="flex-none">
            <div
              className="h-8 w-8 bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full cursor-pointer"
              onClick={() => dispatch(toggleProfile(true))}
            >
              <Icon icon="heroicons-outline:dots-horizontal" />
            </div>
          </div>
        </div>
        <CSSTransition
          in={openProfile}
          timeout={300}
          nodeRef={nodeRef}
          classNames="profileAnimation"
          unmountOnExit
        >
          <div
            ref={nodeRef}
            className="absolute bg-white dark:bg-slate-800 rounded-md h-full left-0 top-0 bottom-0  w-full z-9"
          >
            <SimpleBar className="h-full p-6">
              <div className="text-right">
                <div
                  className="h-8 w-8 bg-slate-100 dark:bg-slate-900 dark:text-slate-400 inline-flex ml-auto flex-col justify-center items-center text-xl rounded-full cursor-pointer"
                  onClick={() => dispatch(toggleProfile(false))}
                >
                  <Icon icon="heroicons-outline:x" />
                </div>
              </div>
              <header className="mx-auto max-w-[200px] mt-6 text-center">
                <div className="h-16 w-16 rounded-full border border-slate-400 p-[2px] shadow-md mx-auto mb-3 relative">
                  <img
                    src={MainUser}
                    alt=""
                    className="block w-full h-full rounded-full object-contain"
                  />
                  <span
                    className={`status inline-block h-3 w-3 rounded-full absolute -right-1 top-3 border border-white
                ${status === "online" ? "bg-success-500" : ""}
                ${status === "away" ? "bg-warning-500" : ""}
                ${status === "busy" ? "bg-danger-500" : ""}
                ${status === "offline" ? "bg-secondary-500" : ""}


                `}
                  ></span>
                </div>
                <span className="block text-slate-600 dark:text-slate-300 text-sm">
                  Jane Cooper
                </span>
                <span className="block text-slate-500 dark:text-slate-300 text-xs">
                  Admin
                </span>
              </header>
              <div className="my-8">
                <Textarea label="About" placeholder="About ypur self" />
              </div>
              <div className="mb-8">
                <span className="form-label">Status</span>
                {allStatus?.map((item) => (
                  <Radio
                    key={item.value}
                    label={item.label}
                    name="status"
                    value={item.value}
                    checked={status === item.value}
                    onChange={(e) => setStatus(e.target.value)}
                    activeClass={item.activeClass}
                  />
                ))}
              </div>
              <Button text="Logout" className="btn-dark " />
            </SimpleBar>
          </div>
        </CSSTransition>
      </header>
    </div>
  );
};

export default MyProfile;
