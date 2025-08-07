import { Fragment, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";

import Usa from "@/assets/images/flags/usa.png";
import Gn from "@/assets/images/flags/gn.png";
const months = [
  { name: "En", image: Usa },
  { name: "Gn", image: Gn },
];

const Language = () => {
  const [selected, setSelected] = useState(months[0]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative z-22">
          <ListboxButton className="relative w-full flex items-center cursor-pointer space-x-[6px] rtl:space-x-reverse">
            <span className="inline-block md:h-6 md:w-6 w-4 h-4 rounded-full">
              <img
                src={selected.image}
                alt=""
                className="h-full w-full object-cover rounded-full"
              />
            </span>
            <span className="text-sm md:block hidden font-medium text-slate-600 dark:text-slate-300">
              {selected.name}
            </span>
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute min-w-[100px] ltr:right-0 rtl:left-0 md:top-[50px] top-[38px] w-auto max-h-60 overflow-auto border border-slate-200 dark:border-slate-700 rounded-sm bg-white dark:bg-slate-800 mt-1 ">
              {months.map((item, i) => (
                <ListboxOption
                  key={i}
                  value={item}
                  className="w-full list-none border-b border-b-gray-500/10 px-2 py-2 last:border-none last:mb-0 cursor-pointer first:rounded-t last:rounded-b group flex gap-2 dark:text-white data-[focus]:bg-slate-100/50 dark:data-[focus]:bg-slate-700/70"
                >
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="flex-none">
                      <span className="lg:w-6 lg:h-6 w-4 h-4 rounded-full inline-block">
                        <img
                          src={item.image}
                          alt=""
                          className="w-full h-full object-cover relative top-1 rounded-full"
                        />
                      </span>
                    </span>
                    <span className="flex-1 lg:text-base text-sm capitalize">
                      {item.name}
                    </span>
                  </div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Language;
