import React from "react";
import { useSelector } from "react-redux";

const InvoiceCart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h4 className="text-slate-900 dark:text-slate-300 text-2xl font-medium pb-4">
          Thank You for Your Order!
        </h4>
        <p className="text-slate-900 dark:text-slate-300 text-base font-normal">
          A copy or your order summary has been sent to
          <span className=" dark:text-slate-400 text-base font-medium ml-1 cursor-pointer">
            customer@example.com
          </span>
        </p>
      </div>
      <div className="border dark:border-slate-700 p-3 lg:p-6 rounded-sm">
        <p className="text-slate-900 dark:text-slate-300 text-base font-medium pb-3 border-b dark:border-slate-700 mb-4">
          Order Summary
        </p>
        <div className=" md:flex md:space-x-3 lg:space-x-5 space-y-3">
          <div className="flex-1">
            <div className="flex space-x-2 lg:space-x-12 rtl:space-x-reverse">
              <div className=" font-medium  min-w-[110px] md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 ">
                <p>Order Date:</p>
                <p>Name:</p>
                <p>Email:</p>
                <p>Shipping address:</p>
              </div>
              <div className="font-normal md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 min-w-[110px] ">
                <p>23-07-2023 09:53 AM</p>
                <p>Prantik Chakraborty</p>
                <p>customer.example@gmail.com</p>
                <p>
                  3947 West Side Avenue Hackensack, NJ 07601, College, United
                  States
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex space-x-2 lg:space-x-12 rtl:space-x-reverse">
              <div className=" font-medium  min-w-[110px] md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 ">
                <p>Order Status:</p>
                <p>Total order amount:</p>
                <p>Shipping:</p>
                <p>Payment method:</p>
              </div>
              <div className=" font-normal md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 min-w-[110px] ">
                <p>Pending</p>
                <p>$350.00</p>
                <p>Flat shipping rate</p>
                <p>Cash on Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 text-center lg:text-2xl text-xl font-normal text-slate-900 dark:text-slate-300">
        Order Code:{" "}
        <span className="lg:text-2xl text-xl font-medium">
          20230723-09532646
        </span>
      </div>
      <div className="p-3 md:p-6 rounded-sm">
        <p className="text-slate-900 dark:text-slate-300 text-base font-medium pb-3">
          Order Details
        </p>
        <div className="bg-white dark:bg-slate-800 space-y-7">
          <div className="overflow-x-auto border-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
                  <thead className=" border-0 border-slate-00 dark:border-slate-700">
                    <tr>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case pl-0 rtl:pr-0 ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left "
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left	 "
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left	 "
                      >
                        Delivery Type
                      </th>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case pr-0 rtl:pl-0	ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left "
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white  divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                    {items?.map((item, i) => (
                      <tr key={i}>
                        <td className="table-td flex items-center space-x-3 rtl:space-x-reverse pb-3 pl-0 rtl:pr-0 ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left">
                          <div className="md:p-4 p-2 flex-none bg-slate-200 rounded-sm md:h-20 md:w-20 w-16 h-16 rtl:ml-3">
                            <img
                              className="w-full h-full object-contain"
                              src={item.img}
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="text-slate-900 dark:text-slate-300 lg:text-base text-sm font-normal md:pb-2 pb-1 lg:w-[380px] w-[150px] truncate">
                              {item.name}
                            </p>
                          </div>
                        </td>
                        <td className="table-td pb-3 text-slate-900 dark:text-slate-300 text-sm lg:text-base font-normal ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left">
                          {item.quantity}
                        </td>
                        <td className="table-td pb-3 text-slate-900 dark:text-slate-300 text-sm lg:text-base font-normal ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left">
                          Home Delivery
                        </td>
                        <td className="table-td pb-3  pr-0 rtl:pl-0 text-slate-900 dark:text-slate-300 text-sm lg:text-base font-normal ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left">
                          $180.00
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="md:flex  lg:py-6 py-3  items-center justify-end border-t dark:border-slate-700 mt-3">
                  <div className="flex-none min-w-[270px] space-y-3">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Subtotal:
                        </span>
                        <span className="text-slate-900 dark:text-slate-300 font-medium text-xs lg:text-sm">
                          ${totalPrice}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Tax:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm font-normal">
                          $00.00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Shipping:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm font-normal">
                          $00.00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Coupon Discount:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm font-normal">
                          $00.00
                        </span>
                      </div>
                    </div>
                    <div className="border-t dark:border-slate-700 ">
                      <div className="flex justify-between pt-3">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Total:
                        </span>
                        <span className="text-slate-900 dark:text-slate-300 text-xs lg:text-sm">
                          ${totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCart;
