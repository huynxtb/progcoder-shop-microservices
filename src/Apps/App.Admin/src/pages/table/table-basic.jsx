import React from "react";
import Card from "@/components/ui/Card";
import { tableData } from "@/constant/table-data";

const columns = [
  {
    label: "Age",
    field: "age",
  },
  {
    label: "First Name",
    field: "first_name",
  },

  {
    label: "Email",
    field: "email",
  },
];
// slice(0, 10) is used to limit the number of rows to 10
const rows = tableData.slice(0, 7);
const BasicTablePage = () => {
  return (
    <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
      <Card title="basic table" noBorder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700!">
                <thead className=" border-t border-slate-100 dark:border-slate-800!">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700!">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="table-td">{row.age}</td>
                      <td className="table-td">{row.first_name}</td>
                      <td className="table-td ">{row.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <Card title="Table Head" noBorder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700!">
                <thead className="bg-slate-200 dark:bg-slate-700">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700!">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="table-td">{row.age}</td>
                      <td className="table-td">{row.first_name}</td>
                      <td className="table-td ">{row.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <Card title="Bordered Table" noBorder>
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full border border-slate-100 table-fixed dark:border-slate-700 border-collapse">
                <thead className="">
                  <tr>
                    {columns.map((column, i) => (
                      <th
                        key={i}
                        scope="col"
                        className=" table-th border border-slate-100 dark:bg-slate-800 dark:border-slate-700 "
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white ">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="table-td border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                        {row.age}
                      </td>
                      <td className="table-td border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
                        {row.first_name}
                      </td>
                      <td className="table-td border border-slate-100 dark:bg-slate-800 dark:border-slate-700 ">
                        {row.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <Card title="Borderless Table" noBorder>
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full ">
                <thead className="">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 ">
                  {rows.map((row, i) => (
                    <tr key={i}>
                      <td className="table-td ">{row.age}</td>
                      <td className="table-td ">{row.first_name}</td>
                      <td className="table-td  ">{row.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <Card title="Striped Rows" noBorder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700!">
                <thead className="bg-slate-200 dark:bg-slate-700">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700!">
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className=" even:bg-slate-200 dark:even:bg-slate-700"
                    >
                      <td className="table-td">{row.age}</td>
                      <td className="table-td">{row.first_name}</td>
                      <td className="table-td ">{row.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <Card title="Hover Table" noBorder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700!">
                <thead className="bg-slate-200 dark:bg-slate-700">
                  <tr>
                    {columns.map((column, i) => (
                      <th key={i} scope="col" className=" table-th ">
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700!">
                  {rows.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <td className="table-td">{row.age}</td>
                      <td className="table-td">{row.first_name}</td>
                      <td className="table-td ">{row.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BasicTablePage;
