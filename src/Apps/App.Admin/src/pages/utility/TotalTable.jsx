import React from "react";
const rows = [
  {
    item: "Headphone",
    qty: 2,
    price: "$600.25",
    total: "$1200.50",
  },
  {
    item: "Headphone",
    qty: 2,
    price: "$600.25",
    total: "$1200.50",
  },
  {
    item: "Headphone",
    qty: 2,
    price: "$600.25",
    total: "$1200.50",
  },
  {
    item: "Headphone",
    qty: 2,
    price: "$600.25",
    total: "$1200.50",
  },
];

const TotalTable = () => {
  return (
    <div>
      <table className="w-full border-collapse table-fixed dark:border-slate-700 dark:border">
        <thead>
          <tr>
            <th
              colSpan={3}
              className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left"
            >
              <span className="block px-6 py-5 font-semibold">ITEM</span>
            </th>
            <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left">
              <span className="block px-6 py-5 font-semibold">QTY</span>
            </th>
            <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left">
              <span className="block px-6 py-5 font-semibold">PRICE</span>
            </th>
            <th className="bg-slate-50 dark:bg-slate-700 dark:text-slate-300 text-xs  font-medium leading-4 uppercase text-slate-600 ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left">
              <span className="block px-6 py-5 font-semibold">TOTAL</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((data, index) => (
            <tr
              key={index}
              className="border-b border-slate-100 dark:border-slate-700"
            >
              <td
                colSpan={3}
                className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left px-6 py-4"
              >
                {data.item}
              </td>
              <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left px-6 py-4">
                {data.qty}
              </td>
              <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left px-6 py-4">
                {data.price}
              </td>
              <td className="text-slate-900 dark:text-slate-300 text-sm  font-normal ltr:text-left last:ltr:text-right rtl:text-right last:rtl:text-left px-6 py-4">
                {data.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="md:flex px-6 py-6 items-center">
        <div className="flex-1 text-slate-500 dark:text-slate-300 text-sm">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit <br />
          officia consequat duis enim velit mollit.
        </div>
        <div className="flex-none min-w-[270px] space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-slate-600 text-xs dark:text-slate-300 uppercase">
              subtotal:
            </span>
            <span className="text-slate-900 dark:text-slate-300">$3601.50</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-slate-600 text-xs dark:text-slate-300 uppercase">
              vat (3.5%):
            </span>
            <span className="text-slate-900 dark:text-slate-300">$20.50</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-slate-600 text-xs dark:text-slate-300 uppercase">
              Invoice total:
            </span>
            <span className="text-slate-900 dark:text-slate-300 font-bold">
              $3622.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalTable;
