import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationService } from '../../services/notificationService';

const Notification = () => {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const countRes = await notificationService.getUnreadCount();
      if (countRes?.data?.result?.count !== undefined) {
        setUnreadCount(countRes.data.result.count);
      }
    } catch (error) {
      console.error('Failed to fetch notification count:', error);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    
    // Refresh count every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  return (
    <button
      className="fz-header-notification-btn d-none d-lg-block"
      onClick={handleNotificationClick}
    >
      <i className="fa-light fa-bell"></i>
      {unreadCount > 0 && (
        <span className="count">{unreadCount > 99 ? '99+' : unreadCount}</span>
      )}
    </button>
  );
};

export default Notification;

