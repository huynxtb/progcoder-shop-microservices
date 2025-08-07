import { Dialog, Transition, Combobox, ComboboxInput, ComboboxOptions,ComboboxOption, TransitionChild, DialogPanel, } from "@headlessui/react";
import { Fragment, useState } from "react";
import Icon from "@/components/ui/Icon";
const SearchModal = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [query, setQuery] = useState(" ");
  const searchList = [
    {
      id: 1,
      name: "What is Dashcode ?",
    },
    {
      id: 2,
      name: "Our Services",
    },
    {
      id: 3,
      name: "Our Team",
    },
    {
      id: 4,
      name: "Our Clients",
    },
    {
      id: 5,
      name: "Our Partners",
    },
    {
      id: 6,
      name: "Our Blog",
    },
    {
      id: 7,
      name: "Our Contact",
    },
  ];
  const filteredsearchList = searchList.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div>
        <button
          className="flex items-center xl:text-sm text-lg xl:text-slate-400 text-slate-800 dark:text-slate-300 px-1 space-x-3 rtl:space-x-reverse"
          onClick={openModal}
        >
          <Icon icon="heroicons-outline:search" />
          <span className="xl:inline-block hidden">Search... </span>
        </button>
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-9999 overflow-y-auto p-4 md:pt-[25vh] pt-20"
          onClose={closeModal}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/60 backdrop-filter backdrop-blur-xs backdrop-brightness-10" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel>
              <Combobox>
                <div className="relative">
                  <div className="relative mx-auto max-w-xl rounded-md bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-gray-500-500 dark:ring-light divide-y divide-gray-500-300 dark:divide-light">
                    <div className="flex bg-white dark:bg-slate-800  px-3 rounded-md py-3 items-center">
                      <div className="flex-0  text-slate-700 dark:text-slate-300 ltr:pr-2 rtl:pl-2 text-lg">
                        <Icon icon="heroicons-outline:search" />
                      </div>
                      <ComboboxInput
                        className="bg-transparent outline-hidden focus:outline-hidden border-none w-full flex-1 dark:placeholder:text-slate-300 dark:text-slate-200"
                        placeholder="Search..."
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ComboboxOptions className="max-h-40 overflow-y-auto text-sm py-2">
                        {filteredsearchList.length === 0 && query !== "" && (
                          <div>
                            <div className=" text-base py-2 px-4">
                              <p className="text-slate-500 text-base dark:text-white">
                                No result found
                              </p>
                            </div>
                          </div>
                        )}

                        {filteredsearchList.map((item, i) => (
                          <ComboboxOption key={i}>
                            {({ isActive }) => (
                              <div
                                className={`px-4 text-[15px] font-normal capitalize py-2 ${
                                  isActive
                                    ? "bg-slate-900 dark:bg-slate-600 dark:bg-opacity-60 text-white"
                                    : "text-slate-900 dark:text-white"
                                }`}
                              >
                                <span>{item.name}</span>
                              </div>
                            )}
                          </ComboboxOption>
                        ))}
                      </ComboboxOptions>
                    </Transition>
                  </div>
                </div>
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
};

export default SearchModal;
