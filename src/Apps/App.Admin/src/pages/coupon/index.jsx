import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
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

// Sample coupon data
const couponData = [
  {
    id: 1,
    code: "SUMMER2024",
    discount: 20,
    type: "percent",
    minOrder: 500000,
    maxDiscount: 200000,
    usageLimit: 100,
    usedCount: 45,
    expiryDate: "2024-08-31",
    status: "active",
  },
  {
    id: 2,
    code: "FREESHIP50",
    discount: 50000,
    type: "fixed",
    minOrder: 300000,
    maxDiscount: null,
    usageLimit: 500,
    usedCount: 234,
    expiryDate: "2024-07-15",
    status: "active",
  },
  {
    id: 3,
    code: "NEWUSER",
    discount: 15,
    type: "percent",
    minOrder: 200000,
    maxDiscount: 100000,
    usageLimit: null,
    usedCount: 1567,
    expiryDate: "2024-12-31",
    status: "active",
  },
  {
    id: 4,
    code: "FLASH100K",
    discount: 100000,
    type: "fixed",
    minOrder: 1000000,
    maxDiscount: null,
    usageLimit: 50,
    usedCount: 50,
    expiryDate: "2024-06-01",
    status: "expired",
  },
  {
    id: 5,
    code: "VIP30",
    discount: 30,
    type: "percent",
    minOrder: 2000000,
    maxDiscount: 500000,
    usageLimit: 200,
    usedCount: 89,
    expiryDate: "2024-09-30",
    status: "active",
  },
  {
    id: 6,
    code: "BIRTHDAY",
    discount: 25,
    type: "percent",
    minOrder: 0,
    maxDiscount: 150000,
    usageLimit: null,
    usedCount: 456,
    expiryDate: "2024-12-31",
    status: "inactive",
  },
];

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

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
      placeholder={t("coupon.search")}
    />
  );
};

const CouponPage = () => {
  const { t } = useTranslation();

  const COLUMNS = useMemo(() => [
    {
      Header: t("coupon.id"),
      accessor: "id",
      Cell: (row) => <span className="font-medium">#{row?.cell?.value}</span>,
    },
    {
      Header: t("coupon.code"),
      accessor: "code",
      Cell: (row) => (
        <span className="font-mono font-bold text-primary-500 bg-primary-500/10 px-2 py-1 rounded">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("coupon.discount"),
      accessor: "discount",
      Cell: (row) => {
        const type = row?.row?.original?.type;
        const value = row?.cell?.value;
        return (
          <span className="font-semibold">
            {type === "percent" ? `${value}%` : formatCurrency(value)}
          </span>
        );
      },
    },
    {
      Header: t("coupon.type"),
      accessor: "type",
      Cell: (row) => (
        <span
          className={`inline-block px-2 py-1 rounded text-sm ${
            row?.cell?.value === "percent"
              ? "bg-blue-500/20 text-blue-500"
              : "bg-green-500/20 text-green-500"
          }`}
        >
          {row?.cell?.value === "percent" ? t("coupon.percent") : t("coupon.fixed")}
        </span>
      ),
    },
    {
      Header: t("coupon.minOrder"),
      accessor: "minOrder",
      Cell: (row) => (
        <span className="text-slate-600 dark:text-slate-300">
          {formatCurrency(row?.cell?.value)}
        </span>
      ),
    },
    {
      Header: t("coupon.usedCount"),
      accessor: "usedCount",
      Cell: (row) => {
        const usageLimit = row?.row?.original?.usageLimit;
        const usedCount = row?.cell?.value;
        return (
          <span>
            {usedCount}
            {usageLimit && ` / ${usageLimit}`}
          </span>
        );
      },
    },
    {
      Header: t("coupon.expiryDate"),
      accessor: "expiryDate",
      Cell: (row) => {
        const date = new Date(row?.cell?.value);
        const isExpired = date < new Date();
        return (
          <span className={isExpired ? "text-danger-500" : ""}>
            {date.toLocaleDateString("vi-VN")}
          </span>
        );
      },
    },
    {
      Header: t("coupon.status"),
      accessor: "status",
      Cell: (row) => {
        const status = row?.cell?.value;
        return (
          <span className="block w-full">
            <span
              className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] ${
                status === "active" ? "text-success-500 bg-success-500/30" : ""
              } 
              ${status === "inactive" ? "text-warning-500 bg-warning-500/30" : ""}
              ${status === "expired" ? "text-danger-500 bg-danger-500/30" : ""}
              `}
            >
              {status === "active" && t("coupon.active")}
              {status === "inactive" && t("coupon.inactive")}
              {status === "expired" && t("coupon.expired")}
            </span>
          </span>
        );
      },
    },
    {
      Header: t("coupon.actions"),
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

  const data = useMemo(() => couponData, []);

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
        <h4 className="card-title">{t("coupon.title")}</h4>
        <div className="md:flex md:space-x-4 md:space-y-0 space-y-2">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} t={t} />
          <Link to="/create-coupon" className="btn btn-dark btn-sm">
            <Icon icon="heroicons:plus" className="mr-1" />
            {t("coupon.createNew")}
          </Link>
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

export default CouponPage;
