import React, { useState, useMemo } from "react";
import { advancedTable } from "@/constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { MenuItem } from "@headlessui/react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "../../../pages/table/react-tables/GlobalFilter";

const COLUMNS = [
  {
    Header: "customer",
    accessor: "customer",
    Cell: (row) => {
      return (
        <div>
          <span className="inline-flex items-center">
            <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
              <img
                src={row?.cell?.value.image}
                alt=""
                className="object-cover w-full h-full rounded-full"
              />
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-300 capitalize font-medium">
              {row?.cell?.value.name}
            </span>
          </span>
        </div>
      );
    },
  },
  {
    Header: "date",
    accessor: "date",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          {row?.cell?.value}
          <span className="inline-block ml-1">
            {Math.floor(Math.random() * 12) + 1}:
            {Math.floor(Math.random() * 60) + 1}
          </span>
        </span>
      );
    },
  },
  {
    Header: "HISTORY",
    accessor: "quantity",
    Cell: (row) => {
      return (
        <span className="text-slate-500 dark:text-slate-400">
          <span className="block text-slate-600 dark:text-slate-300">
            Transfer
          </span>
          <span className="block text-slate-500 text-xs">
            Trans ID: 8HG654Pk32
          </span>
        </span>
      );
    },
  },

  {
    Header: "amount",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="block w-full">
          <span
            className={`${
              row?.cell?.value === "paid" ? "text-success-500 " : ""
            } 
            ${row?.cell?.value === "due" ? "text-warning-500 " : ""}
            ${row?.cell?.value === "cancled" ? "text-danger-500" : ""}
            
             `}
          >
            {row?.cell?.value === "due" && <span>+$ 1,200.00</span>}
            {row?.cell?.value === "paid" && <span>+$ 200.00</span>}
            {row?.cell?.value === "cancled" && <span>+$ 1400.00</span>}
          </span>
        </span>
      );
    },
  },
  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      return (
        <div className=" text-center">
          <Dropdown
            classMenuItems="right-0 w-[140px] top-[110%] "
            label={
              <span className="text-xl text-center block w-full">
                <Icon icon="heroicons-outline:dots-vertical" />
              </span>
            }
          >
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {actions.map((item, i) => (
                <MenuItem key={i}>
                  <div
                    className={`
                  ${
                    item.name === "delete"
                      ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                      : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                  }
                   w-full border-b border-b-gray-500/10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                   first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                  >
                    <span className="text-base">
                      <Icon icon={item.icon} />
                    </span>
                    <span>{item.name}</span>
                  </div>
                </MenuItem>
              ))}
            </div>
          </Dropdown>
        </div>
      );
    },
  },
];

const actions = [
  {
    name: "view",
    icon: "heroicons-outline:eye",
  },
  {
    name: "edit",
    icon: "heroicons:pencil-square",
  },
  {
    name: "delete",
    icon: "heroicons-outline:trash",
  },
];

const TransactionsTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => advancedTable, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 4,
      },
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  return (
    <>
      <Card noBorder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">All transactions</h4>
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700!"
                {...getTableProps()}
              >
                <thead className="border-t border-slate-100 dark:border-slate-800!">
                  {headerGroups.map((headerGroup) => {
                    const { key: headerGroupKey, ...restHeaderGroupProps } =
                      headerGroup.getHeaderGroupProps();
                    return (
                      <tr key={headerGroupKey} {...restHeaderGroupProps}>
                        {headerGroup.headers.map((column) => {
                          const { key: columnKey, ...restColumnProps } =
                            column.getHeaderProps(
                              column.getSortByToggleProps()
                            );
                          return (
                            <th
                              key={columnKey}
                              {...restColumnProps}
                              scope="col"
                              className="table-th"
                            >
                              {column.render("Header")}
                              <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? " 🔽"
                                    : " 🔼"
                                  : ""}
                              </span>
                            </th>
                          );
                        })}
                      </tr>
                    );
                  })}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700!"
                  {...getTableBodyProps()}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    const { key: rowKey, ...restRowProps } = row.getRowProps();
                    return (
                      <tr key={rowKey} {...restRowProps}>
                        {row.cells.map((cell) => {
                          const { key: cellKey, ...restCellProps } =
                            cell.getCellProps();
                          return (
                            <td
                              key={cellKey}
                              {...restCellProps}
                              className="table-td py-2"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default TransactionsTable;
