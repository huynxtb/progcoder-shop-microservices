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

// Sample product data
const productData = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    sku: "IPH-15-PM-256",
    category: "Điện thoại",
    price: 34990000,
    salePrice: 32990000,
    stock: 45,
    image: "https://placehold.co/60x60/e2e8f0/475569?text=IP15",
    status: "active",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    sku: "SAM-S24-U-512",
    category: "Điện thoại",
    price: 33990000,
    salePrice: null,
    stock: 28,
    image: "https://placehold.co/60x60/e2e8f0/475569?text=S24",
    status: "active",
  },
  {
    id: 3,
    name: "MacBook Pro 14 M3 Pro",
    sku: "MAC-PRO-14-M3",
    category: "Laptop",
    price: 52990000,
    salePrice: 49990000,
    stock: 0,
    image: "https://placehold.co/60x60/e2e8f0/475569?text=MBP",
    status: "out_of_stock",
  },
  {
    id: 4,
    name: "iPad Air 5 64GB WiFi",
    sku: "IPAD-AIR-5-64",
    category: "Tablet",
    price: 15990000,
    salePrice: null,
    stock: 67,
    image: "https://placehold.co/60x60/e2e8f0/475569?text=iPad",
    status: "active",
  },
  {
    id: 5,
    name: "AirPods Pro 2 USB-C",
    sku: "APP-2-USB-C",
    category: "Phụ kiện",
    price: 6790000,
    salePrice: 5990000,
    stock: 120,
    image: "https://placehold.co/60x60/e2e8f0/475569?text=APP",
    status: "active",
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    sku: "SONY-XM5-BLK",
    category: "Phụ kiện",
    price: 8490000,
    salePrice: null,
    stock: 15,
    image: "https://placehold.co/60x60/e2e8f0/475569?text=Sony",
    status: "active",
  },
  {
    id: 7,
    name: "Dell XPS 15 i7-13700H",
    sku: "DELL-XPS-15-I7",
    category: "Laptop",
    price: 45990000,
    salePrice: null,
    stock: 8,
    image: "https://placehold.co/60x60/e2e8f0/475569?text=Dell",
    status: "draft",
  },
  {
    id: 8,
    name: "Logitech MX Master 3S",
    sku: "LOG-MX-3S",
    category: "Phụ kiện",
    price: 2790000,
    salePrice: 2490000,
    stock: 0,
    image: "https://placehold.co/60x60/e2e8f0/475569?text=Logi",
    status: "out_of_stock",
  },
  {
    id: 9,
    name: "Apple Watch Series 9",
    sku: "AW-S9-45-GPS",
    category: "Đồng hồ",
    price: 11990000,
    salePrice: null,
    stock: 34,
    image: "https://placehold.co/60x60/e2e8f0/475569?text=AW9",
    status: "hidden",
  },
  {
    id: 10,
    name: "Samsung Galaxy Tab S9+",
    sku: "SAM-TAB-S9P",
    category: "Tablet",
    price: 24990000,
    salePrice: 22990000,
    stock: 12,
    image: "https://placehold.co/60x60/e2e8f0/475569?text=TabS9",
    status: "active",
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
      placeholder={t("products.search")}
    />
  );
};

