import React, { useState } from "react";
import { payments } from "@/constant/data";
import InputGroup from "@/components/ui/InputGroup";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import { useSelector } from "react-redux";

const Payment = () => {
  const [payment, setPayment] = useState("bkash");
  const [checked, setChecked] = useState(false);
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <div className="card  rounded-xs p-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-7 col-span-12">
          <h3 className="text-slate-900 dark:text-slate-300 font-medium  text-base  pb-3">
            Select a Payment Option
          </h3>
          <div className="card border dark:border-slate-700 rounded-xs p-5">
            <div className="space-x-5 rtl:space-x-reverse">
              <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
                {payments.map((pay, i) => {
                  return (
                    <button onClick={() => setPayment(pay.value)} key={i}>
                      <div
                        className={`${
                          pay.value === payment
                            ? "text-slate-900 dark:text-white scale-105 ring-1 ring-primary-500 "
                            : " scale-100"
                        } cursor-pointer border rounded text-center
                          border-slate-300 ring-0  dark:border-slate-700 p-2 transition-all duration-150`}
                      >
                        <div>
                          <img
                            className="h-full w-full object-cover"
                            src={pay.img}
                            alt=""
                          />
                        </div>
                        <p className="pt-2">{pay.value}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center mt-3 space-x-2 rtl:space-x-reverse">
            <div className="text-base text-gray-500 ">
              <Checkbox
                value={checked}
                onChange={() => setChecked(!checked)}
                label={
                  <>
                    <span>I agree to the</span>
                    <span className="text-slate-900  dark:text-slate-300 font-medium">
                      {" "}
                      terms and conditions, Return Policy & Privacy Policy
                    </span>
                  </>
                }
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 col-span-12">
          <h3 className="text-slate-900 dark:text-slate-300 font-medium  text-base  pb-3">
            Summary
          </h3>
          <div className="card border dark:border-slate-700 rounded-xs p-4">
            <div>
              <ul className="divide-y divide-slate-300 dark:divide-slate-600!  pb-8">
                <li className=" text-xs  pb-3 ">
                  <div className="flex justify-between">
                    <p>Product</p>
                    <p>Total</p>
                  </div>
                </li>
                {items?.map((item, i) => (
                  <li
                    className=" text-sm  text-slate-600 dark:text-slate-300 py-2 "
                    key={i}
                  >
                    <div className="flex justify-between gap-3 pb-1">
                      <p>
                        {item.name}
                        <span className=" text-slate-800  dark:text-slate-300  font-medium px-2">
                          x
                        </span>
                        <span className=" text-slate-800  dark:text-slate-300  font-medium">
                          {item.quantity}
                        </span>
                      </p>
                      <p className=" text-slate-800  dark:text-slate-300  font-medium">
                        ${item.price}
                      </p>
                    </div>
                  </li>
                ))}

                <li className=" text-xs  py-2 ">
                  <div className="flex justify-between gap-3 ">
                    <p className=" text-slate-900  dark:text-slate-300  font-medium">
                      Total
                    </p>
                    <p className=" text-slate-800  dark:text-slate-300  font-medium">
                      ${totalPrice}
                    </p>
                  </div>
                </li>
              </ul>

              <InputGroup
                type="text"
                placeholder="Have coupon code? Apply here "
                append={<Button text="Apply" className="btn btn-dark " />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
