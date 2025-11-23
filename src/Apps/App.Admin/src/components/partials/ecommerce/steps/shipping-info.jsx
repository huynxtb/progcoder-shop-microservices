import React, { useState } from "react";
import Radio from "@/components/ui/Radio";
import NoteModal from "./note-modal";
import Icons from "@/components/ui/Icon";

const ShippingInfo = () => {
  const [value, setValue] = useState("A");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const [isOpen, setOpen] = useState(false);
  const handleToggleModal = () => {
    setOpen(!isOpen);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="bg-white dark:bg-slate-800">
        <div className=" rounded-sm p-5 space-y-5">
          <div className=" border dark:border-slate-700 rounded-sm  p-5">
            <label className="flex  ">
              <Radio
                name="x"
                value="B"
                checked={value === "B"}
                onChange={handleChange}
              />
              <div className="flex -mt-1 space-x-5 rtl:space-x-reverse">
                <div className="  min-w-[110px] md:text-base text-sm text-slate-500 dark:text-slate-400  space-y-1.5 ">
                  <p>Address:</p>
                  <p>Postal Code:</p>
                  <p>City:</p>
                  <p>State:</p>
                  <p>Country:</p>
                  <p>Phone No:</p>
                </div>
                <div className="  md:text-base text-sm text-slate-900 dark:text-slate-300  space-y-1.5 ">
                  <p>395/B progcoder Tower, Road 29, Mohakhali DOHS</p>
                  <p>1206</p>
                  <p>Mohakhali</p>
                  <p>Dhaka</p>
                  <p>Bangladesh:</p>
                  <p>9876543201</p>
                </div>
              </div>
            </label>
          </div>
          <div className=" border dark:border-slate-700 rounded-sm p-5 ">
            <label className="flex gap-1 ">
              <Radio
                name="x"
                value="A"
                checked={value === "A"}
                onChange={handleChange}
              />
              <div className="flex -mt-1 space-x-5 rtl:space-x-reverse">
                <div className="min-w-[110px] md:text-base text-sm text-slate-500 dark:text-slate-400  space-y-1.5">
                  <p>Address:</p>
                  <p>Postal Code:</p>
                  <p>City:</p>
                  <p>State:</p>
                  <p>Country:</p>
                  <p>Phone No:</p>
                </div>
                <div className="  md:text-base text-sm text-slate-900 dark:text-slate-300  space-y-1.5 ">
                  <p>395/B progcoder Tower, Road 29, Mohakhali DOHS</p>
                  <p>1206</p>
                  <p>Mohakhali</p>
                  <p>Dhaka</p>
                  <p>Bangladesh:</p>
                  <p>9876543201</p>
                </div>
              </div>
            </label>
          </div>
          <button
            className="w-full flex flex-col justify-center items-center font-normal text-slate-800 dark:text-slate-300 p-5 space-y-3 border dark:border-slate-700 rounded-sm bg-slate-100 dark:bg-slate-800"
            onClick={handleToggleModal}
          >
            <Icons icon="ic:round-plus" className="h-6 w-6" />
            <span>Add New Address</span>
          </button>
        </div>
      </div>
      <NoteModal activeModal={isOpen} onclose={handleCloseModal} />
    </>
  );
};

export default ShippingInfo;
