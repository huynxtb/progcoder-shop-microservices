import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { orderService } from '../../services/orderService';

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

const OrderDetailModal = ({ show, onClose, orderId }) => {
  const { t } = useTranslation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && orderId) {
      fetchOrderDetail();
    }
  }, [show, orderId]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const response = await orderService.getMyOrderById(orderId);
      if (response?.data?.result?.order) {
        setOrder(response.data.result.order);
      }
    } catch (error) {
      console.error('Failed to fetch order detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('orders.details')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">{t('common.loading')}</span>
            </div>
          </div>
        ) : order ? (
          <div className="order-detail-content">
            {/* Order Header */}
            <div className="mb-4 pb-3 border-bottom">
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>{t('orders.orderNo')}:</strong> {order.orderNo}
                  </p>
                  <p className="mb-2">
                    <strong>{t('orders.status')}:</strong>{' '}
                    <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                      {t(`orders.${ORDER_STATUS_MAP[order.status] || 'pending'}`)}
                    </span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>{t('orders.createdOn')}:</strong> {formatDate(order.createdOnUtc)}
                  </p>
                  {order.lastModifiedOnUtc && (
                    <p className="mb-2">
                      <strong>{t('orders.lastModified')}:</strong> {formatDate(order.lastModifiedOnUtc)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">{t('orders.customer')}</h6>
              <div className="row">
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>{t('common.name')}:</strong> {order.customer?.name || '-'}
                  </p>
                  <p className="mb-2">
                    <strong>{t('common.email')}:</strong> {order.customer?.email || '-'}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>{t('common.phone')}:</strong> {order.customer?.phoneNumber || '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">{t('orders.shippingAddress')}</h6>
              <p className="mb-2">
                <strong>{t('common.name')}:</strong> {order.shippingAddress?.name || '-'}
              </p>
              <p className="mb-2">
                <strong>{t('common.email')}:</strong> {order.shippingAddress?.emailAddress || '-'}
              </p>
              <p className="mb-2">
                <strong>{t('common.address')}:</strong> {order.shippingAddress?.addressLine || '-'}
              </p>
              <p className="mb-2">
                <strong>{t('common.city')}:</strong> {order.shippingAddress?.state || '-'},{' '}
                {order.shippingAddress?.country || '-'}
              </p>
              <p className="mb-2">
                <strong>{t('common.zipCode')}:</strong> {order.shippingAddress?.zipCode || '-'}
              </p>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">{t('orders.orderItems')}</h6>
              {order.orderItems && order.orderItems.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>{t('product.name')}</th>
                        <th className="text-center">{t('common.quantity')}</th>
                        <th className="text-end">{t('common.price')}</th>
                        <th className="text-end">{t('common.total')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.productName || '-'}</td>
                          <td className="text-center">{item.quantity || 0}</td>
                          <td className="text-end">{formatCurrency(item.price)}</td>
                          <td className="text-end">{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted">{t('orders.noItems')}</p>
              )}
            </div>

            {/* Discount Info */}
            {order.discount && order.discount.couponCode && (
              <div className="mb-4">
                <h6 className="fw-bold mb-3">{t('orders.discount')}</h6>
                <p className="mb-2">
                  <strong>{t('checkout.couponCode')}:</strong> {order.discount.couponCode}
                </p>
                <p className="mb-2">
                  <strong>{t('checkout.discountAmount')}:</strong>{' '}
                  {formatCurrency(order.discount.discountAmount)}
                </p>
              </div>
            )}

            {/* Price Summary */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">{t('orders.priceSummary')}</h6>
              <div className="row">
                <div className="col-6">
                  <p className="mb-2">{t('common.subtotal')}:</p>
                </div>
                <div className="col-6 text-end">
                  <p className="mb-2">{formatCurrency(order.totalPrice)}</p>
                </div>
                {order.discount && order.discount.discountAmount > 0 && (
                  <>
                    <div className="col-6">
                      <p className="mb-2 text-success">{t('common.discount')}:</p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="mb-2 text-success">-{formatCurrency(order.discount.discountAmount)}</p>
                    </div>
                  </>
                )}
                <div className="col-12">
                  <hr />
                </div>
                <div className="col-6">
                  <p className="mb-0 fw-bold">{t('orders.finalPrice')}:</p>
                </div>
                <div className="col-6 text-end">
                  <p className="mb-0 fw-bold">{formatCurrency(order.finalPrice)}</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="mb-4">
                <h6 className="fw-bold mb-3">{t('orders.notes')}</h6>
                <p className="text-muted">{order.notes}</p>
              </div>
            )}

            {/* Cancel/Refund Reason */}
            {order.cancelReason && (
              <div className="mb-4">
                <h6 className="fw-bold mb-3">{t('orders.cancelReason')}</h6>
                <p className="text-muted">{order.cancelReason}</p>
              </div>
            )}
            {order.refundReason && (
              <div className="mb-4">
                <h6 className="fw-bold mb-3">{t('orders.refundReason')}</h6>
                <p className="text-muted">{order.refundReason}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-muted py-5">{t('orders.orderNotFound')}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          {t('common.close')}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailModal;

