import React, { useState } from "react";
import Icon from "@/components/ui/Icon";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@/components/ui/Checkbox";
import {
  setCheck,
  setFaveCheck,
  deleteEmail,
  toggleSingleModal,
  toggleReadMail,
} from "./store";

const Emails = ({ email }) => {
  const { isread, image, title, desc, lastime, is_checked, isfav, id } = email;

  const dispatch = useDispatch();

  const handleCheck = (id) => {
    return (event) => {
      dispatch(setCheck(id));
    };
  };
  const handleFavorite = (id) => {
    return (event) => {
      dispatch(setFaveCheck(id));
    };
  };

  return (
    <li
      className="flex px-7 space-x-6 group md:py-6 py-3 relative cursor-pointer hover:bg-slate-50 dark:hover:bg-transparent group items-center rtl:space-x-reverse"
      onClick={() => {
        dispatch(toggleSingleModal(email));
        // make is read true when clicked
        dispatch(toggleReadMail(id));
      }}
    >
      <div>
        <Checkbox value={is_checked} onChange={handleCheck(id)} name="email" />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isfav}
            className="hidden"
            onChange={handleFavorite(id)}
          />
          {isfav ? (
            <Icon
              icon="heroicons-solid:star"
              className="text-xl leading-none text-[#FFCE30] relative cursor-pointer"
            />
          ) : (
            <Icon
              icon="heroicons:star"
              className="text-xl leading-none relative cursor-pointer text-slate-400"
            />
          )}
        </label>
      </div>

      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex-none">
          <div className="h-8 w-8 rounded-full text-white">
            <img
              src={image}
              alt=""
              className="block w-full h-full object-cover"
            />
          </div>
        </div>
        <div
          className={` flex-1 text-sm min-w-max  ${
            isread === true
              ? "font-normal text-slate-800 dark:text-slate-400"
              : "font-medium text-slate-900 dark:text-slate-300"
          }
    `}
        >
          Esther Howard
        </div>
      </div>

      <p className="truncate">
        <span
          className={` text-sm
            ${
              isread === true
                ? "font-normal dark:text-slate-300"
                : "font-medium text-slate-900 dark:text-slate-300"
            }
          `}
        >
          {title.slice(0, 18)}
        </span>

        <span className="text-sm text-slate-600 dark:text-slate-300 font-normal">
          {desc}
        </span>
      </p>

      <div className="grow"></div>

      <span>
        <div className="flex-1 flex space-x-4 items-center rtl:space-x-reverse">
          <span className="flex-none space-x-2 text-xs text-slate-900 dark:text-slate-300 rtl:space-x-reverse">
            <span>{lastime}</span>
          </span>
        </div>
        <span
          className="absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 dark:text-slate-300 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 bg-white h-full w-[100px] flex flex-col items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible"
          onClick={(e) => {
            dispatch(deleteEmail(id));
            e.stopPropagation();
          }}
        >
          <Icon
            icon="heroicons-outline:trash"
            className="transition duration-150 hover:text-danger-500"
          />
        </span>
      </span>
    </li>
  );
};

export default Emails;
