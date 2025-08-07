import React, { useState } from "react";
import Radio from "@/components/ui/Radio";
import PickupModal from "./pickup-modal";
import { useSelector } from "react-redux";

const DeliveryInfo = () => {
  const [value, setValue] = useState("A");
  const [isOpen, setOpen] = useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "B") {
      setOpen(true);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setValue("A");
  };
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <>
      <div className="card  dark:border-slate-700 rounded-xs p-5">
        <h3 className="text-slate-800 dark:text-slate-200 font-semibold  text-base uppercase pb-3">
          Your Orders
        </h3>
        <div className="card border dark:border-slate-700 rounded-xs p-5 space-y-4">
          {items?.map((item, i) => (
            <div
              className="flex sm:flex-col md:flex-row gap-3 items-center "
              key={i}
            >
              <div className="md:p-4 p-2 flex-none bg-slate-200 rounded-sm md:h-20 md:w-20 w-16 h-16 rtl:ml-3">
                <img
                  className="w-full h-full object-contain"
                  src={item.img}
                  alt={item.name}
                />
              </div>
              <div className="md:text-base text-sm">
                <p className="text-slate-900 dark:text-slate-300  font-medium md:pb-2 pb-1 line-clamp-2">
                  {item.name}
                </p>
                <p className="text-slate-900 dark:text-slate-300  font-medium">
                  <span className="text-slate-500 dark:text-slate-400  font-normal mr-1">
                    Brand:
                  </span>
                  {item.brand}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className=" md:mt-10 mt-5 lg:flex lg:space-x-4 lg:space-y-0 space-y-5 items-center">
          <p
            href="#"
            className="text-base font-medium text-slate-800 dark:text-slate-300 flex  flex-none  "
          >
            Choose Delivery Type
          </p>
          <div className="md:space-x-5 md:space-y-0 space-y-3 rtl:space-x-reverse md:flex  justify-start lg:justify-end flex-1 md:text-base text-sm ">
            <label className="inline-flex items-center border border-slate-900 dark:border-slate-700 rounded-sm py-3 lg:px-10 px-5 md:w-auto w-[200px] ">
              <Radio
                name="x"
                value="A"
                checked={value === "A"}
                onChange={handleChange}
              />
              <span className=" text-slate-900 dark:text-slate-300">
                Home Delivery
              </span>
            </label>
            <label className="inline-flex items-center border border-slate-900 dark:border-slate-700 rounded-sm py-3 lg:px-10 px-5 md:w-auto w-[200px]">
              <Radio
                name="x"
                value="B"
                checked={value === "B"}
                onChange={handleChange}
              />
              <span className=" text-slate-900 dark:text-slate-300">
                Local Pickup
              </span>
            </label>
          </div>
        </div>
      </div>
      <PickupModal activeModal={isOpen} onClose={handleCloseModal} />
    </>
  );
};

export default DeliveryInfo;
