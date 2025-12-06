import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Textinput from "@/components/ui/Textinput";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

// Sample inventory data
const inventoryData = [
  {
    id: 1,
    productName: "iPhone 15 Pro Max",
    sku: "IPH-15-PM-256",
    quantity: 150,
    warehouse: "Kho Hà Nội",
    status: "in_stock",
  },
  {
    id: 2,
    productName: "Samsung Galaxy S24 Ultra",
    sku: "SAM-S24-U-512",
    quantity: 85,
    warehouse: "Kho HCM",
    status: "in_stock",
  },
  {
    id: 3,
    productName: "MacBook Pro 14 M3",
    sku: "MAC-PRO-14-M3",
    quantity: 12,
    warehouse: "Kho Hà Nội",
    status: "low_stock",
  },
  {
    id: 4,
    productName: "iPad Air 5",
    sku: "IPAD-AIR-5-64",
    quantity: 0,
    warehouse: "Kho Đà Nẵng",
    status: "out_of_stock",
  },
  {
    id: 5,
    productName: "AirPods Pro 2",
    sku: "APP-2-USB-C",
    quantity: 200,
    warehouse: "Kho HCM",
    status: "in_stock",
  },
  {
    id: 6,
    productName: "Sony WH-1000XM5",
    sku: "SONY-XM5-BLK",
    quantity: 45,
    warehouse: "Kho Hà Nội",
    status: "in_stock",
  },
  {
    id: 7,
    productName: "Dell XPS 15",
    sku: "DELL-XPS-15-I7",
    quantity: 8,
    warehouse: "Kho HCM",
    status: "low_stock",
  },
  {
    id: 8,
    productName: "Logitech MX Master 3S",
    sku: "LOG-MX-3S",
    quantity: 0,
    warehouse: "Kho Đà Nẵng",
    status: "out_of_stock",
  },
];

const GlobalFilter = ({ filter, setFilter, t }) => {
  const [value, setValue] = useState(filter);
  const onChange = (e) => {
    setValue(e.target.value);
    setFilter(e.target.value || undefined);
  };
  return (
    <Textinput
      value={value || ""}
      onChange={onChange}
      placeholder={t("inventory.search")}
    />
  );
};

const InventoryPage = () => {
  const { t } = useTranslation();

  const COLUMNS = useMemo(() => [
    {
      Header: t("inventory.id"),
      accessor: "id",
      Cell: (row) => <span className="font-medium">#{row?.cell?.value}</span>,
    },
    {
      Header: t("inventory.productName"),
      accessor: "productName",
      Cell: (row) => (
        <span className="text-slate-600 dark:text-slate-300">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("inventory.sku"),
      accessor: "sku",
      Cell: (row) => (
        <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("inventory.quantity"),
      accessor: "quantity",
      Cell: (row) => (
        <span className="font-semibold">{row?.cell?.value}</span>
      ),
    },
    {
      Header: t("inventory.warehouse"),
      accessor: "warehouse",
      Cell: (row) => <span>{row?.cell?.value}</span>,
    },
    {
      Header: t("inventory.status"),
      accessor: "status",
      Cell: (row) => {
        const status = row?.cell?.value;
        return (
          <span className="block w-full">
            <span
              className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] ${
                status === "in_stock"
                  ? "text-success-500 bg-success-500/30"
                  : ""
              } 
              ${status === "low_stock" ? "text-warning-500 bg-warning-500/30" : ""}
              ${status === "out_of_stock" ? "text-danger-500 bg-danger-500/30" : ""}
              `}
            >
              {status === "in_stock" && t("inventory.inStock")}
              {status === "low_stock" && t("inventory.lowStock")}
              {status === "out_of_stock" && t("inventory.outOfStock")}
            </span>
          </span>
        );
      },
    },
    {
      Header: t("inventory.actions"),
      accessor: "action",
      Cell: () => {
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip content={t("common.view")} placement="top" arrow animation="shift-away">
              <button className="action-btn" type="button">
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip>
            <Tooltip content={t("common.edit")} placement="top" arrow animation="shift-away">
              <button className="action-btn" type="button">
                <Icon icon="heroicons:pencil-square" />
              </button>
            </Tooltip>
            <Tooltip
              content={t("common.delete")}
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button className="action-btn" type="button">
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ], [t]);

  const data = useMemo(() => inventoryData, []);

  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data,
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
    <Card>
      <div className="md:flex justify-between items-center mb-6">
        <h4 className="card-title">{t("inventory.title")}</h4>
        <div className="md:flex md:space-x-4 md:space-y-0 space-y-2">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} t={t} />
          <button className="btn btn-dark btn-sm">
            <Icon icon="heroicons:plus" className="mr-1" />
            {t("inventory.import")}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden">
            <table
              className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700!"
              {...getTableProps()}
            >
              <thead className="bg-slate-200 dark:bg-slate-700">
                {headerGroups.map((headerGroup) => {
                  const { key: headerKey, ...restHeaderProps } =
                    headerGroup.getHeaderGroupProps();
                  return (
                    <tr key={headerKey} {...restHeaderProps}>
                      {headerGroup.headers.map((column) => {
                        const { key: columnKey, ...restColumnProps } =
                          column.getHeaderProps(column.getSortByToggleProps());
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
      <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <select
            className="form-control py-2 w-max"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {t("common.show")} {size}
              </option>
            ))}
          </select>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {t("common.page")}{" "}
            <span>
              {pageIndex + 1} {t("common.of")} {pageOptions.length}
            </span>
          </span>
        </div>
        <ul className="flex items-center space-x-3 rtl:space-x-reverse">
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={`${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <Icon icon="heroicons:chevron-double-left-solid" />
            </button>
          </li>
          <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={`${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {t("common.previous")}
            </button>
          </li>
          {pageOptions.map((pageNum, pageIdx) => (
            <li key={pageIdx}>
              <button
                aria-current="page"
                className={`${
                  pageIdx === pageIndex
                    ? "bg-slate-900 dark:bg-slate-600 dark:text-slate-200 text-white font-medium"
                    : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900 font-normal"
                } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                onClick={() => gotoPage(pageIdx)}
              >
                {pageNum + 1}
              </button>
            </li>
          ))}
          <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              className={`${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {t("common.next")}
            </button>
          </li>
          <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className={`${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Icon icon="heroicons:chevron-double-right-solid" />
            </button>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default InventoryPage;
