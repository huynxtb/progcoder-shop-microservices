import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection';
import OrdersTable from '../orders/OrdersTable';
import { orderService } from '../../services/orderService';

const MyOrdersMain = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllMyOrders();
      if (response?.data?.result?.items) {
        setOrders(response.data.result.items);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    fetchOrders();
  };

  return (
    <>
      <BreadcrumbSection title={t('orders.title')} current={t('orders.title')} />
      
      <section className="fz-inner-page-section">
        <div className="container">
          <div className="row gy-4 gy-lg-0 justify-content-center">
            <div className="col-12">
              <div className="fz-cart-area">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fz-cart-area__heading">{t('orders.myOrders')}</h3>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleRefresh}
                    disabled={loading}
                  >
                    <i className={`fa-regular fa-rotate-right ${loading ? 'fa-spin' : ''} me-1`}></i>
                    {t('orders.refresh')}
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">{t('common.loading')}</span>
                    </div>
                    <p className="mt-3 text-muted">{t('common.loading')}</p>
                  </div>
                ) : (
                  <OrdersTable orders={orders} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrdersMain;

