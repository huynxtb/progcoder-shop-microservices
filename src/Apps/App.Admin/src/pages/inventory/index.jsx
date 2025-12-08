import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Textinput from "@/components/ui/Textinput";
import Modal from "@/components/ui/Modal";
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
    minQuantity: 20,
    warehouse: "Kho Hà Nội",
    location: "A1-01",
    lastUpdated: "2024-06-15T10:30:00",
    status: "in_stock",
  },
  {
    id: 2,
    productName: "Samsung Galaxy S24 Ultra",
    sku: "SAM-S24-U-512",
    quantity: 85,
    minQuantity: 15,
    warehouse: "Kho HCM",
    location: "B2-05",
    lastUpdated: "2024-06-14T14:20:00",
    status: "in_stock",
  },
  {
    id: 3,
    productName: "MacBook Pro 14 M3",
    sku: "MAC-PRO-14-M3",
    quantity: 12,
    minQuantity: 10,
    warehouse: "Kho Hà Nội",
    location: "C3-02",
    lastUpdated: "2024-06-13T09:15:00",
    status: "low_stock",
  },
  {
    id: 4,
    productName: "iPad Air 5",
    sku: "IPAD-AIR-5-64",
    quantity: 0,
    minQuantity: 10,
    warehouse: "Kho Đà Nẵng",
    location: "D1-03",
    lastUpdated: "2024-06-10T16:45:00",
    status: "out_of_stock",
  },
  {
    id: 5,
    productName: "AirPods Pro 2",
    sku: "APP-2-USB-C",
    quantity: 200,
    minQuantity: 30,
    warehouse: "Kho HCM",
    location: "A2-08",
    lastUpdated: "2024-06-15T11:00:00",
    status: "in_stock",
  },
  {
    id: 6,
    productName: "Sony WH-1000XM5",
    sku: "SONY-XM5-BLK",
    quantity: 45,
    minQuantity: 10,
    warehouse: "Kho Hà Nội",
    location: "B1-04",
    lastUpdated: "2024-06-12T08:30:00",
    status: "in_stock",
  },
  {
    id: 7,
    productName: "Dell XPS 15",
    sku: "DELL-XPS-15-I7",
    quantity: 8,
    minQuantity: 5,
    warehouse: "Kho HCM",
    location: "C2-01",
    lastUpdated: "2024-06-11T15:45:00",
    status: "low_stock",
  },
  {
    id: 8,
    productName: "Logitech MX Master 3S",
    sku: "LOG-MX-3S",
    quantity: 0,
    minQuantity: 20,
    warehouse: "Kho Đà Nẵng",
    location: "D2-06",
    lastUpdated: "2024-06-09T10:00:00",
    status: "out_of_stock",
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
      placeholder={t("inventory.search")}
    />
  );
};

const InventoryPage = () => {
  const { t } = useTranslation();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting inventory item:", itemToDelete?.id);
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleViewClick = (item) => {
    setViewingItem(item);
    setViewModalOpen(true);
  };

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
      Cell: (row) => {
        const item = row?.row?.original;
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip content={t("common.view")} placement="top" arrow animation="shift-away">
              <button
                className="action-btn"
                type="button"
                onClick={() => handleViewClick(item)}
              >
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip>
            <Tooltip content={t("common.edit")} placement="top" arrow animation="shift-away">
              <Link to={`/edit-inventory/${item?.id}`} className="action-btn">
                <Icon icon="heroicons:pencil-square" />
              </Link>
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
                onClick={() => handleDeleteClick(item)}
              >
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
    <>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{t("inventory.title")}</h4>
          <div className="md:flex md:space-x-4 md:space-y-0 space-y-2">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} t={t} />
            <button className="btn btn-dark btn-sm inline-flex items-center">
              <Icon icon="heroicons:plus" className="ltr:mr-2 rtl:ml-2" />
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

      {/* View Inventory Detail Modal */}
      <Modal
        title={t("inventory.viewDetail")}
        activeModal={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setViewingItem(null);
        }}
      >
        {viewingItem && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h5 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {viewingItem.productName}
              </h5>
              <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded">
                {viewingItem.sku}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-slate-500">{t("inventory.quantity")}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {viewingItem.quantity}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-slate-500">{t("inventory.status")}</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${
                    viewingItem.status === "in_stock"
                      ? "text-success-500 bg-success-500/30"
                      : viewingItem.status === "low_stock"
                      ? "text-warning-500 bg-warning-500/30"
                      : "text-danger-500 bg-danger-500/30"
                  }`}
                >
                  {viewingItem.status === "in_stock" && t("inventory.inStock")}
                  {viewingItem.status === "low_stock" && t("inventory.lowStock")}
                  {viewingItem.status === "out_of_stock" && t("inventory.outOfStock")}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("inventory.warehouse")}</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {viewingItem.warehouse}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("inventory.location")}</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {viewingItem.location || "-"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("inventory.minQuantity")}</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {viewingItem.minQuantity}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-slate-500">{t("inventory.lastUpdated")}</p>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {viewingItem.lastUpdated ? formatDate(viewingItem.lastUpdated) : "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                className="btn btn-outline-dark inline-flex items-center"
                onClick={() => {
                  setViewModalOpen(false);
                  setViewingItem(null);
                }}
              >
                {t("common.close")}
              </button>
              <Link
                to={`/edit-inventory/${viewingItem.id}`}
                className="btn btn-dark inline-flex items-center"
              >
                <Icon icon="heroicons:pencil-square" className="ltr:mr-2 rtl:ml-2" />
                {t("common.edit")}
              </Link>
            </div>
          </div>
        )}
      </Modal>

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
            {t("common.deleteInventoryMessage")}
          </p>
          {itemToDelete && (
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-6">
              "{itemToDelete.productName}"
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

export default InventoryPage;
