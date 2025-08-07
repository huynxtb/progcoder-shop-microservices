import React, { useState, useMemo } from "react";
import { teamData } from "../../../constant/table-data";

import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { MenuItem } from "@headlessui/react";
import Chart from "react-apexcharts";
import { colors } from "@/constant/data";

import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

const series = [
  {
    data: [800, 600, 1000, 800, 600, 1000, 800, 900],
  },
];
const options = {
  chart: {
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
    offsetX: 0,
    offsetY: 0,
    zoom: {
      enabled: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  colors: [colors.primary],
  tooltip: {
    theme: "light",
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
    },
  },
  yaxis: {
    show: false,
  },
  fill: {
    type: "solid",
    opacity: [0.1],
  },
  legend: {
    show: false,
  },
  xaxis: {
    low: 0,
    offsetX: 0,
    offsetY: 0,
    show: false,
    labels: {
      low: 0,
      offsetX: 0,
      show: false,
    },
    axisBorder: {
      low: 0,
      offsetX: 0,
      show: false,
    },
  },
};

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
const COLUMNS = [
  {
    Header: "assignee",
    accessor: "customer",
    Cell: (row) => {
      return (
        <span className="flex items-center min-w-[150px]">
          <span className="w-8 h-8 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
            <img
              src={row?.cell?.value.image}
              alt={row?.cell?.value.name}
              className="object-cover w-full h-full rounded-full"
            />
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
            {row?.cell?.value.name}
          </span>
        </span>
      );
    },
  },

  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="block min-w-[140px] text-left">
          <span className="inline-block text-center mx-auto py-1">
            {row?.cell?.value === "progress" && (
              <span className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="h-[6px] w-[6px] bg-danger-500 rounded-full inline-block ring-4 ring-opacity-30 ring-danger-500"></span>
                <span>In progress</span>
              </span>
            )}
            {row?.cell?.value === "complete" && (
              <span className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="h-[6px] w-[6px] bg-success-500 rounded-full inline-block ring-4 ring-opacity-30 ring-success-500"></span>

                <span>Complete</span>
              </span>
            )}
          </span>
        </span>
      );
    },
  },
  {
    Header: "time",
    accessor: "time",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "chart",
    accessor: "chart",
    Cell: (row) => {
      return (
        <span>
          <Chart options={options} series={series} type="area" height={48} />
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
                      ? "bg-danger-500/30 text-danger-500 hover:bg-danger-500 hover:text-white"
                      : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600/50"
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

const TeamTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => teamData, []);

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
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700!"
                {...getTableProps()}
              >
                <thead className="bg-slate-100 dark:bg-slate-700">
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
      </div>
    </>
  );
};

export default TeamTable;