const Ecommerce = () => {
  const { t } = useTranslation();

  const COLUMNS = useMemo(() => [
    {
      Header: t("products.product"),
      accessor: "name",
      Cell: (row) => {
        const product = row?.row?.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <Link
                to={`/products/${product?.id}`}
                className="font-medium text-slate-800 dark:text-slate-200 hover:text-primary-500 truncate block max-w-[250px]"
              >
                {product?.name}
              </Link>
              <p className="text-xs text-slate-500 font-mono">{product?.sku}</p>
            </div>
          </div>
        );
      },
    },
    {
      Header: t("products.category"),
      accessor: "category",
      Cell: (row) => (
        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("products.price"),
      accessor: "price",
      Cell: (row) => {
        const product = row?.row?.original;
        return (
          <div>
            {product?.salePrice ? (
              <>
                <span className="font-semibold text-danger-500">
                  {formatCurrency(product?.salePrice)}
                </span>
                <span className="text-xs text-slate-400 line-through block">
                  {formatCurrency(product?.price)}
                </span>
              </>
            ) : (
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {formatCurrency(product?.price)}
              </span>
            )}
          </div>
        );
      },
    },
    {
      Header: t("products.stock"),
      accessor: "stock",
      Cell: (row) => {
        const stock = row?.cell?.value;
        return (
          <span
            className={`font-medium ${
              stock === 0
                ? "text-danger-500"
                : stock < 10
                ? "text-warning-500"
                : "text-slate-800 dark:text-slate-200"
            }`}
          >
            {stock}
          </span>
        );
      },
    },
    {
      Header: t("products.status"),
      accessor: "status",
      Cell: (row) => {
        const status = row?.cell?.value;
        const statusConfig = {
          active: { label: t("products.active"), class: "text-success-500 bg-success-500/30" },
          out_of_stock: { label: t("products.outOfStock"), class: "text-danger-500 bg-danger-500/30" },
          draft: { label: t("products.draft"), class: "text-warning-500 bg-warning-500/30" },
          hidden: { label: t("products.hidden"), class: "text-slate-500 bg-slate-500/30" },
        };
        const config = statusConfig[status] || statusConfig.active;
        return (
          <span className="block w-full">
            <span
              className={`inline-block px-3 min-w-[80px] text-center py-1 rounded-[999px] text-sm ${config.class}`}
            >
              {config.label}
            </span>
          </span>
        );
      },
    },
    {
      Header: t("products.actions"),
      accessor: "action",
      Cell: (row) => {
        const product = row?.row?.original;
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip content={t("common.view")} placement="top" arrow animation="shift-away">
              <Link to={`/products/${product?.id}`} className="action-btn">
                <Icon icon="heroicons:eye" />
              </Link>
            </Tooltip>
            <Tooltip content={t("common.edit")} placement="top" arrow animation="shift-away">
              <Link to="/edit-product" className="action-btn">
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
              <button className="action-btn" type="button">
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ], [t]);

  const data = useMemo(() => productData, []);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return data;
    return data.filter((product) => product.status === statusFilter);
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
      active: data.filter((p) => p.status === "active").length,
      out_of_stock: data.filter((p) => p.status === "out_of_stock").length,
      draft: data.filter((p) => p.status === "draft").length,
      hidden: data.filter((p) => p.status === "hidden").length,
    };
  }, [data]);

  return (
    <div className="space-y-5">
      {/* Status Filter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { key: "all", label: t("products.all"), icon: "heroicons:squares-2x2", color: "bg-slate-500" },
          { key: "active", label: t("products.active"), icon: "heroicons:check-circle", color: "bg-success-500" },
          { key: "out_of_stock", label: t("products.outOfStock"), icon: "heroicons:x-circle", color: "bg-danger-500" },
          { key: "draft", label: t("products.draft"), icon: "heroicons:document", color: "bg-warning-500" },
          { key: "hidden", label: t("products.hidden"), icon: "heroicons:eye-slash", color: "bg-slate-400" },
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
          <h4 className="card-title">{t("products.title")}</h4>
          <div className="md:flex md:space-x-4 md:space-y-0 space-y-2 mt-4 md:mt-0">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} t={t} />
            <button className="btn btn-outline-dark btn-sm">
              <Icon icon="heroicons:arrow-down-tray" className="mr-1" />
              {t("products.exportExcel")}
            </button>
            <Link to="/create-product" className="btn btn-dark btn-sm">
              <Icon icon="heroicons:plus" className="mr-1" />
              {t("products.createNew")}
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
    </div>
  );
};

export default Ecommerce;
