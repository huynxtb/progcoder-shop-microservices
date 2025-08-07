import React, { useState } from "react";
import Checkbox from "@/components/ui/Checkbox";
import Icon from "@/components/ui/Icon";

import User1 from "@/assets/images/users/user-1.jpg";
import User2 from "@/assets/images/users/user-2.jpg";
import User3 from "@/assets/images/users/user-3.jpg";
import User4 from "@/assets/images/users/user-4.jpg";
import User5 from "@/assets/images/users/user-5.jpg";
import User6 from "@/assets/images/users/user-6.jpg";
const TaskLists = () => {
  const [lists, setLists] = useState([
    {
      id: 1,
      image: User1,
      title: "Amet minim mollit non deserunt ullam.",
      isDone: false,
    },
    {
      id: 2,
      image: User2,
      title: "Amet minim mollit non deserunt ullam.",
      isDone: false,
    },
    {
      id: 3,
      image: User3,
      title: "Amet minim mollit non deserunt ullam.",
      isDone: false,
    },
    {
      id: 4,
      image: User4,
      title: "Amet minim mollit non deserunt ullam.",
      isDone: false,
    },
    {
      id: 5,
      image: User5,
      title: "Amet minim mollit non deserunt ullam.",
      isDone: false,
    },
    {
      id: 6,
      image: User6,
      title: "Amet minim mollit non deserunt ullam.",
      isDone: false,
    },
  ]);

  const deleteItem = (id) => {
    setLists(lists.filter((item) => item.id !== id));
  };

  return (
    <div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-700! -mx-6 -mb-6">
        {lists.map((item) => (
          <li
            className="flex items-center px-6 space-x-4 py-4 rtl:space-x-reverse"
            key={item.id}
          >
            <div className="flex-none flex space-x-2 items-center rtl:space-x-reverse">
              <Checkbox
                value={item.isDone}
                onChange={() => {
                  setLists(
                    lists.map((list) =>
                      list.id === item.id
                        ? { ...list, isDone: !list.isDone }
                        : list
                    )
                  );
                }}
              />
              <div
                className={`${
                  item.isDone ? " opacity-20" : " opacity-100"
                }  h-8 w-8 rounded-full text-white`}
              >
                <img
                  src={item.image}
                  alt=""
                  className="block w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div
              className={`flex-1 flex  ${
                item.isDone ? "line-through dark:text-white" : ""
              }`}
            >
              <span className="flex-1 text-sm text-slate-600 dark:text-slate-300">
                {item.title.slice(0, 20) + "..."}
              </span>
              <span className="flex-none space-x-2 text-base text-secondary-500 rtl:space-x-reverse">
                {item.isDone === false && (
                  <button type="button">
                    <Icon icon="heroicons-outline:pencil-alt" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => deleteItem(item.id)}
                  className="transition duration-150 hover:text-danger-500"
                >
                  <Icon icon="heroicons-outline:trash" />
                </button>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskLists;
