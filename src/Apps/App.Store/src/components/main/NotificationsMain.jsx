import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import BreadcrumbSection from '../breadcrumb/BreadcrumbSection';
import { notificationService } from '../../services/notificationService';

const NotificationsMain = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getAll();
      if (response?.data?.result?.notifications) {
        setNotifications(response.data.result.notifications);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

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

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await notificationService.markAsRead([notification.id]);
        // Refresh notifications
        await fetchNotifications();
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }

    // Navigate if targetUrl exists
    if (notification.targetUrl) {
      navigate(notification.targetUrl);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const unreadIds = notifications
        .filter((n) => !n.isRead)
        .map((n) => n.id);
      
      if (unreadIds.length > 0) {
        await notificationService.markAsRead(unreadIds);
        await fetchNotifications();
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  return (
    <>
      <BreadcrumbSection title={t('notification.title')} current={t('notification.title')} />
      
      <section className="fz-inner-page-section">
        <div className="container">
          <div className="row gy-4 gy-lg-0 justify-content-center">
            <div className="col-12">
              <div className="fz-cart-area">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="fz-cart-area__heading">{t('notification.allNotifications')}</h3>
                  <button
                    className="fz-1-banner-btn"
                    onClick={handleMarkAllAsRead}
                    disabled={loading || !notifications.some((n) => !n.isRead)}
                  >
                    <i className="fa-regular fa-check-double me-2"></i>
                    {t('notification.markAllAsRead')}
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">{t('common.loading')}</span>
                    </div>
                    <p className="mt-3 text-muted">{t('common.loading')}</p>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fa-regular fa-bell-slash mb-3 d-block" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                    <p className="text-muted">{t('notification.noNotifications')}</p>
                  </div>
                ) : (
                  <div className="notifications-list">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-item p-4 mb-3 border rounded ${
                          !notification.isRead ? 'bg-light' : 'bg-white'
                        }`}
                        style={{ cursor: notification.targetUrl ? 'pointer' : 'default' }}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div
                              className={`rounded-circle d-flex align-items-center justify-content-center ${
                                !notification.isRead ? 'bg-primary' : 'bg-secondary'
                              }`}
                              style={{ width: '50px', height: '50px' }}
                            >
                              <i className="fa-regular fa-bell text-white"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h5 className="mb-0">{notification.title}</h5>
                              {!notification.isRead && (
                                <span className="badge bg-danger ms-2">{t('notification.new')}</span>
                              )}
                            </div>
                            <p className="mb-2 text-muted">{notification.message}</p>
                            <small className="text-muted">
                              <i className="fa-regular fa-clock me-1"></i>
                              {formatDate(notification.createdOnUtc)}
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotificationsMain;

