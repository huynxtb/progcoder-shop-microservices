import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { formatCurrency } from "@/utils/format";
import { orderService } from "@/services/orderService";
import LoaderCircle from "@/components/Loader-circle";

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

const OrderDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdateModalOpen, setStatusUpdateModalOpen] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateReason, setUpdateReason] = useState("");
  const [reasonError, setReasonError] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedReasonType, setSelectedReasonType] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      try {
        setLoading(true);
        console.log("Fetching order by ID:", id);
        const response = await orderService.getOrderById(id);
        console.log("Order details API response:", response);
        if (response.data && response.data.result && response.data.result.order) {
          setOrder(response.data.result.order);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const statusKey = order ? ORDER_STATUS_MAP[order.status] || "pending" : "pending";
  const statusConfig = {
    pending: {
      label: t("orderDetails.pending"),
      class: "text-warning-500 bg-warning-500/30",
      icon: "heroicons:clock",
    },
    confirmed: {
      label: t("orderDetails.confirmed"),
      class: "text-info-500 bg-info-500/30",
      icon: "heroicons:check-circle",
    },
    processing: {
      label: t("orderDetails.processing"),
      class: "text-info-500 bg-info-500/30",
      icon: "heroicons:cog-6-tooth",
    },
    shipped: {
      label: t("orderDetails.shipped"),
      class: "text-primary-500 bg-primary-500/30",
      icon: "heroicons:truck",
    },
    delivered: {
      label: t("orderDetails.delivered"),
      class: "text-success-500 bg-success-500/30",
      icon: "heroicons:check-circle",
    },
    canceled: {
      label: t("orderDetails.cancelled"),
      class: "text-danger-500 bg-danger-500/30",
      icon: "heroicons:x-circle",
    },
    refunded: {
      label: t("orderDetails.refunded"),
      class: "text-slate-500 bg-slate-500/30",
      icon: "heroicons:arrow-path",
    },
  };

  const currentStatus = statusConfig[statusKey] || statusConfig.pending;

  const handlePrint = () => {
    window.print();
  };

  const handleStatusUpdateClick = () => {
    if (!order) return;
    // Set initial status to first available status or empty
    const availableStatuses = getAvailableStatuses(order.status, t);
    setUpdateStatus(availableStatuses.length > 0 ? availableStatuses[0].value.toString() : "");
    setUpdateReason("");
    setReasonError(false);
    setStatusUpdateModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    if (!order || !id) return;

    const statusValue = parseInt(updateStatus);
    const requiresReason = statusValue === 6 || statusValue === 7; // Canceled or Refunded

    if (requiresReason && !updateReason.trim()) {
      setReasonError(true);
      return;
    }

    setIsUpdatingStatus(true);
    try {
      console.log("Updating order status:", id, { status: statusValue, reason: updateReason });
      const updateResponse = await orderService.updateOrderStatus(id, {
        status: statusValue,
        reason: requiresReason ? updateReason : null,
      });
      console.log("Update status API response:", updateResponse);

      // Refresh order data
      const response = await orderService.getOrderById(id);
      console.log("Refresh order API response:", response);
      if (response.data && response.data.result && response.data.result.order) {
        setOrder(response.data.result.order);
      }

      setStatusUpdateModalOpen(false);
      setUpdateStatus("");
      setUpdateReason("");
      setReasonError(false);
    } catch (error) {
      console.error("Failed to update order status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoaderCircle />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <Icon icon="heroicons:exclamation-triangle" className="w-16 h-16 mx-auto mb-4 text-slate-400" />
        <p className="text-slate-600 dark:text-slate-300">{t("orderDetails.notFound")}</p>
        <Link to="/orders" className="btn btn-primary mt-4 inline-flex items-center">
          <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
          {t("orderDetails.backToOrders")}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h4 className="text-xl font-medium text-slate-900 dark:text-white">
            {t("orderDetails.title")} {order.orderNo || order.orderNumber || id}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t("orderDetails.createdAt")}: {formatDate(order.createdOnUtc)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/orders" className="btn btn-outline-dark btn-sm inline-flex items-center">
            <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
            {t("orderDetails.back")}
          </Link>
          {order && order.status !== undefined && getAvailableStatuses(order.status, t).length > 0 && (
            <button
              className="btn btn-outline-primary btn-sm inline-flex items-center"
              onClick={handleStatusUpdateClick}
            >
              <Icon icon="heroicons:pencil-square" className="ltr:mr-2 rtl:ml-2" />
              {t("orders.updateStatus")}
            </button>
          )}
          {order && order.status !== undefined && order.status !== 5 && order.status !== 6 && order.status !== 7 && (
            <button
              className="btn btn-outline-primary btn-sm inline-flex items-center"
              onClick={() => navigate(`/orders/${id}/edit`)}
            >
              <Icon icon="heroicons:pencil-square" className="ltr:mr-2 rtl:ml-2" />
              {t("orderDetails.edit")}
            </button>
          )}
          <button
            className="btn btn-dark btn-sm inline-flex items-center"
            onClick={handlePrint}
          >
            <Icon icon="heroicons:printer" className="ltr:mr-2 rtl:ml-2" />
            {t("orderDetails.print")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Order Info Card - Full Width */}
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <h5 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {t("orderDetails.orderInfo")}
              </h5>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${currentStatus.class}`}
                >
                  <Icon icon={currentStatus.icon} className="ltr:mr-1 rtl:ml-1 text-lg" />
                  {currentStatus.label}
                </span>
                {((order.status === 6 && order.cancelReason) || (order.status === 7 && order.refundReason)) && (
                  <button
                    type="button"
                    onClick={() => {
                      const reason = order.status === 6 ? order.cancelReason : order.refundReason;
                      const reasonType = order.status === 6 ? t("orders.cancelled") : t("orders.refunded");
                      setSelectedReason(reason);
                      setSelectedReasonType(reasonType);
                      setReasonModalOpen(true);
                    }}
                    className="cursor-pointer"
                  >
                    <Icon 
                      icon="heroicons:information-circle" 
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-lg"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <h6 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
              {t("orderDetails.products")} ({order.orderItems?.length || 0})
            </h6>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {t("orderDetails.product")}
                    </th>
                    <th className="text-center py-3 px-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {t("orderDetails.quantity")}
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {t("orderDetails.unitPrice")}
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {t("orderDetails.total")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.map((item, index) => (
                      <tr key={index} className="border-b border-slate-100 dark:border-slate-700">
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0 flex items-center justify-center">
                              {item.product?.imageUrl ? (
                                <img
                                  src={item.product.imageUrl}
                                  alt={item.product.name || t("orderDetails.product")}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Icon icon="heroicons:photo" className="w-6 h-6 text-slate-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 dark:text-slate-200">
                                {item.product?.name || t("orderDetails.unknownProduct")}
                              </p>
                              {item.product?.sku && (
                                <p className="text-xs text-slate-500 font-mono">{item.product.sku}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-center">
                          <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded">
                            {item.quantity || 0}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right text-slate-600 dark:text-slate-300">
                          {formatCurrency(item.product?.price || 0)}
                        </td>
                        <td className="py-4 px-2 text-right font-semibold text-slate-800 dark:text-slate-200">
                          {formatCurrency((item.product?.price || 0) * (item.quantity || 0))}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500">
                        {t("orderDetails.noItems")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Customer Info */}
        <Card title={t("orderDetails.customerInfo")}>
          <div className="space-y-4">
            {order.customer && (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary-500">
                      {order.customer.name?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {order.customer.name || "-"}
                    </p>
                    <p className="text-sm text-slate-500">{t("orderDetails.customer")}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                  {order.customer.email && (
                    <div className="flex items-center gap-3">
                      <Icon icon="heroicons:envelope" className="text-slate-400 text-lg" />
                      <span className="text-slate-600 dark:text-slate-300">
                        {order.customer.email}
                      </span>
                    </div>
                  )}
                  {order.customer.phoneNumber && (
                    <div className="flex items-center gap-3">
                      <Icon icon="heroicons:phone" className="text-slate-400 text-lg" />
                      <span className="text-slate-600 dark:text-slate-300">
                        {order.customer.phoneNumber}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Shipping Address */}
        {order.shippingAddress && (
          <Card title={t("orderDetails.shippingAddress")}>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300 min-w-[120px]">
                  {t("orders.addressLine")}:
                </span>
                <span className="text-slate-600 dark:text-slate-300 flex-1">
                  {order.shippingAddress.addressLine || "-"}
                </span>
              </div>
              {order.shippingAddress.ward && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 min-w-[120px]">
                    {t("orders.ward")}:
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {order.shippingAddress.ward}
                  </span>
                </div>
              )}
              {order.shippingAddress.district && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 min-w-[120px]">
                    {t("orders.district")}:
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {order.shippingAddress.district}
                  </span>
                </div>
              )}
              {order.shippingAddress.city && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 min-w-[120px]">
                    {t("orders.city")}:
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {order.shippingAddress.city}
                  </span>
                </div>
              )}
              {order.shippingAddress.state && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 min-w-[120px]">
                    {t("orders.state")}:
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {order.shippingAddress.state}
                  </span>
                </div>
              )}
              {order.shippingAddress.country && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 min-w-[120px]">
                    {t("orders.country")}:
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {order.shippingAddress.country}
                  </span>
                </div>
              )}
              {order.shippingAddress.zipCode && (
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 min-w-[120px]">
                    {t("orders.zipCode")}:
                  </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {order.shippingAddress.zipCode}
                  </span>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Order Summary */}
        <Card title={t("orderDetails.orderSummary")}>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-300">
                {t("orderDetails.subtotal")}
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {formatCurrency(order.totalPrice || 0)}
              </span>
            </div>
            {order.discount && order.discount.discountAmount > 0 && (
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">
                  {t("orderDetails.discount")}
                  {order.discount.couponCode && (
                    <span className="ml-2 text-xs">({order.discount.couponCode})</span>
                  )}
                </span>
                <span className="font-medium text-danger-500">
                  -{formatCurrency(order.discount.discountAmount || 0)}
                </span>
              </div>
            )}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {t("orderDetails.grandTotal")}
                </span>
                <span className="text-lg font-bold text-primary-500">
                  {formatCurrency(order.finalPrice || 0)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Notes */}
        {order.notes && (
          <Card title={t("orderDetails.notes")}>
            <p className="text-slate-600 dark:text-slate-300">{order.notes}</p>
          </Card>
        )}
      </div>

      {/* Update Status Modal */}
      <Modal
        title={t("orders.updateStatus")}
        activeModal={statusUpdateModalOpen}
        onClose={() => {
          setStatusUpdateModalOpen(false);
          setUpdateStatus("");
          setUpdateReason("");
          setReasonError(false);
        }}
      >
        <div className="space-y-4">
          {order && (
            <div className="mb-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t("orders.orderNumber")}:{" "}
                <span className="font-semibold">{order.orderNo || order.orderNumber}</span>
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
                order
                  ? getAvailableStatuses(order.status, t).map((opt) => ({
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
                  {t("common.update")}
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
    </div>
  );
};

export default OrderDetails;

