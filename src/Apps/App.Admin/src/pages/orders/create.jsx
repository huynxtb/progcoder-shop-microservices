import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { orderService } from "@/services/orderService";

const CreateOrder = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderItems, setOrderItems] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const response = await api.get(API_ENDPOINTS.CATALOG.GET_ALL_PRODUCTS);
        if (response.data && response.data.result && response.data.result.items) {
          setProducts(response.data.result.items);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Validation schema
  const validationSchema = Yup.object({
    customerName: Yup.string().trim().required(t("validation.required")),
    customerEmail: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.required")),
    customerPhoneNumber: Yup.string().required(t("validation.required")),
    shippingName: Yup.string().trim().required(t("validation.required")),
    shippingEmailAddress: Yup.string().email(t("validation.invalidEmail")).nullable(),
    shippingAddressLine: Yup.string().trim().required(t("validation.required")),
    shippingCountry: Yup.string().trim().required(t("validation.required")),
    shippingState: Yup.string().trim().required(t("validation.required")),
    shippingZipCode: Yup.string().trim().required(t("validation.required")),
    couponCode: Yup.string().nullable(),
    notes: Yup.string().nullable(),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      customerId: "",
      customerName: "",
      customerEmail: "",
      customerPhoneNumber: "",
      shippingName: "",
      shippingEmailAddress: "",
      shippingAddressLine: "",
      shippingCountry: "",
      shippingState: "",
      shippingZipCode: "",
      couponCode: "",
      notes: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (orderItems.length === 0) {
        toast.error(t("orders.orderItemsRequired"));
        return;
      }

      setIsSubmitting(true);

      try {
        const orderData = {
          basketId: null,
          customer: {
            id: values.customerId || null,
            name: values.customerName,
            email: values.customerEmail,
            phoneNumber: values.customerPhoneNumber,
          },
          shippingAddress: {
            name: values.shippingName,
            emailAddress: values.shippingEmailAddress || null,
            addressLine: values.shippingAddressLine,
            country: values.shippingCountry,
            state: values.shippingState,
            zipCode: values.shippingZipCode,
          },
          orderItems: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          couponCode: values.couponCode || "",
          notes: values.notes || null,
        };

        console.log("Creating order with data:", orderData);
        const response = await orderService.createOrder(orderData);
        console.log("Create order API response:", response);
        if (response.data && (response.data.value || response.data)) {
          toast.success(t("orders.createSuccess"));
          navigate("/orders");
        }
      } catch (error) {
        console.error("Failed to create order:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const addOrderItem = () => {
    setOrderItems([
      ...orderItems,
      {
        productId: "",
        quantity: 1,
      },
    ]);
  };

  const removeOrderItem = (index) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const updateOrderItem = (index, field, value) => {
    const updated = [...orderItems];
    updated[index] = { ...updated[index], [field]: value };
    setOrderItems(updated);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h4 className="text-xl font-medium text-slate-900 dark:text-white">
            {t("orders.createNew")}
          </h4>
        </div>
        <Link to="/orders" className="btn btn-outline-dark btn-sm inline-flex items-center">
          <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
          {t("common.back")}
        </Link>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-12 gap-5">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8 space-y-5">
            {/* Customer Information */}
            <Card title={t("orders.customerInfo")}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {t("orders.customerId")} ({t("common.optional")})
                  </label>
                  <Textinput
                    type="text"
                    placeholder={t("orders.customerIdPlaceholder")}
                    value={formik.values.customerId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="customerId"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {t("orders.customerName")} <span className="text-danger-500">*</span>
                  </label>
                  <Textinput
                    type="text"
                    placeholder={t("orders.customerNamePlaceholder")}
                    value={formik.values.customerName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="customerName"
                    error={formik.touched.customerName && formik.errors.customerName}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                      {t("orders.customerEmail")} <span className="text-danger-500">*</span>
                    </label>
                    <Textinput
                      type="email"
                      placeholder={t("orders.customerEmailPlaceholder")}
                      value={formik.values.customerEmail}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="customerEmail"
                      error={formik.touched.customerEmail && formik.errors.customerEmail}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                      {t("orders.customerPhone")} <span className="text-danger-500">*</span>
                    </label>
                    <Textinput
                      type="tel"
                      placeholder={t("orders.customerPhonePlaceholder")}
                      value={formik.values.customerPhoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="customerPhoneNumber"
                      error={
                        formik.touched.customerPhoneNumber && formik.errors.customerPhoneNumber
                      }
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Shipping Address */}
            <Card title={t("orders.shippingAddress")}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {t("orders.shippingName")} <span className="text-danger-500">*</span>
                  </label>
                  <Textinput
                    type="text"
                    placeholder={t("orders.shippingNamePlaceholder")}
                    value={formik.values.shippingName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="shippingName"
                    error={formik.touched.shippingName && formik.errors.shippingName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {t("orders.shippingEmail")} ({t("common.optional")})
                  </label>
                  <Textinput
                    type="email"
                    placeholder={t("orders.shippingEmailPlaceholder")}
                    value={formik.values.shippingEmailAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="shippingEmailAddress"
                    error={
                      formik.touched.shippingEmailAddress && formik.errors.shippingEmailAddress
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {t("orders.addressLine")} <span className="text-danger-500">*</span>
                  </label>
                  <Textarea
                    rows={3}
                    placeholder={t("orders.addressLinePlaceholder")}
                    value={formik.values.shippingAddressLine}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="shippingAddressLine"
                    error={
                      formik.touched.shippingAddressLine && formik.errors.shippingAddressLine
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                      {t("orders.country")} <span className="text-danger-500">*</span>
                    </label>
                    <Textinput
                      type="text"
                      placeholder={t("orders.countryPlaceholder")}
                      value={formik.values.shippingCountry}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="shippingCountry"
                      error={formik.touched.shippingCountry && formik.errors.shippingCountry}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                      {t("orders.state")} <span className="text-danger-500">*</span>
                    </label>
                    <Textinput
                      type="text"
                      placeholder={t("orders.statePlaceholder")}
                      value={formik.values.shippingState}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="shippingState"
                      error={formik.touched.shippingState && formik.errors.shippingState}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                      {t("orders.zipCode")} <span className="text-danger-500">*</span>
                    </label>
                    <Textinput
                      type="text"
                      placeholder={t("orders.zipCodePlaceholder")}
                      value={formik.values.shippingZipCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="shippingZipCode"
                      error={formik.touched.shippingZipCode && formik.errors.shippingZipCode}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Items */}
            <Card title={t("orders.orderItems")}>
              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4 items-end p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                        {t("orders.product")} <span className="text-danger-500">*</span>
                      </label>
                      <Select
                        value={item.productId}
                        onChange={(e) => updateOrderItem(index, "productId", e.target.value)}
                        options={[
                          { value: "", label: t("orders.selectProduct") },
                          ...products.map((p) => ({
                            value: p.id,
                            label: `${p.name} (${p.sku || ""})`,
                          })),
                        ]}
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                        {t("orders.quantity")} <span className="text-danger-500">*</span>
                      </label>
                      <Textinput
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateOrderItem(index, "quantity", parseInt(e.target.value) || 1)
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeOrderItem(index)}
                      className="btn btn-danger btn-sm"
                    >
                      <Icon icon="heroicons:trash" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addOrderItem}
                  className="btn btn-outline-primary btn-sm inline-flex items-center"
                >
                  <Icon icon="heroicons:plus" className="ltr:mr-2 rtl:ml-2" />
                  {t("orders.addItem")}
                </button>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            {/* Coupon Code */}
            <Card title={t("orders.couponCode")}>
              <div>
                <Textinput
                  type="text"
                  placeholder={t("orders.couponCodePlaceholder")}
                  value={formik.values.couponCode}
                  onChange={formik.handleChange}
                  name="couponCode"
                />
              </div>
            </Card>

            {/* Notes */}
            <Card title={t("orders.notes")}>
              <div>
                <Textarea
                  rows={6}
                  placeholder={t("orders.notesPlaceholder")}
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  name="notes"
                />
              </div>
            </Card>

            {/* Submit Button */}
            <Card>
              <div className="space-y-3">
                <Button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                      {t("common.creating")}
                    </>
                  ) : (
                    <>
                      <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
                      {t("orders.createOrder")}
                    </>
                  )}
                </Button>
                <Link
                  to="/orders"
                  className="btn btn-outline-dark w-full inline-flex items-center justify-center"
                >
                  {t("common.cancel")}
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;

