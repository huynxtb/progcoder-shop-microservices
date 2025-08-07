import React, { useState, useMemo } from "react";
import { homeTable } from "../../../constant/table-data";

import Icon from "@/components/ui/Icon";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

const COLUMNS = [
  {
    Header: "company",
    accessor: "company",
    Cell: (row) => {
      return (
        <span className="flex items-center">
          <div className="flex-none">
            <div className="w-8 h-8 rounded-[100%] ltr:mr-3 rtl:ml-3">
              <img
                src={row?.cell?.value}
                alt=""
                className="w-full h-full rounded-[100%] object-cover"
              />
            </div>
          </div>
          <div className="flex-1 text-start">
            <h4 className="text-sm font-medium text-slate-600 whitespace-nowrap">
              Biffco Enterprises Ltd.
            </h4>
            <div className="text-xs font-normal text-slate-600 dark:text-slate-400">
              Biffco@example.com
            </div>
          </div>
        </span>
      );
    },
  },
  {
    Header: "Category",
    accessor: "category",
    Cell: (row) => {
      return <span>Technology</span>;
    },
  },
  {
    Header: "sales",
    accessor: "sales",
    Cell: (row) => {
      return (
        <div className="flex space-x-6 items-center rtl:space-x-reverse">
          <span> {row?.cell?.value + "%"}</span>
          <span
            className={` text-xl
             ${row?.cell?.value > 100 ? "text-success-500" : "text-danger-500"}
              `}
          >
            {row?.cell?.value > 100 ? (
              <Icon icon="heroicons:arrow-trending-up" />
            ) : (
              <Icon icon="heroicons:arrow-trending-down" />
            )}
          </span>
        </div>
      );
    },
  },
  {
    Header: "views",
    accessor: "views",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "revenue",
    accessor: "revenue",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
];

const CompanyTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => homeTable, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 6,
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

  const { pageIndex, pageSize } = state;

  return (
    <>
      <div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className="bg-slate-200 dark:bg-slate-700">
                  {headerGroups.map((headerGroup) => {
                    const headerGroupProps = headerGroup.getHeaderGroupProps();
                    const { key: groupKey, ...restGroupProps } =
                      headerGroupProps;

                    return (
                      <tr key={groupKey} {...restGroupProps}>
                        {headerGroup.headers.map((column) => {
                          const headerProps = column.getHeaderProps(
                            column.getSortByToggleProps()
                          );
                          const { key: columnKey, ...restHeaderProps } =
                            headerProps;

                          return (
                            <th
                              key={columnKey}
                              {...restHeaderProps}
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
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row, i) => {
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
                              className="table-td"
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
        <div className="md:flex md:space-y-0 space-y-5 justify-center mt-6 items-center">
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CompanyTable;
