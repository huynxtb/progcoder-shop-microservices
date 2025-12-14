import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Textinput from "@/components/ui/Textinput";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { formatCurrency } from "@/utils/format";
import { orderService } from "@/services/orderService";
import signalRService from "@/services/signalRService";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Map OrderStatus enum values to display strings
const ORDER_STATUS_MAP = {
  1: "pending",
  2: "confirmed",
  3: "processing",
  4: "shipped",
  5: "delivered",
  6: "canceled",
  7: "refunded",
};

// Get available status transitions based on current status
const getAvailableStatuses = (currentStatus, t) => {
  const allStatuses = [
    { value: 1, label: t("orders.pending") },
    { value: 2, label: t("orders.confirmed") },
    { value: 3, label: t("orders.processing") },
    { value: 4, label: t("orders.shipped") },
    { value: 5, label: t("orders.delivered") },
    { value: 6, label: t("orders.cancelled") },
    { value: 7, label: t("orders.refunded") },
  ];

  // Status transition rules
  const transitionMap = {
    1: [2, 3, 6], // Pending -> Confirmed, Processing, Canceled
    2: [3, 6], // Confirmed -> Processing, Canceled
    3: [4, 6], // Processing -> Shipped, Canceled
    4: [5, 6], // Shipped -> Delivered, Canceled
    5: [7], // Delivered -> Refunded
    6: [], // Canceled -> cannot change
    7: [], // Refunded -> cannot change
  };

  const availableStatusValues = transitionMap[currentStatus] || [];
  return allStatuses.filter((status) => availableStatusValues.includes(status.value));
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
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [statusUpdateModalOpen, setStatusUpdateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateReason, setUpdateReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedReasonType, setSelectedReasonType] = useState(null);

  // Fetch orders from API
  const fetchOrders = useCallback(async () => {
      try {
        setLoading(true);
        const response = await orderService.getAllOrders();
        console.log("Orders API response:", response);
        if (response.data && response.data.result) {
          const ordersData = response.data.result.items || response.data.result;
          setOrders(Array.isArray(ordersData) ? ordersData : []);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // SignalR connection for real-time notifications
  useEffect(() => {
    const setupSignalR = async () => {
      try {
        // Connect to SignalR hub
        await signalRService.connect();

        // Register notification handler with unique key - will replace old callback if exists
        signalRService.onNotificationByKey("orders-page", (notification) => {
          console.log("Orders page: Received notification:", notification);

          // Check if it's an OrderCreated notification (type = 1)
          if (notification.type === 1) {
            const orderData = notification.data;
            // Handle both camelCase and PascalCase property names
            const orderId = orderData?.orderId || orderData?.OrderId;
            const finalPrice = orderData?.finalPrice || orderData?.FinalPrice;

            // Show toast notification
            toast.success(
              <div>
                <div className="font-semibold">{notification.title || "New Order Created"}</div>
                <div className="text-sm">
                  {notification.message || (orderId && `Order #${orderId}`)}
                  {finalPrice && ` - ${formatCurrency(finalPrice)}`}
                </div>
              </div>,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }
            );

            // Refresh orders list - call directly without dependency
            orderService.getAllOrders().then((response) => {
              if (response.data && response.data.result) {
                const ordersData = response.data.result.items || response.data.result;
                setOrders(Array.isArray(ordersData) ? ordersData : []);
              }
            }).catch((error) => {
              console.error("Failed to fetch orders after notification:", error);
            });
          }
        });
      } catch (error) {
        console.error("Failed to setup SignalR connection:", error);
      }
    };

    setupSignalR();

    // Cleanup: unregister callback by key when component unmounts
    return () => {
      signalRService.offNotificationByKey("orders-page");
    };
  }, []); // Empty dependencies - only run once on mount

  const handleStatusUpdateClick = useCallback((order) => {
    if (!order) return;
    setSelectedOrder(order);
    // Set initial status to first available status or empty
    const availableStatuses = getAvailableStatuses(order.status, t);
    setUpdateStatus(availableStatuses.length > 0 ? availableStatuses[0].value.toString() : "");
    setUpdateReason("");
    setReasonError(false);
    setStatusUpdateModalOpen(true);
  }, [t]);

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;

    const statusValue = parseInt(updateStatus);
    const requiresReason = statusValue === 6 || statusValue === 7; // Canceled or Refunded

    if (requiresReason && !updateReason.trim()) {
      setReasonError(true);
      return;
    }

    setIsUpdatingStatus(true);
    try {
      console.log("Updating order status:", selectedOrder.id, { status: statusValue, reason: updateReason });
      const updateResponse = await orderService.updateOrderStatus(selectedOrder.id, {
        status: statusValue,
        reason: requiresReason ? updateReason : null,
      });
      console.log("Update status API response:", updateResponse);

      // Refresh orders list
      const response = await orderService.getOrders();
      console.log("Refresh orders API response:", response);
      if (response.data && response.data.result) {
        const ordersData = response.data.result.items || response.data.result;
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      }

      setStatusUpdateModalOpen(false);
      setSelectedOrder(null);
      setUpdateStatus("");
      setUpdateReason("");
      setReasonError(false);
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const COLUMNS = useMemo(
    () => [
      {
        Header: t("orders.orderNumber"),
        accessor: "orderNo",
        Cell: (row) => {
          const order = row?.row?.original;
          return (
            <Link
              to={`/orders/${order?.id}`}
              className="font-medium text-primary-500 hover:text-primary-600"
            >
              {row?.cell?.value || order?.orderNumber || "-"}
            </Link>
          );
        },
      },
      {
        Header: t("orders.customer"),
        accessor: "customer",
        Cell: (row) => {
          const customer = row?.cell?.value;
          if (!customer) return "-";
          return (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-200">
                  {customer?.name?.charAt(0) || "?"}
                </span>
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {customer?.name || "-"}
                </p>
                <p className="text-xs text-slate-500">{customer?.email || ""}</p>
              </div>
            </div>
          );
        },
      },
      {
        Header: t("orders.orderDate"),
        accessor: "createdOnUtc",
        Cell: (row) => (
          <span className="text-slate-600 dark:text-slate-300">
            {formatDate(row?.cell?.value)}
          </span>
        ),
      },
      {
        Header: t("orders.items"),
        accessor: "orderItems",
        Cell: (row) => {
          const items = row?.cell?.value;
          const count = Array.isArray(items) ? items.length : 0;
          return (
            <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
              {count}
            </span>
          );
        },
      },
      {
        Header: t("orders.total"),
        accessor: "finalPrice",
        Cell: (row) => (
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {formatCurrency(row?.cell?.value || 0)}
          </span>
        ),
      },
      {
        Header: t("orders.status"),
        accessor: "status",
        Cell: (row) => {
          const order = row?.row?.original;
          const status = row?.cell?.value;
          const statusKey = ORDER_STATUS_MAP[status] || "pending";
          const statusConfig = {
            pending: {
              label: t("orders.pending"),
              class: "text-warning-500 bg-warning-500/30",
            },
            confirmed: {
              label: t("orders.confirmed"),
              class: "text-info-500 bg-info-500/30",
            },
            processing: {
              label: t("orders.processing"),
              class: "text-info-500 bg-info-500/30",
            },
            shipped: {
              label: t("orders.shipped"),
              class: "text-primary-500 bg-primary-500/30",
            },
            delivered: {
              label: t("orders.delivered"),
              class: "text-success-500 bg-success-500/30",
            },
            canceled: {
              label: t("orders.cancelled"),
              class: "text-danger-500 bg-danger-500/30",
            },
            refunded: {
              label: t("orders.refunded"),
              class: "text-slate-500 bg-slate-500/30",
            },
          };
          const config = statusConfig[statusKey] || statusConfig.pending;
          
          // Check if status is canceled or refunded and has reason
          const isCanceled = status === 6;
          const isRefunded = status === 7;
          const reason = isCanceled 
            ? order?.cancelReason 
            : isRefunded 
            ? order?.refundReason 
            : null;
          const showInfoIcon = (isCanceled || isRefunded) && reason;
          
          const handleReasonClick = () => {
            setSelectedReason(reason);
            setSelectedReasonType(isCanceled ? t("orders.cancelled") : t("orders.refunded"));
            setReasonModalOpen(true);
          };
          
          return (
            <div className="flex items-center justify-center gap-2">
              <span
                className={`inline-block px-3 min-w-[90px] text-center py-1 rounded-[999px] ${config.class}`}
              >
                {config.label}
              </span>
              {showInfoIcon && (
                <button
                  type="button"
                  onClick={handleReasonClick}
                  className="cursor-pointer"
                >
                  <Icon 
                    icon="heroicons:information-circle" 
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  />
                </button>
              )}
            </div>
          );
        },
      },
      {
        Header: t("orders.actions"),
        accessor: "action",
        Cell: (row) => {
          const order = row?.row?.original;
          if (!order) return null;
          
          // Only show update status button if there are available status transitions
          const availableStatuses = getAvailableStatuses(order.status, t);
          const canUpdateStatus = availableStatuses.length > 0;
          
          // Check if order can be updated (not Delivered, Canceled, or Refunded)
          const cannotUpdateOrder = order.status === 5 || order.status === 6 || order.status === 7;
          
          return (
            <div className="flex space-x-3 rtl:space-x-reverse">
              <Tooltip
                content={t("common.view")}
                placement="top"
                arrow
                animation="shift-away"
              >
                <Link to={`/orders/${order.id}`} className="action-btn">
                  <Icon icon="heroicons:eye" />
                </Link>
              </Tooltip>
              {canUpdateStatus && (
                <Tooltip
                  content={t("orders.updateStatus")}
                  placement="top"
                  arrow
                  animation="shift-away"
                >
                  <button
                    className="action-btn"
                    type="button"
                    onClick={() => handleStatusUpdateClick(order)}
                  >
                    <Icon icon="heroicons:pencil-square" />
                  </button>
                </Tooltip>
              )}
              {!cannotUpdateOrder && (
                <Tooltip
                  content={t("orderDetails.edit")}
                  placement="top"
                  arrow
                  animation="shift-away"
                >
                  <Link to={`/orders/${order.id}/edit`} className="action-btn">
                    <Icon icon="heroicons:pencil" />
                  </Link>
                </Tooltip>
              )}
            </div>
          );
        },
      },
    ],
    [t]
  );

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((order) => {
      const statusKey = ORDER_STATUS_MAP[order.status] || "pending";
      return statusKey === statusFilter;
    });
  }, [orders, statusFilter]);

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
    const counts = {
      all: orders.length,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
      refunded: 0,
    };

    orders.forEach((order) => {
      const statusKey = ORDER_STATUS_MAP[order.status] || "pending";
      if (statusKey === "pending") counts.pending++;
      else if (statusKey === "processing") counts.processing++;
      else if (statusKey === "shipped") counts.shipped++;
      else if (statusKey === "delivered") counts.delivered++;
      else if (statusKey === "canceled") counts.cancelled++;
      else if (statusKey === "refunded") counts.refunded++;
    });

    return counts;
  }, [orders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Icon icon="heroicons:arrow-path" className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p className="text-slate-600 dark:text-slate-300">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-5">
        {/* Status Filter Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              key: "all",
              label: t("orders.all"),
              icon: "heroicons:inbox",
              color: "bg-slate-500",
            },
            {
              key: "pending",
              label: t("orders.pending"),
              icon: "heroicons:clock",
              color: "bg-warning-500",
            },
            {
              key: "processing",
              label: t("orders.processing"),
              icon: "heroicons:cog-6-tooth",
              color: "bg-info-500",
            },
            {
              key: "shipped",
              label: t("orders.shipped"),
              icon: "heroicons:truck",
              color: "bg-primary-500",
            },
            {
              key: "delivered",
              label: t("orders.delivered"),
              icon: "heroicons:check-circle",
              color: "bg-success-500",
            },
            {
              key: "cancelled",
              label: t("orders.cancelled"),
              icon: "heroicons:x-circle",
              color: "bg-danger-500",
            },
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
                <div
                  className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center`}
                >
                  <Icon icon={item.icon} className="text-white text-xl" />
                </div>
                <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {statusCounts[item.key] || 0}
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
              <button
                className="btn btn-primary btn-sm inline-flex items-center"
                onClick={() => navigate("/orders/create")}
              >
                <Icon icon="heroicons:plus" className="ltr:mr-2 rtl:ml-2" />
                {t("orders.createNew")}
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
                    {page.length === 0 ? (
                      <tr>
                        <td colSpan={COLUMNS.length} className="table-td text-center py-8">
                          <p className="text-slate-500 dark:text-slate-400">
                            {t("orders.noOrders")}
                          </p>
                        </td>
                      </tr>
                    ) : (
                      page.map((row) => {
                        prepareRow(row);
                        const { key: rowKey, ...restRowProps } = row.getRowProps();
                        return (
                          <tr key={rowKey} {...restRowProps}>
                            {row.cells.map((cell) => {
                              const { key: cellKey, ...restCellProps } = cell.getCellProps();
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
                  className={`${
                    !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <Icon icon="heroicons:chevron-double-left-solid" />
                </button>
              </li>
              <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                <button
                  className={`${
                    !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
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

      {/* Update Status Modal */}
      <Modal
        title={t("orders.updateStatus")}
        activeModal={statusUpdateModalOpen}
        onClose={() => {
          setStatusUpdateModalOpen(false);
          setSelectedOrder(null);
          setUpdateStatus("");
          setUpdateReason("");
          setReasonError(false);
        }}
      >
        <div className="space-y-4">
          {selectedOrder && (
            <div className="mb-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t("orders.orderNumber")}:{" "}
                <span className="font-semibold">{selectedOrder.orderNo || selectedOrder.orderNumber}</span>
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
              {t("orders.status")} <span className="text-danger-500">*</span>
            </label>
            <Select
              value={updateStatus}
              onChange={(e) => {
                setUpdateStatus(e.target.value);
                if (e.target.value !== "6" && e.target.value !== "7") {
                  setUpdateReason("");
                  setReasonError(false);
                }
              }}
              options={
                selectedOrder && selectedOrder.status !== undefined
                  ? getAvailableStatuses(selectedOrder.status, t).map((opt) => ({
                      value: opt.value.toString(),
                      label: opt.label,
                    }))
                  : []
              }
            />
          </div>

          {(updateStatus === "6" || updateStatus === "7") && (
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                {t("orders.reason")} <span className="text-danger-500">*</span>
              </label>
              <Textarea
                className={reasonError ? "border-danger-500" : ""}
                rows={4}
                placeholder={t("orders.reasonPlaceholder")}
                value={updateReason}
                onChange={(e) => {
                  setUpdateReason(e.target.value);
                  if (e.target.value.trim()) {
                    setReasonError(false);
                  }
                }}
              />
              {reasonError && (
                <p className="text-danger-500 text-sm mt-1">{t("orders.reasonRequired")}</p>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              className="btn btn-outline-dark inline-flex items-center"
              onClick={() => {
                setStatusUpdateModalOpen(false);
                setSelectedOrder(null);
                setUpdateStatus("");
                setUpdateReason("");
                setReasonError(false);
              }}
              disabled={isUpdatingStatus}
            >
              {t("common.cancel")}
            </button>
            <button
              className="btn btn-primary inline-flex items-center"
              onClick={handleStatusUpdate}
              disabled={isUpdatingStatus}
            >
              {isUpdatingStatus ? (
                <>
                  <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                  {t("common.updating")}
                </>
              ) : (
                <>
                  <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
                  {t("orders.updateStatus")}
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Reason Modal */}
      <Modal
        title={selectedReasonType ? `${selectedReasonType} - ${t("orders.reason")}` : t("orders.reason")}
        activeModal={reasonModalOpen}
        onClose={() => {
          setReasonModalOpen(false);
          setSelectedReason(null);
          setSelectedReasonType(null);
        }}
      >
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <p className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
              {selectedReason || "-"}
            </p>
          </div>
          <div className="flex justify-end">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setReasonModalOpen(false);
                setSelectedReason(null);
                setSelectedReasonType(null);
              }}
            >
              {t("common.close")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Orders;

