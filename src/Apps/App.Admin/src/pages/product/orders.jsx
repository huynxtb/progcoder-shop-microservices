import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Textinput from "@/components/ui/Textinput";
import Modal from "@/components/ui/Modal";
import { formatCurrency } from "@/utils/format";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

// Sample order data
const orderData = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customer: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      avatar: null,
    },
    date: "2024-06-15T10:30:00",
    items: 3,
    total: 2500000,
    paymentMethod: "COD",
    status: "pending",
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customer: {
      name: "Trần Thị B",
      email: "tranthib@email.com",
      avatar: null,
    },
    date: "2024-06-15T09:15:00",
    items: 1,
    total: 15000000,
    paymentMethod: "Bank Transfer",
    status: "processing",
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customer: {
      name: "Lê Văn C",
      email: "levanc@email.com",
      avatar: null,
    },
    date: "2024-06-14T16:45:00",
    items: 5,
    total: 4500000,
    paymentMethod: "VNPay",
    status: "shipped",
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    customer: {
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      avatar: null,
    },
    date: "2024-06-14T14:20:00",
    items: 2,
    total: 890000,
    paymentMethod: "Momo",
    status: "delivered",
  },
  {
    id: 5,
    orderNumber: "ORD-2024-005",
    customer: {
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      avatar: null,
    },
    date: "2024-06-13T11:00:00",
    items: 1,
    total: 32000000,
    paymentMethod: "Credit Card",
    status: "delivered",
  },
  {
    id: 6,
    orderNumber: "ORD-2024-006",
    customer: {
      name: "Đỗ Thị F",
      email: "dothif@email.com",
      avatar: null,
    },
    date: "2024-06-12T08:30:00",
    items: 4,
    total: 1200000,
    paymentMethod: "COD",
    status: "cancelled",
  },
  {
    id: 7,
    orderNumber: "ORD-2024-007",
    customer: {
      name: "Vũ Văn G",
      email: "vuvang@email.com",
      avatar: null,
    },
    date: "2024-06-11T15:45:00",
    items: 2,
    total: 5600000,
    paymentMethod: "ZaloPay",
    status: "refunded",
  },
  {
    id: 8,
    orderNumber: "ORD-2024-008",
    customer: {
      name: "Bùi Thị H",
      email: "buithih@email.com",
      avatar: null,
    },
    date: "2024-06-10T10:00:00",
    items: 3,
    total: 7800000,
    paymentMethod: "Bank Transfer",
    status: "delivered",
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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
      placeholder={t("orders.search")}
    />
  );
};

