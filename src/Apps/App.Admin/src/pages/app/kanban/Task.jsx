import React, { useEffect, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
// import menu form headless ui
import { MenuItem } from "@headlessui/react";
import ProgressBar from "@/components/ui/ProgressBar";
import { deleteTask, toggleEditModal } from "./store";
import { useDispatch } from "react-redux";
const Task = ({ task }) => {
  const {
    name,
    progress,
    status,
    members,
    assignee,
    des,
    startDate,
    endDate,
    id,
  } = task;

  const [start, setStart] = useState(new Date(startDate));
  const [end, setEnd] = useState(new Date(endDate));
  const [totaldays, setTotaldays] = useState(0);

  useEffect(() => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotaldays(diffDays);
  }, [start, end]);

  const dispatch = useDispatch();

  return (
    <Card className="cursor-move">
      {/* header */}
      <header className="flex justify-between items-end">
        <div className="flex space-x-4 items-center rtl:space-x-reverse">
          <div className="flex-none">
            <div className="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
              {name.charAt(0) + name.charAt(1)}
            </div>
          </div>
          <div className="font-medium text-base leading-6">
            <div className="dark:text-slate-200 text-slate-900 max-w-[160px] truncate">
              {name}
            </div>
          </div>
        </div>
        <div>
          <Dropdown
            classMenuItems="w-[130px]"
            label={
              <span className="text-xs inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-900 dark:text-slate-400 focus-visible:outline-none">
                <Icon icon="heroicons-outline:dots-vertical"/>
              </span>
            }
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              <MenuItem
                onClick={() =>
                  dispatch(
                    toggleEditModal({
                      editModal: true,
                      task,
                    })
                  )
                }
              >
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70 hover:text-white
                   w-full px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse"
                >
                  <span className="text-base">
                    <Icon icon="heroicons-outline:pencil-alt" />
                  </span>
                  <span>Edit</span>
                </div>
              </MenuItem>
              <MenuItem onClick={() => dispatch(deleteTask(id))}>
                <div
                  className="hover:bg-slate-900 dark:hover:bg-slate-600/70 hover:text-white
                   w-full px-4 py-2 text-sm dark:text-slate-300  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center
                     capitalize rtl:space-x-reverse"
                >
                  <span className="text-base">
                    <Icon icon="heroicons-outline:trash" />
                  </span>
                  <span>Delete</span>
                </div>
              </MenuItem>
            </div>
          </Dropdown>
        </div>
      </header>
      {/* description */}
      <div className="text-slate-600 dark:text-slate-400 text-sm pt-4 pb-8">
        {des}
      </div>
      {/* assignee */}
      <div className="flex space-x-4 rtl:space-x-reverse">
        {/* start date */}
        <div>
          <span className="block date-label">Start date</span>
          <span className="block date-text">{startDate}</span>
        </div>
        {/* end date */}
        <div>
          <span className="block date-label">End date</span>
          <span className="block date-text">{endDate}</span>
        </div>
      </div>
      {/* progress bar */}
      <div className="ltr:text-right rtl:text-left text-xs text-slate-600 dark:text-slate-300 mb-1 font-medium">
        {progress}%
      </div>
      <ProgressBar value={progress} className="bg-primary-500" />
      {/* assignee and total date */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* assignee */}
        <div>
          <div className="text-slate-400 dark:text-slate-400 text-sm font-normal mb-3">
            Assigned to
          </div>
          <div className="flex justify-start -space-x-1.5 rtl:space-x-reverse">
            {assignee?.map((user, userIndex) => (
              <div
                className="h-6 w-6 rounded-full ring-1 ring-slate-100"
                key={userIndex}
              >
                <img
                  src={user.image}
                  alt={user.label}
                  className="w-full h-full rounded-full"
                />
              </div>
            ))}
            <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 text-xs ring-2 ring-slate-100 dark:ring-slate-700 rounded-full h-6 w-6 flex flex-col justify-center items-center">
              +2
            </div>
          </div>
        </div>

        {/* total date */}
        <div className="ltr:text-right rtl:text-left">
          <span className="inline-flex items-center space-x-1 bg-danger-500/[0.16] text-danger-500 text-xs font-normal px-2 py-1 rounded-full rtl:space-x-reverse">
            <span>
              {" "}
              <Icon icon="heroicons-outline:clock" />
            </span>
            <span>{totaldays}</span>
            <span>days left</span>
          </span>
        </div>
      </div>
    </Card>
  );
};

export default Task;
