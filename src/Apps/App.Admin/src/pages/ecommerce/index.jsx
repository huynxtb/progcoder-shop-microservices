import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Textinput from "@/components/ui/Textinput";
import Modal from "@/components/ui/Modal";
import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { formatCurrency } from "@/utils/format";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

// Helper function to map API status to component status
const mapStatus = (displayStatus) => {
  if (displayStatus === "Out of Stock") return "out_of_stock";
  if (displayStatus === "Hidden" || displayStatus === "hidden") return "hidden";
  return "active";
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(API_ENDPOINTS.CATALOG.GET_ALL_PRODUCTS);
        
        // Map API response to component format
        const mappedProducts = response.data.result.items.map((item) => ({
          id: item.id,
          name: item.name,
          sku: item.sku,
          categories: item.categoryNames && item.categoryNames.length > 0 ? item.categoryNames.join(", ") : "",
          brand: item.brandName,
          price: item.price,
          salePrice: item.salePrice || null,
          published: item.published,
          featured: item.featured,
          image: item.thumbnail?.publicURL || "https://placehold.co/60x60/e2e8f0/475569?text=No+Img",
          status: mapStatus(item.displayStatus),
        }));
        
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error(t("products.fetchError") || "Failed to load products", {
          position: "top-right",
          autoClose: 5000,
        });
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [t]);

  const handleDeleteClick = (product) => {
    setItemToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete?.id) return;

    try {
      setDeleting(true);
      const response = await api.delete(API_ENDPOINTS.CATALOG.DELETE_PRODUCT(itemToDelete.id));

      if (response && response.status >= 200 && response.status < 300) {
        toast.success(t("products.deleteSuccess") || "Product deleted successfully", {
          position: "top-right",
          autoClose: 5000,
        });

        // Remove the deleted product from the list
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== itemToDelete.id)
        );

        setDeleteModalOpen(false);
        setItemToDelete(null);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    } finally {
      setDeleting(false);
    }
  };

  const COLUMNS = useMemo(() => [
    {
      Header: t("products.product"),
      accessor: "name",
      Cell: (row) => {
        const product = row?.row?.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
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
      Header: t("products.brand"),
      accessor: "brand",
      Cell: (row) => (
        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">
          {row?.cell?.value}
        </span>
      ),
    },
    {
      Header: t("products.category"),
      accessor: "categories",
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
      Header: t("products.publish"),
      accessor: "published",
      Cell: (row) => {
        const published = row?.cell?.value;
        return (
          <span
            className={`font-medium ${
              published ? "text-success-500" : "text-danger-500"
            }`}
          >
            {published ? t("products.published") : t("products.unpublished")}
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
              <Link to={`/edit-product/${product?.id}`} className="action-btn">
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
                onClick={() => handleDeleteClick(product)}
              >
                <Icon icon="heroicons:trash" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ], [t]);

  const data = useMemo(() => products, [products]);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return data;
    if (statusFilter === "published") {
      return data.filter((product) => product.published === true);
    }
    if (statusFilter === "unpublished") {
      return data.filter((product) => product.published === false);
    }
    if (statusFilter === "out_of_stock") {
      return data.filter((product) => product.status === "out_of_stock");
    }
    return data;
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
      published: data.filter((p) => p.published === true).length,
      unpublished: data.filter((p) => p.published === false).length,
      out_of_stock: data.filter((p) => p.status === "out_of_stock").length,
    };
  }, [data]);

  return (
    <>
      <div className="space-y-5">
        {/* Status Filter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { key: "all", label: t("products.all"), icon: "heroicons:squares-2x2", color: "bg-slate-500" },
            { key: "published", label: t("products.published"), icon: "heroicons:check-circle", color: "bg-success-500" },
            { key: "unpublished", label: t("products.unpublished"), icon: "heroicons:document", color: "bg-warning-500" },
            { key: "out_of_stock", label: t("products.outOfStock"), icon: "heroicons:x-circle", color: "bg-danger-500" },
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
              <button className="btn btn-outline-dark btn-sm inline-flex items-center">
                <Icon icon="heroicons:arrow-down-tray" className="ltr:mr-2 rtl:ml-2" />
                {t("products.exportExcel")}
              </button>
              <Link to="/create-product" className="btn btn-dark btn-sm inline-flex items-center">
                <Icon icon="heroicons:plus" className="ltr:mr-2 rtl:ml-2" />
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
                    {loading ? (
                      <tr>
                        <td colSpan={headerGroups[0]?.headers?.length || 6} className="table-td text-center py-8">
                          <div className="flex flex-col items-center justify-center">
                            <Icon icon="heroicons:arrow-path" className="animate-spin text-2xl text-slate-400 mb-2" />
                            <span className="text-slate-500 dark:text-slate-400">{t("common.loading") || "Loading..."}</span>
                          </div>
                        </td>
                      </tr>
                    ) : page.length === 0 ? (
                      <tr>
                        <td colSpan={headerGroups[0]?.headers?.length || 6} className="table-td text-center py-8">
                          <span className="text-slate-500 dark:text-slate-400">{t("products.noProducts") || "No products found"}</span>
                        </td>
                      </tr>
                    ) : (
                      page.map((row) => {
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
                      })
                    )}
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
            {t("common.deleteProductMessage")}
          </p>
          {itemToDelete && (
            <p className="font-semibold text-slate-800 dark:text-slate-200 mb-6">
              "{itemToDelete.name}"
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
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                  {t("common.loading")}
                </>
              ) : (
                <>
                  <Icon icon="heroicons:trash" className="ltr:mr-2 rtl:ml-2" />
                  {t("common.delete")}
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Ecommerce;
