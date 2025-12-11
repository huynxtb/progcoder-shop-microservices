import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Modal from "@/components/ui/Modal";
import { formatCurrency } from "@/utils/format";

// Sample order data
const sampleOrders = {
  1: {
    id: 1,
    orderNumber: "ORD-2024-001",
    date: "2024-06-15T10:30:00",
    status: "pending",
    customer: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0901234567",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
    },
    items: [
      { id: 1, name: "iPhone 15 Pro Max 256GB", sku: "IPH-15-PM-256", price: 32990000, quantity: 1, image: "https://placehold.co/60x60/e2e8f0/475569?text=IP15" },
      { id: 2, name: "AirPods Pro 2 USB-C", sku: "APP-2-USB-C", price: 5990000, quantity: 2, image: "https://placehold.co/60x60/e2e8f0/475569?text=APP" },
    ],
    subtotal: 44970000,
    shipping: 0,
    discount: 2500000,
    total: 42470000,
    paymentMethod: "COD",
    paymentStatus: "pending",
    note: "Giao hàng giờ hành chính",
    history: [
      { date: "2024-06-15T10:30:00", status: "pending", note: "Đơn hàng được tạo" },
    ],
  },
  2: {
    id: 2,
    orderNumber: "ORD-2024-002",
    date: "2024-06-15T09:15:00",
    status: "processing",
    customer: {
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0909876543",
      address: "456 Lê Lợi, Quận 3, TP.HCM",
    },
    items: [
      { id: 3, name: "MacBook Pro 14 M3 Pro", sku: "MAC-PRO-14-M3", price: 49990000, quantity: 1, image: "https://placehold.co/60x60/e2e8f0/475569?text=MBP" },
    ],
    subtotal: 49990000,
    shipping: 50000,
    discount: 5000000,
    total: 45040000,
    paymentMethod: "Bank Transfer",
    paymentStatus: "paid",
    note: "",
    history: [
      { date: "2024-06-15T09:15:00", status: "pending", note: "Đơn hàng được tạo" },
      { date: "2024-06-15T09:20:00", status: "paid", note: "Thanh toán thành công" },
      { date: "2024-06-15T10:00:00", status: "processing", note: "Đang xử lý đơn hàng" },
    ],
  },
};

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

const OrderDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const order = sampleOrders[id] || sampleOrders[1];

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [reasonError, setReasonError] = useState(false);

  const statusConfig = {
    pending: { label: t("orderDetails.pending"), class: "text-warning-500 bg-warning-500/30", icon: "heroicons:clock" },
    processing: { label: t("orderDetails.processing"), class: "text-info-500 bg-info-500/30", icon: "heroicons:cog-6-tooth" },
    shipped: { label: t("orderDetails.shipped"), class: "text-primary-500 bg-primary-500/30", icon: "heroicons:truck" },
    delivered: { label: t("orderDetails.delivered"), class: "text-success-500 bg-success-500/30", icon: "heroicons:check-circle" },
    cancelled: { label: t("orderDetails.cancelled"), class: "text-danger-500 bg-danger-500/30", icon: "heroicons:x-circle" },
    refunded: { label: t("orderDetails.refunded"), class: "text-slate-500 bg-slate-500/30", icon: "heroicons:arrow-path" },
  };

  const paymentStatusConfig = {
    pending: { label: t("orderDetails.paymentPending"), class: "text-warning-500" },
    paid: { label: t("orderDetails.paid"), class: "text-success-500" },
    failed: { label: t("orderDetails.paymentFailed"), class: "text-danger-500" },
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // Export functionality
    console.log("Exporting order:", order.orderNumber);
  };

  const handleCancelClick = () => {
    setCancelModalOpen(true);
    setCancelReason("");
    setReasonError(false);
  };

  const confirmCancelOrder = () => {
    if (!cancelReason.trim()) {
      setReasonError(true);
      return;
    }
    console.log("Cancelling order:", order.orderNumber, "Reason:", cancelReason);
    setCancelModalOpen(false);
    setCancelReason("");
    setReasonError(false);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h4 className="text-xl font-medium text-slate-900 dark:text-white">
            {t("orderDetails.title")} {order.orderNumber}
          </h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t("orderDetails.createdAt")}: {formatDate(order.date)}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/orders" className="btn btn-outline-dark btn-sm inline-flex items-center">
            <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
            {t("orderDetails.back")}
          </Link>
          <button
            className="btn btn-outline-primary btn-sm inline-flex items-center"
            onClick={handleExport}
          >
            <Icon icon="heroicons:arrow-down-tray" className="ltr:mr-2 rtl:ml-2" />
            {t("orderDetails.exportPdf")}
          </button>
          <button
            className="btn btn-dark btn-sm inline-flex items-center"
            onClick={handlePrint}
          >
            <Icon icon="heroicons:printer" className="ltr:mr-2 rtl:ml-2" />
            {t("orderDetails.print")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-5">
          {/* Order Info Card */}
          <Card>
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h5 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  {t("orderDetails.orderInfo")}
                </h5>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusConfig[order.status]?.class}`}>
                    <Icon icon={statusConfig[order.status]?.icon} className="ltr:mr-1 rtl:ml-1 text-lg" />
                    {statusConfig[order.status]?.label}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">{t("orderDetails.paymentMethod")}</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{order.paymentMethod}</p>
                <span className={`text-sm ${paymentStatusConfig[order.paymentStatus]?.class}`}>
                  {paymentStatusConfig[order.paymentStatus]?.label}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <h6 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">
                {t("orderDetails.products")} ({order.items.length})
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
                    {order.items.map((item) => (
                      <tr key={item.id} className="border-b border-slate-100 dark:border-slate-700">
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 dark:text-slate-200">
                                {item.name}
                              </p>
                              <p className="text-xs text-slate-500 font-mono">{item.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-center">
                          <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right text-slate-600 dark:text-slate-300">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="py-4 px-2 text-right font-semibold text-slate-800 dark:text-slate-200">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>

          {/* Order History */}
          <Card title={t("orderDetails.orderHistory")}>
            <div className="relative">
              {order.history.map((event, index) => (
                <div key={index} className="flex gap-4 pb-6 last:pb-0">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-primary-500 mt-1.5"></div>
                    {index < order.history.length - 1 && (
                      <div className="absolute top-4 left-1.5 w-0.5 h-full -translate-x-1/2 bg-slate-200 dark:bg-slate-700"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {event.note}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {formatDate(event.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Notes */}
          {order.note && (
            <Card title={t("orderDetails.notes")}>
              <p className="text-slate-600 dark:text-slate-300">{order.note}</p>
            </Card>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          {/* Customer Info */}
          <Card title={t("orderDetails.customerInfo")}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary-500">
                    {order.customer.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {order.customer.name}
                  </p>
                  <p className="text-sm text-slate-500">{t("orderDetails.customer")}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center gap-3">
                  <Icon icon="heroicons:envelope" className="text-slate-400 text-lg" />
                  <span className="text-slate-600 dark:text-slate-300">{order.customer.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon icon="heroicons:phone" className="text-slate-400 text-lg" />
                  <span className="text-slate-600 dark:text-slate-300">{order.customer.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon icon="heroicons:map-pin" className="text-slate-400 text-lg mt-0.5" />
                  <span className="text-slate-600 dark:text-slate-300">{order.customer.address}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Order Summary */}
          <Card title={t("orderDetails.orderSummary")}>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">{t("orderDetails.subtotal")}</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">{t("orderDetails.shipping")}</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {order.shipping === 0 ? t("orderDetails.free") : formatCurrency(order.shipping)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">{t("orderDetails.discount")}</span>
                  <span className="font-medium text-danger-500">
                    -{formatCurrency(order.discount)}
                  </span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    {t("orderDetails.grandTotal")}
                  </span>
                  <span className="text-lg font-bold text-primary-500">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card title={t("orderDetails.actions")}>
            <div className="space-y-3">
              <button className="btn btn-outline-success w-full inline-flex items-center justify-center">
                <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
                {t("orderDetails.markAsProcessing")}
              </button>
              <button className="btn btn-outline-primary w-full inline-flex items-center justify-center">
                <Icon icon="heroicons:truck" className="ltr:mr-2 rtl:ml-2" />
                {t("orderDetails.markAsShipped")}
              </button>
              <button
                className="btn btn-outline-danger w-full inline-flex items-center justify-center"
                onClick={handleCancelClick}
              >
                <Icon icon="heroicons:x-mark" className="ltr:mr-2 rtl:ml-2" />
                {t("orderDetails.cancelOrder")}
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Cancel Order Confirmation Modal */}
      <Modal
        title={t("orderDetails.cancelOrderConfirm")}
        activeModal={cancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false);
          setCancelReason("");
          setReasonError(false);
        }}
      >
        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-danger-500/20 flex items-center justify-center">
              <Icon icon="heroicons:exclamation-triangle" className="text-danger-500 text-3xl" />
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              {t("orderDetails.cancelOrderMessage")}
            </p>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-2">
              {order.orderNumber}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
              {t("orderDetails.cancelReasonLabel")} <span className="text-danger-500">*</span>
            </label>
            <textarea
              className={`form-control ${reasonError ? "border-danger-500" : ""}`}
              rows={4}
              placeholder={t("orderDetails.cancelReasonPlaceholder")}
              value={cancelReason}
              onChange={(e) => {
                setCancelReason(e.target.value);
                if (e.target.value.trim()) {
                  setReasonError(false);
                }
              }}
            />
            {reasonError && (
              <p className="text-danger-500 text-sm mt-1">
                {t("orderDetails.cancelReasonRequired")}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              className="btn btn-outline-dark inline-flex items-center"
              onClick={() => {
                setCancelModalOpen(false);
                setCancelReason("");
                setReasonError(false);
              }}
            >
              {t("common.cancel")}
            </button>
            <button
              className="btn btn-danger inline-flex items-center"
              onClick={confirmCancelOrder}
            >
              <Icon icon="heroicons:x-mark" className="ltr:mr-2 rtl:ml-2" />
              {t("orderDetails.confirmCancel")}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderDetails;
