import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Radio from "@/components/ui/Radio";
import Textinput from "@/components/ui/Textinput";
import Icon from "@/components/ui/Icon";
const PickupModal = ({ activeModal, onClose }) => {
  const [value, setValue] = useState("A");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Modal
      title="Select Your Pickup Point"
      label="Pickup Address"
      labelClass="btn-outline-dark"
      centered
      activeModal={activeModal}
      onClose={onClose}
      scrollContent
      footerContent={
        <div className="col-span-12 flex justify-end mt-5">
          <button
            type="button"
            className="btn btn-dark h-min w-max text-sm font-normal "
          >
            Save
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <Textinput
          id="phone No"
          type="text"
          placeholder="Enter Pickup Address"
          horizontal
        />
        <div className="space-y-3">
          <div className="card border dark:border-slate-700 rounded-lg p-5">
            <label className="flex gap-1 items-center cursor-pointer">
              <Radio
                name="x"
                value="B"
                checked={value === "B"}
                onChange={handleChange}
              />
              <div className="space-y-1">
                <p className="font-medium text-base rtl:text-right">
                  Mohakhali DOHS
                </p>
                <p className="font-normal text-sm text-slate-500 flex items-center">
                  <Icon icon="mi:location" className="mr-1 rtl:ml-1" /> House
                  395, Road 29, New Area
                </p>
                <p className="font-normal text-sm text-slate-500 flex items-center">
                  <Icon icon="solar:phone-outline" className="mr-1 rtl:ml-1" />
                  +880123456789
                </p>
              </div>
            </label>
          </div>
          <div className="card border dark:border-slate-700 rounded-lg p-5">
            <label className="flex gap-1 items-center cursor-pointer">
              <Radio
                name="x"
                value="A"
                checked={value === "A"}
                onChange={handleChange}
              />
              <div className="space-y-1">
                <p className="font-medium text-base rtl:text-right">
                  Mohakhali DOHS
                </p>
                <p className="font-normal text-sm text-slate-500 flex items-center">
                  <Icon icon="mi:location" className="mr-1 rtl:ml-1" /> House
                  395, Road 29, New Area
                </p>
                <p className="font-normal text-sm text-slate-500 flex items-center">
                  <Icon icon="solar:phone-outline" className="mr-1 rtl:ml-1" />
                  +880123456789
                </p>
              </div>
            </label>
          </div>
          <div className="card border dark:border-slate-700 rounded-lg p-5">
            <label className="flex gap-1 items-center cursor-pointer">
              <Radio
                name="x"
                value="C"
                checked={value === "C"}
                onChange={handleChange}
              />
              <div className="space-y-1">
                <p className="font-medium text-base rtl:text-right">
                  Mohakhali DOHS
                </p>
                <p className="font-normal text-sm text-slate-500 flex items-center">
                  <Icon icon="mi:location" className="mr-1 rtl:ml-1" /> House
                  395, Road 29, New Area
                </p>
                <p className="font-normal text-sm text-slate-500 flex items-center">
                  <Icon icon="solar:phone-outline" className="mr-1 rtl:ml-1" />
                  +880123456789
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PickupModal;
