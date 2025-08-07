import { MenuButton, MenuItems, MenuItem, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import Icon from "@/components/ui/Icon";

const SplitDropdown = ({
  label = "Dropdown",
  wrapperClass = "inline-block",
  labelClass = "",
  children,
  classMenuItems = "mt-2 w-[220px]",
  splitIcon = "heroicons-outline:chevron-down",
  items = [
    {
      label: "Action",
      link: "#",
    },
    {
      label: "Another action",
      link: "#",
    },
    {
      label: "Something else here",
      link: "#",
    },
  ],
  classItem = "px-4 py-2",
}) => {
  return (
    <div className={`relative ${wrapperClass}`}>
      <Menu as="div" className="block w-full">
        <div className="split-btngroup flex">
          <button type="button" className={`btn flex-1 ${labelClass}`}>
            {label}
          </button>
          <MenuButton className={`flex-0 px-3 ${labelClass}`}>
            <Icon icon={splitIcon} />
          </MenuButton>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className={`absolute ltr:right-0 rtl:left-0 origin-top-right  border border-slate-100
            rounded bg-white dark:bg-slate-800 dark:border-slate-700 shadow-sm z-9999
            ${classMenuItems}
            `}
          >
            <div>
              {children
                ? children
                : items?.map((item, index) => (
                    <MenuItem key={index}>
                      {({ isActive }) => (
                        <div
                          className={`${
                            isActive
                              ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                              : "text-slate-600 dark:text-slate-300"
                          } block     ${
                            item.hasDivider
                              ? "border-t border-slate-100 dark:border-slate-700"
                              : ""
                          }`}
                        >
                          {item.link ? (
                            <NavLink
                              to={item.link}
                              className={`block ${classItem}`}
                            >
                              {item.icon ? (
                                <div className="flex items-center">
                                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                                    <Icon icon={item.icon} />
                                  </span>
                                  <span className="block text-sm">
                                    {item.label}
                                  </span>
                                </div>
                              ) : (
                                <span className="block text-sm">
                                  {item.label}
                                </span>
                              )}
                            </NavLink>
                          ) : (
                            <div
                              className={`block cursor-pointer ${classItem}`}
                            >
                              {item.icon ? (
                                <div className="flex items-center">
                                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                                    <Icon icon={item.icon} />
                                  </span>
                                  <span className="block text-sm">
                                    {item.label}
                                  </span>
                                </div>
                              ) : (
                                <span className="block text-sm">
                                  {item.label}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </MenuItem>
                  ))}
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default SplitDropdown;
