import React, { Fragment } from "react";
import Accordion from "@/components/ui/Accordion";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Tab, TabList, TabPanel, TabPanels, TabGroup } from "@headlessui/react";

const faqmenus = [
  {
    title: "Getting started",
  },
  {
    title: "Privacy & security",
  },
  {
    title: "Legal",
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
  {
    title: "Where can i find progcoder?",
    content:
      "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
  },
  {
    title: "Why progcoder is so important?",
    content:
      "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
  },
];
const items2 = [
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
];
const items3 = [
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
    title: "Where can i find progcoder?",
    content:
      "Jornalists call this critical, introductory section the  and when bridge properly executed, it's the that carries your reader from anheadine try at attention-grabbing to the body of your blog post.",
  },
];

const FaqPage = () => {
  return (
    <div>
      <TabGroup>
        <div className="grid gap-5 grid-cols-12">
          <div className="xl:col-span-3 lg:col-span-4 col-span-12 card-auto-height">
            <Card>
              <TabList className="flex flex-col space-y-1 text-start items-start">
                {faqmenus.map((item, i) => (
                  <Tab key={i} as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`focus:ring-0 focus:outline-hidden space-x-2 text-sm flex items-center w-full transition duration-150 px-3 py-4 rounded-[6px] rtl:space-x-reverse
                            ${
                              selected
                                ? "bg-slate-100 dark:bg-slate-900 dark:text-white"
                                : "bg-white dark:bg-slate-800 dark:text-slate-300"
                            }
                         `}
                        type="button"
                      >
                        <span
                          className={`
                              "text-lg",
                              ${
                                selected
                                  ? " opacity-100"
                                  : "opacity-50 dark:opacity-100"
                              }
                        `}
                        ></span>
                        <Icon icon="heroicons:chevron-double-right-solid" />
                        <span> {item.title}</span>
                      </button>
                    )}
                  </Tab>
                ))}
              </TabList>
            </Card>
          </div>
          <div className="xl:col-span-9 lg:col-span-8 col-span-12">
            <TabPanels>
              <TabPanel>
                <Accordion items={items} />
              </TabPanel>
              <TabPanel>
                <Accordion items={items2} />
              </TabPanel>
              <TabPanel>
                <Accordion items={items3} />
              </TabPanel>
            </TabPanels>
          </div>
        </div>
      </TabGroup>
    </div>
  );
};

export default FaqPage;