const Orders = () => {
  const { t } = useTranslation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (order) => {
    setItemToDelete(order);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting order:", itemToDelete?.id);
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const COLUMNS = useMemo(() => [
    {
      Header: t("orders.orderNumber"),
      accessor: "orderNumber",
      Cell: (row) => {
        const order = row?.row?.original;
        return (
          <Link
            to={`/order-details/${order?.id}`}
            className="font-medium text-primary-500 hover:text-primary-600"
          >
            {row?.cell?.value}
          </Link>
        );
      },
    },
    {
      Header: t("orders.customer"),
      accessor: "customer",
      Cell: (row) => {
        const customer = row?.cell?.value;
        return (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-200">
                {customer?.name?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                {customer?.name}
              </p>
              <p className="text-xs text-slate-500">{customer?.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      Header: t("orders.orderDate"),
      accessor: "date",
      Cell: (row) => (
        <span className="text-slate-600 dark:text-slate-300">
          {formatDate(row?.cell?.value)}
        </span>
      ),
    },
    {
      Header: t("orders.items"),
      accessor: "items",
      Cell: (row) => (
        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("orders.total"),
      accessor: "total",
      Cell: (row) => (
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {formatCurrency(row?.cell?.value)}
        </span>
      ),
    },
    {
      Header: t("orders.paymentMethod"),
      accessor: "paymentMethod",
      Cell: (row) => (
        <span className="text-slate-600 dark:text-slate-300">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("orders.status"),
      accessor: "status",
      Cell: (row) => {
        const status = row?.cell?.value;
        const statusConfig = {
          pending: { label: t("orders.pending"), class: "text-warning-500 bg-warning-500/30" },
          processing: { label: t("orders.processing"), class: "text-info-500 bg-info-500/30" },
          shipped: { label: t("orders.shipped"), class: "text-primary-500 bg-primary-500/30" },
          delivered: { label: t("orders.delivered"), class: "text-success-500 bg-success-500/30" },
          cancelled: { label: t("orders.cancelled"), class: "text-danger-500 bg-danger-500/30" },
          refunded: { label: t("orders.refunded"), class: "text-slate-500 bg-slate-500/30" },
        };
        const config = statusConfig[status] || statusConfig.pending;
        return (
          <span className="block w-full">
            <span
              className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] ${config.class}`}
            >
              {config.label}
            </span>
          </span>
        );
      },
    },
    {
      Header: t("orders.actions"),
      accessor: "action",
      Cell: (row) => {
        const order = row?.row?.original;
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip content={t("common.view")} placement="top" arrow animation="shift-away">
              <Link to={`/order-details/${order?.id}`} className="action-btn">
                <Icon icon="heroicons:eye" />
              </Link>
            </Tooltip>
            <Tooltip content={t("common.print")} placement="top" arrow animation="shift-away">
              <button className="action-btn" type="button">
                <Icon icon="heroicons:printer" />
              </button>
            </Tooltip>
            <Tooltip
              content={t("common.delete")}
              placement="top"
              arrow
              animation="shift-away"
              theme="danger"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleDeleteClick(order)}
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ], [t]);

  const data = useMemo(() => orderData, []);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return data;
    return data.filter((order) => order.status === statusFilter);
  }, [data, statusFilter]);

  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data: filteredData,
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

  // Status counts
  const statusCounts = useMemo(() => {
    return {
      all: data.length,
      pending: data.filter((o) => o.status === "pending").length,
      processing: data.filter((o) => o.status === "processing").length,
      shipped: data.filter((o) => o.status === "shipped").length,
      delivered: data.filter((o) => o.status === "delivered").length,
      cancelled: data.filter((o) => o.status === "cancelled").length,
    };
  }, [data]);

  return (
    <>
      <div className="space-y-5">
        {/* Status Filter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { key: "all", label: t("orders.all"), icon: "heroicons:inbox", color: "bg-slate-500" },
            { key: "pending", label: t("orders.pending"), icon: "heroicons:clock", color: "bg-warning-500" },
            { key: "processing", label: t("orders.processing"), icon: "heroicons:cog-6-tooth", color: "bg-info-500" },
            { key: "shipped", label: t("orders.shipped"), icon: "heroicons:truck", color: "bg-primary-500" },
            { key: "delivered", label: t("orders.delivered"), icon: "heroicons:check-circle", color: "bg-success-500" },
            { key: "cancelled", label: t("orders.cancelled"), icon: "heroicons:x-circle", color: "bg-danger-500" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                statusFilter === item.key
                  ? "border-primary-500 bg-primary-500/10"
                  : "border-slate-200 dark:border-slate-700 hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}>
                  <Icon icon={item.icon} className="text-white text-xl" />
                </div>
                <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {statusCounts[item.key]}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 text-left">
                {item.label}
              </p>
            </button>
          ))}
        </div>

        <Card>
          <div className="md:flex justify-between items-center mb-6">
            <h4 className="card-title">{t("orders.title")}</h4>
            <div className="md:flex md:space-x-4 md:space-y-0 space-y-2 mt-4 md:mt-0">
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} t={t} />
              <button className="btn btn-outline-dark btn-sm inline-flex items-center">
                <Icon icon="heroicons:funnel" className="ltr:mr-2 rtl:ml-2" />
                {t("orders.filter")}
              </button>
              <button className="btn btn-outline-dark btn-sm inline-flex items-center">
                <Icon icon="heroicons:arrow-down-tray" className="ltr:mr-2 rtl:ml-2" />
                {t("orders.exportExcel")}
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
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        title={t("common.deleteConfirmTitle")}
        activeModal={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-danger-500/20 flex items-center justify-center">
            <Icon icon="heroicons:exclamation-triangle" className="text-danger-500 text-3xl" />
          </div>
          <p className="text-slate-600 dark:text-slate-300 mb-2">
            {t("common.deleteOrderMessage")}
          </p>
          {itemToDelete && (
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-6">
              "{itemToDelete.orderNumber}"
            </p>
          )}
          <div className="flex justify-center space-x-3">
            <button
              className="btn btn-outline-dark inline-flex items-center"
              onClick={() => {
                setDeleteModalOpen(false);
                setItemToDelete(null);
              }}
            >
              {t("common.cancel")}
            </button>
            <button
              className="btn btn-danger inline-flex items-center"
              onClick={confirmDelete}
            >
              <Icon icon="heroicons:trash" className="ltr:mr-2 rtl:ml-2" />
              {t("common.delete")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Orders;
