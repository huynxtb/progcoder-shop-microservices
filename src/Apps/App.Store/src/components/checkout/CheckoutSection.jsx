import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { FarzaaContext } from '../../context/FarzaaContext';
import { discountService } from '../../services/discountService';
import { basketService } from '../../services/basketService';
import { formatCurrency } from '../../utils/format';
import { COUNTRIES, STATES } from '../../constants/countries';
import OrderSuccessModal from '../modal/OrderSuccessModal';

const CheckoutSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { subTotal, shipping, cartItems } = useContext(FarzaaContext);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNo, setOrderNo] = useState('');

  // Calculate prices
  const originalAmount = subTotal;
  const discountAmount = couponData?.discountAmount || 0;
  const finalAmount = couponData?.finalAmount || (originalAmount + shipping);

  // Validation schema with Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required(t('validation.required'))
      .min(2, t('validation.minLength', { min: 2 })),
    lastName: Yup.string()
      .required(t('validation.required'))
      .min(2, t('validation.minLength', { min: 2 })),
    email: Yup.string()
      .required(t('validation.required'))
      .email(t('validation.invalidEmail')),
    phoneNumber: Yup.string()
      .required(t('validation.required'))
      .matches(/^[0-9]{10,11}$/, t('validation.invalidPhone')),
    addressLine: Yup.string()
      .required(t('validation.required'))
      .min(5, t('validation.minLength', { min: 5 })),
    subdivision: Yup.string()
      .required(t('validation.required')),
    city: Yup.string()
      .required(t('validation.required')),
    stateOrProvince: Yup.string()
      .required(t('validation.required')),
    country: Yup.string()
      .required(t('validation.required')),
    postalCode: Yup.string()
      .required(t('validation.required')),
  });

  // Initial values
  const initialValues = {
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    addressLine: '',
    apartment: '',
    subdivision: '',
    city: '',
    stateOrProvince: '',
    country: 'Vietnam',
    postalCode: '',
    additionalInfo: '',
  };

  // Handle apply coupon
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError(t('checkout.couponRequired'));
      return;
    }

    try {
      setApplyingCoupon(true);
      setCouponError('');

      const response = await discountService.evaluateCoupon(couponCode, originalAmount);

      if (response?.data?.result) {
        setCouponData(response.data.result);
        setCouponApplied(true);
      }
    } catch (error) {
      console.error('Failed to apply coupon:', error);
      setCouponError(t('checkout.invalidCoupon'));
      setCouponData(null);
      setCouponApplied(false);
    } finally {
      setApplyingCoupon(false);
    }
  };

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setCouponCode('');
    setCouponApplied(false);
    setCouponData(null);
    setCouponError('');
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const checkoutData = {
        customer: {
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          phoneNumber: values.phoneNumber,
        },
        shippingAddress: {
          addressLine: values.addressLine + (values.apartment ? `, ${values.apartment}` : ''),
          subdivision: values.subdivision,
          city: values.city,
          stateOrProvince: values.stateOrProvince,
          country: values.country,
          postalCode: values.postalCode,
        },
        couponCode: couponApplied && couponData ? couponData.couponCode : null,
      };

      const response = await basketService.checkoutBasket(checkoutData);

      if (response) {
        // Success - show success modal with order number
        setOrderNo(response.data.result.orderNo || '');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Failed to checkout:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="container">
      <div className="fz-checkout">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="checkout-form">
              <div className="fz-billing-details">
                <div className="row gy-0 gx-3 gx-md-4">
                  <h3 className="fz-checkout-title">{t('checkout.billingDetails')}</h3>

                  <div className="col-6 col-xxs-12">
                    <input
                      type="text"
                      name="firstName"
                      id="checkout-first-name"
                      placeholder={t('common.firstName')}
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.firstName && errors.firstName ? 'error' : ''}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="error-message text-danger small mt-1">{errors.firstName}</div>
                    )}
                  </div>

                  <div className="col-6 col-xxs-12">
                    <input
                      type="text"
                      name="lastName"
                      id="checkout-last-name"
                      placeholder={t('common.lastName')}
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.lastName && errors.lastName ? 'error' : ''}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="error-message text-danger small mt-1">{errors.lastName}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      name="companyName"
                      id="checkout-company-name"
                      placeholder={t('checkout.companyName')}
                      value={values.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="col-12">
                    <Form.Select
                      className="country-select"
                      name="country"
                      id="checkout-country"
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country.value} value={country.value}>
                          {t(`countries.${country.key}`)}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  <div className="col-12" style={{ marginTop: '20px' }}>
                    <input
                      type="text"
                      name="addressLine"
                      id="checkout-house-street-number"
                      placeholder={t('checkout.houseStreetName')}
                      value={values.addressLine}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.addressLine && errors.addressLine ? 'error' : ''}
                    />
                    {touched.addressLine && errors.addressLine && (
                      <div className="error-message text-danger small mt-1">{errors.addressLine}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      name="apartment"
                      id="checkout-apartment-name"
                      placeholder={t('checkout.apartment')}
                      value={values.apartment}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="col-4 col-xxs-12">
                    <input
                      type="text"
                      name="subdivision"
                      id="checkout-subdivision"
                      placeholder={t('checkout.subdivision')}
                      value={values.subdivision}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.subdivision && errors.subdivision ? 'error' : ''}
                    />
                    {touched.subdivision && errors.subdivision && (
                      <div className="error-message text-danger small mt-1">{errors.subdivision}</div>
                    )}
                  </div>

                  <div className="col-4 col-xxs-12">
                    <input
                      type="text"
                      name="city"
                      id="checkout-city-name"
                      placeholder={t('common.city')}
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.city && errors.city ? 'error' : ''}
                    />
                    {touched.city && errors.city && (
                      <div className="error-message text-danger small mt-1">{errors.city}</div>
                    )}
                  </div>

                  <div className="col-4 col-xxs-12">
                    <input
                      type="text"
                      name="stateOrProvince"
                      id="checkout-state-or-province"
                      placeholder={t('checkout.stateOrProvince')}
                      value={values.stateOrProvince}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.stateOrProvince && errors.stateOrProvince ? 'error' : ''}
                    />
                    {touched.stateOrProvince && errors.stateOrProvince && (
                      <div className="error-message text-danger small mt-1">{errors.stateOrProvince}</div>
                    )}
                  </div>

                  <div className="col-6 col-xxs-12">
                    <input
                      type="text"
                      name="postalCode"
                      id="checkout-postal-code"
                      placeholder={t('checkout.postalCode')}
                      value={values.postalCode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.postalCode && errors.postalCode ? 'error' : ''}
                    />
                    {touched.postalCode && errors.postalCode && (
                      <div className="error-message text-danger small mt-1">{errors.postalCode}</div>
                    )}
                  </div>

                  <div className="col-6 col-xxs-12">
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="checkout-phone-number"
                      placeholder={t('common.phone')}
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.phoneNumber && errors.phoneNumber ? 'error' : ''}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <div className="error-message text-danger small mt-1">{errors.phoneNumber}</div>
                    )}
                  </div>

                  <div className="col-6 col-xxs-12">
                    <input
                      type="email"
                      name="email"
                      id="checkout-email-address"
                      placeholder={t('common.email')}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={touched.email && errors.email ? 'error' : ''}
                    />
                    {touched.email && errors.email && (
                      <div className="error-message text-danger small mt-1">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-12 additional-info">
                    <label htmlFor="checkout-additional-info" className="fz-checkout-title">
                      {t('checkout.additionalInformation')}
                    </label>
                    <textarea
                      name="additionalInfo"
                      id="checkout-additional-info"
                      placeholder={t('checkout.notesPlaceholder')}
                      value={values.additionalInfo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="fz-checkout-sidebar">
                <div className="billing-summery">
                  <h4 className="fz-checkout-title">{t('checkout.billingSummary')}</h4>
                  <div className="cart-checkout-area">
                    <ul className="checkout-summary">
                      <li>
                        <span className="checkout-summary__key">{t('common.subtotal')}</span>
                        <span className="checkout-summary__value">
                          {formatCurrency(originalAmount)}
                        </span>
                      </li>

                      <li>
                        <span className="checkout-summary__key">{t('common.shipping')}</span>
                        <span className="checkout-summary__value">
                          {formatCurrency(shipping)}
                        </span>
                      </li>

                      {/* Coupon Section */}
                      <li className="border-top pt-3" style={{ display: 'block' }}>
                        <span className="checkout-summary__key d-block mb-2">
                          {t('checkout.couponCode')}
                        </span>
                      </li>

                      <li style={{ display: 'block' }}>
                        <input
                          type="text"
                          className="w-100"
                          placeholder={t('checkout.enterCoupon')}
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          disabled={couponApplied}
                          style={{
                            padding: '10px 15px',
                            border: '1px solid #ddd',
                            borderRadius: '0',
                            fontSize: '14px'
                          }}
                        />
                      </li>

                      {couponError && (
                        <li style={{ display: 'block' }}>
                          <div className="text-danger small">{couponError}</div>
                        </li>
                      )}

                      {couponApplied && couponData && (
                        <li style={{ display: 'block' }}>
                          <div className="text-success small">
                            <i className="fa-regular fa-check-circle me-1"></i>
                            {t('checkout.couponApplied')}
                          </div>
                        </li>
                      )}

                      <li style={{ display: 'block' }}>
                        {!couponApplied ? (
                          <button
                            type="button"
                            className="fz-1-banner-btn cart-checkout-btn"
                            onClick={handleApplyCoupon}
                            disabled={applyingCoupon || !couponCode.trim()}
                          >
                            {applyingCoupon ? t('common.loading') : t('checkout.apply')}
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="fz-1-banner-btn cart-checkout-btn"
                            onClick={handleRemoveCoupon}
                            style={{ backgroundColor: '#dc3545' }}
                          >
                            {t('common.remove')}
                          </button>
                        )}
                      </li>

                      

                      {/* Discount display */}
                      {couponApplied && discountAmount > 0 && (
                        <li>
                          <span className="checkout-summary__key text-success">
                            {t('checkout.discountAmount')}
                          </span>
                          <span className="checkout-summary__value text-success">
                            -{formatCurrency(discountAmount)}
                          </span>
                        </li>
                      )}

                      <li className="cart-checkout-total">
                        <span className="checkout-summary__key">{t('common.total')}</span>
                        <span className="checkout-summary__value">
                          {formatCurrency(finalAmount)}
                        </span>
                      </li>
                    </ul>

                    <Link to="/cart" className="fz-1-banner-btn cart-checkout-btn">
                      {t('checkout.editOrder')}
                    </Link>
                  </div>
                </div>

                <div className="payment-info">
                  {/* <h4 className="fz-checkout-title">{t('checkout.paymentInformation')}</h4>
                  <div className="d-flex payment-area align-items-center">
                    <input
                      type="text"
                      name="payment-option"
                      id="checkout-payment-option"
                      placeholder="xxxx xxxx xxxx xxxx"
                    />
                    <i className="fa-light fa-credit-card"></i>
                  </div>
                  <p className="checkout-payment-descr">
                    {t('checkout.privacyPolicy')}
                  </p> */}
                  <button
                    type="submit"
                    className="fz-1-banner-btn cart-checkout-btn checkout-form-btn"
                    disabled={isSubmitting || cartItems.length === 0}
                  >
                    {isSubmitting ? t('common.loading') : t('checkout.placeOrder')}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Success Modal */}
      <OrderSuccessModal 
        show={showSuccessModal}
        onClose={handleCloseSuccessModal}
        orderNo={orderNo}
      />
    </div>
  );
};

export default CheckoutSection;
