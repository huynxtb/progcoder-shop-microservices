import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OrderDetailModal from '../modal/OrderDetailModal';

// Map OrderStatus enum values to translation keys (same as Admin app)
const ORDER_STATUS_MAP = {
  1: 'pending',
  2: 'confirmed',
  3: 'processing',
  4: 'shipped',
  5: 'delivered',
  6: 'cancelled',
  7: 'refunded',
};

const OrdersTable = ({ orders }) => {
  const { t } = useTranslation();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleViewClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedOrderId(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '-';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusBadgeClass = (status) => {
    const statusKey = ORDER_STATUS_MAP[status] || 'pending';
    const statusClasses = {
      pending: 'bg-warning text-dark',
      confirmed: 'bg-info text-white',
      processing: 'bg-info text-white',
      shipped: 'bg-primary text-white',
      delivered: 'bg-success text-white',
      cancelled: 'bg-danger text-white',
      refunded: 'bg-secondary text-white',
    };
    return statusClasses[statusKey] || statusClasses.pending;
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">{t('orders.noOrders')}</p>
      </div>
    );
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>{t('orders.orderNo')}</th>
              <th>{t('orders.date')}</th>
              <th>{t('orders.status')}</th>
              <th className="text-end">{t('orders.totalPrice')}</th>
              <th className="text-end">{t('orders.finalPrice')}</th>
              <th className="text-center">{t('orders.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>{order.orderNo}</strong>
                </td>
                <td>{formatDate(order.createdOnUtc)}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                    {t(`orders.${ORDER_STATUS_MAP[order.status] || 'pending'}`)}
                  </span>
                </td>
                <td className="text-end">{formatCurrency(order.totalPrice)}</td>
                <td className="text-end">
                  <strong>{formatCurrency(order.finalPrice)}</strong>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleViewClick(order.id)}
                  >
                    <i className="fa-regular fa-eye me-1"></i>
                    {t('orders.view')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OrderDetailModal
        show={showDetailModal}
        onClose={handleCloseModal}
        orderId={selectedOrderId}
      />
    </>
  );
};

export default OrdersTable;

