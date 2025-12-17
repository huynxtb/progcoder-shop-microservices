import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './OrderSuccessModal.css';

const OrderSuccessModal = ({ show, onClose, orderNo }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setIsAnimating(true);
    }
  }, [show]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
      navigate('/my-orders');
    }, 300);
  };

  if (!show) return null;

  return (
    <div className={`order-success-overlay ${isAnimating ? 'show' : ''}`} onClick={handleClose}>
      <div 
        className={`order-success-modal ${isAnimating ? 'show' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon with Animation */}
        <div className="success-icon-wrapper">
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="success-content">
          <h2 className="success-title">{t('checkout.orderSuccess')}</h2>
          <p className="success-message">{t('checkout.orderSuccessMessage')}</p>
          
          {orderNo && (
            <div className="order-number">
              <span className="order-label">{t('orders.orderNo')}:</span>
              <span className="order-value">{orderNo}</span>
            </div>
          )}

          <p className="success-note">{t('checkout.orderSuccessNote')}</p>
        </div>

        {/* Action Button */}
        <button 
          className="success-btn"
          onClick={handleClose}
        >
          <span>{t('checkout.viewMyOrders')}</span>
          <i className="fa-regular fa-arrow-right ms-2"></i>
        </button>

        {/* Close Icon */}
        <button className="modal-close-btn" onClick={handleClose}>
          <i className="fa-regular fa-xmark"></i>
        </button>

        {/* Decorative Elements */}
        <div className="confetti-wrapper">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`confetti confetti-${i}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;

