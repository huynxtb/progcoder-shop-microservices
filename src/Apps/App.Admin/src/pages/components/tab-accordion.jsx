import React, { Fragment } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Tab, TabList, TabPanel, TabPanels, TabGroup, Disclosure, Transition } from "@headlessui/react";
import Accordion from "@/components/ui/Accordion";
const buttons = [
  {
    title: "Home",
    icon: "heroicons-outline:home",
  },
  {
    title: "Profile",
    icon: "heroicons-outline:user",
  },
  {
    title: "Messages",
    icon: "heroicons-outline:chat-alt-2",
  },
  {
    title: "Settings",
    icon: "heroicons-outline:cog",
  },
];
const items = [
  {
    title: "How does progcoder work?",
    content:
      "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
  },
  {
    title: "Where i can learn more about using progcoder?",
    content:
      "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
  },
  {
    title: "Why progcoder is so important?",
    content:
      "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
  },
];
const TabAccrodain = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-6">
      <Card title="Default Tabs">
        <TabGroup>
          <TabList className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
            {buttons.map((item, i) => (
              <Tab as={Fragment} key={i}>
                {({ selected }) => (
                  <button
                    className={` text-sm font-medium mb-7 capitalize bg-white
             dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-hidden px-2
              transition duration-150 before:transition-all before:duration-150 relative 
              before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 
              before:-translate-x-1/2 
              
              ${
                selected
                  ? "text-primary-500 before:w-full"
                  : "text-slate-500 before:w-0 dark:text-slate-300"
              }
              `}
                  >
                    {item.title}
                  </button>
                )}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi.
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim.
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi.
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>

      <Card title="Tabs With Icon">
        <TabGroup>
          <TabList className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
            {buttons.map((item, i) => (
              <Tab as={Fragment} key={i}>
                {({ selected }) => (
                  <button
                    className={` inline-flex items-start text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-hidden px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute
                     before:left-1/2 before:bottom-[-6px] before:h-[1.5px]
                      before:bg-primary-500 before:-translate-x-1/2
              
              ${
                selected
                  ? "text-primary-500 before:w-full"
                  : "text-slate-500 before:w-0 dark:text-slate-300"
              }
              `}
                  >
                    <span className="text-base relative top-[1px] ltr:mr-1 rtl:ml-1">
                      <Icon icon={item.icon} />
                    </span>
                    {item.title}
                  </button>
                )}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi.
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim.
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi.
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
      <Card title="Vertical Nav Tabs">
        <TabGroup>
          <div className="grid grid-cols-12 md:gap-2">
            <div className="lg:col-span-3 md:col-span-5 col-span-12">
              <TabList>
                {buttons.map((item, i) => (
                  <Tab key={i} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={` text-sm font-medium md:block inline-block mb-4 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-hidden px-6 rounded-md py-2 transition duration-150
                ${
                  selected
                    ? "text-white bg-primary-500 "
                    : "text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300"
                }
              `}
                      >
                        {item.title}
                      </button>
                    )}
                  </Tab>
                ))}
              </TabList>
            </div>
            <div className="lg:col-span-9 md:col-span-7 col-span-12">
              <TabPanels>
                <TabPanel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad
                    et. Sunt qui esse pariatur duis deserunt mollit dolore
                    cillum minim tempor enim. Elit aute irure tempor cupidatat
                    incididunt sint deserunt ut voluptate aute id deserunt nisi.
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad
                    et. Sunt qui esse pariatur duis deserunt mollit dolore
                    cillum minim tempor enim.
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad
                    et. Sunt qui
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad
                    et. Sunt qui esse pariatur duis deserunt mollit dolore
                    cillum minim tempor enim. Elit aute irure tempor cupidatat
                    incididunt sint deserunt ut voluptate aute id deserunt nisi.
                  </div>
                </TabPanel>
              </TabPanels>
            </div>
          </div>
        </TabGroup>
      </Card>
      <Card title="Justify Tabs">
        <TabGroup>
          <TabList className="lg:space-x-6 md:space-x-3 space-x-0 rtl:space-x-reverse">
            {buttons.map((item, i) => (
              <Tab as={Fragment} key={i}>
                {({ selected }) => (
                  <button
                    className={` text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-hidden px-6 rounded-md py-2 transition duration-150
              
              ${
                selected
                  ? "text-white bg-primary-500 "
                  : "text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300"
              }
              `}
                  >
                    {item.title}
                  </button>
                )}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi.
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim.
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui
              </div>
            </TabPanel>
            <TabPanel>
              <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.
                Sunt qui esse pariatur duis deserunt mollit dolore cillum minim
                tempor enim. Elit aute irure tempor cupidatat incididunt sint
                deserunt ut voluptate aute id deserunt nisi.
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
      <div className="xl:col-span-2 col-span-1">
        <Card title="Accordions">
          <Accordion items={items} />
        </Card>
      </div>
    </div>
  );
};

export default TabAccrodain;
