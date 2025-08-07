import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import { Disclosure,DisclosureButton, DisclosurePanel } from "@headlessui/react";
const items = [
  {
    version: "Version 2.0.1",
    date: "1 February 2023",
    changes: [
      {
        name: "Monochrome mode",
        tag: "added",
      },
      {
        name: "Axios configuration",
        tag: "fixed",
      },
      {
        name: "Other minor issues",
        tag: "fixed",
      },
    ],
  },
  {
    version: "Version 2.0.0",
    date: "24 January 2023",
    changes: [
      {
        name: "Change log page added.",
        tag: "added",
      },
      {
        name: "Badge added in sidebar.",
        tag: "added",
      },
      {
        name: "Vuex replaced with pinia",
        tag: "update",
      },
      {
        name: "Webpack replaced with Vite.",
        tag: "update",
      },
      {
        name: "Other minor issues",
        tag: "fixed",
      },
    ],
  },
  {
    version: "Version 1.0.1 ",
    date: "3 January 2023",
    changes: [
      {
        name: "RTL version added.",
        tag: "added",
      },
      {
        name: "Sidebar updated.",
        tag: "update",
      },
      {
        name: "Other minor issues",
        tag: "fixed",
      },
    ],
  },
  {
    version: "Version 1.0.0 ",
    date: "29 December 2022",
    changes: [
      {
        name: "Initial Release",
      },
    ],
  },
];
const ChangelogPage = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="lg:col-span-8 col-span-12">
        <Card title="Version's">
          <div>
            <Badge label="new " className="bg-primary-500  text-white" />
          </div>
          <div className="mt-6 space-y-5">
            {items.map((item, i) => (
              <div key={i} className="mb-3">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="bg-slate-50 dark:bg-slate-700 dark:bg-opacity-60 rounded-t-md flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4">
                        <span>
                          {item.version}
                          <span className="font-semibold text-xs text-slate-400">
                            - Published on {item.date}
                          </span>
                        </span>
                        <span
                          className={` ${
                            open && "rotate-180 transform"
                          }  transition-all duration-150 text-xl`}
                        >
                          <Icon icon="heroicons:chevron-down-solid" />
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel>
                        <div className="text-sm text-slate-600 font-normal bg-white dark:bg-slate-900 dark:text-slate-300 rounded-b-md dark:border dark:border-slate-700 dark:border-t-0 border border-slate-100 border-t-0">
                          <div className="px-8 py-4">
                            {item.changes.map((data, j) => (
                              <div key={j}>
                                <div className="flex space-x-3 items-center mt-2 text-slate-600 dark:text-slate-300 text-sm">
                                  <span className="h-2 w-2 bg-primary-500 rounded-full"></span>
                                  <span>{data.name}</span>

                                  <span
                                    className={` px-2 rounded-full text-xs capitalize
                                    ${
                                      data.tag === "added"
                                        ? "bg-indigo-100 text-indigo-500"
                                        : data.tag === "update"
                                        ? "bg-yellow-100 text-yellow-500"
                                        : data.tag === "fixed"
                                        ? "bg-red-100 text-red-500"
                                        : ""
                                    }
                                    `}
                                  >
                                    {data.tag}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="lg:col-span-4 col-span-12">
        <Card title="CHANGELOG">
          <h5 className="text-xs font-medium">VERSION HISTORY</h5>
          <ul className="space-y-3 mt-6 divide-y dark:divide-slate-700! divide-slate-100">
            {items.map((item, i) => (
              <li
                className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300 pt-3"
                key={i}
              >
                <span>{item.version} </span>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ChangelogPage;
