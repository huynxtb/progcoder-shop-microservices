import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import LoaderCircle from "@/components/Loader-circle";
import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { orderService } from "@/services/orderService";

const EditOrder = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(true);
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

  // Fetch order data
  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      try {
        setLoadingOrder(true);
        console.log("Fetching order for edit, ID:", id);
        const response = await orderService.getOrderById(id);
        console.log("Get order for edit API response:", response);
        if (response.data && response.data.result && response.data.result.order) {
          const order = response.data.result.order;
          
          // Set form values
          // Handle backward compatibility: combine ward and district if exists, otherwise use subdivision
          const subdivision = order.shippingAddress?.subdivision || 
            (order.shippingAddress?.ward && order.shippingAddress?.district 
              ? `${order.shippingAddress.ward}, ${order.shippingAddress.district}`
              : order.shippingAddress?.ward || order.shippingAddress?.district || "");
          
          formik.setValues({
            customerName: order.customer?.name || "",
            customerEmail: order.customer?.email || "",
            customerPhoneNumber: order.customer?.phoneNumber || "",
            shippingAddressLine: order.shippingAddress?.addressLine || "",
            shippingSubdivision: subdivision,
            shippingCity: order.shippingAddress?.city || "",
            shippingStateOrProvince: order.shippingAddress?.stateOrProvince || order.shippingAddress?.state || "",
            shippingCountry: order.shippingAddress?.country || "",
            shippingPostalCode: order.shippingAddress?.postalCode || order.shippingAddress?.zipCode || "",
            couponCode: order.discount?.couponCode || "",
            notes: order.notes || "",
          });

          // Set order items
          if (order.orderItems && Array.isArray(order.orderItems)) {
            setOrderItems(
              order.orderItems.map((item) => ({
                productId: item.product?.id || item.productId || "",
                quantity: item.quantity || 1,
              }))
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      } finally {
        setLoadingOrder(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Validation schema
  const validationSchema = Yup.object({
    customerName: Yup.string().trim().required(t("validation.required")),
    customerEmail: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.required")),
    customerPhoneNumber: Yup.string().required(t("validation.required")),
    shippingAddressLine: Yup.string().trim().required(t("validation.required")),
    shippingSubdivision: Yup.string().trim().required(t("validation.required")),
    shippingCity: Yup.string().trim().required(t("validation.required")),
    shippingStateOrProvince: Yup.string().trim().required(t("validation.required")),
    shippingCountry: Yup.string().trim().required(t("validation.required")),
    shippingPostalCode: Yup.string().trim().required(t("validation.required")),
    couponCode: Yup.string().nullable(),
    notes: Yup.string().nullable(),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerEmail: "",
      customerPhoneNumber: "",
      shippingAddressLine: "",
      shippingSubdivision: "",
      shippingCity: "",
      shippingStateOrProvince: "",
      shippingCountry: "",
      shippingPostalCode: "",
      couponCode: "",
      notes: "",
    },
    validationSchema,
    enableReinitialize: true,
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
            id: null,
            name: values.customerName,
            email: values.customerEmail,
            phoneNumber: values.customerPhoneNumber,
          },
          shippingAddress: {
            addressLine: values.shippingAddressLine,
            subdivision: values.shippingSubdivision,
            city: values.shippingCity,
            stateOrProvince: values.shippingStateOrProvince,
            country: values.shippingCountry,
            postalCode: values.shippingPostalCode,
          },
          orderItems: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          couponCode: values.couponCode || "",
          notes: values.notes || null,
        };

        console.log("Updating order, ID:", id, "Data:", orderData);
        const response = await orderService.updateOrder(id, orderData);
        console.log("Update order API response:", response);
        if (response.data && (response.data.value || response.data)) {
          toast.success(t("orders.updateSuccess"));
          navigate(`/orders/${id}`);
        }
      } catch (error) {
        console.error("Failed to update order:", error);
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

  if (loadingOrder) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoaderCircle />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h4 className="text-xl font-medium text-slate-900 dark:text-white">
            {t("orders.editOrder")}
          </h4>
        </div>
        <div className="flex gap-3">
          <Link
            to={`/orders/${id}`}
            className="btn btn-outline-dark btn-sm inline-flex items-center"
          >
            <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
            {t("common.back")}
          </Link>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Customer Information */}
          <Card title={t("orders.customerInfo")}>
            <div className="space-y-4">
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
          </Card>

          {/* Shipping Address */}
          <Card title={t("orders.shippingAddress")}>
            <div className="space-y-4">
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
                    {t("orders.subdivision")} <span className="text-danger-500">*</span>
                  </label>
                  <Textinput
                    type="text"
                    placeholder={t("orders.subdivisionPlaceholder")}
                    value={formik.values.shippingSubdivision}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="shippingSubdivision"
                    error={formik.touched.shippingSubdivision && formik.errors.shippingSubdivision}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {t("orders.city")} <span className="text-danger-500">*</span>
                  </label>
                  <Textinput
                    type="text"
                    placeholder={t("orders.cityPlaceholder")}
                    value={formik.values.shippingCity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="shippingCity"
                    error={formik.touched.shippingCity && formik.errors.shippingCity}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {t("orders.stateOrProvince")} <span className="text-danger-500">*</span>
                  </label>
                  <Textinput
                    type="text"
                    placeholder={t("orders.stateOrProvincePlaceholder")}
                    value={formik.values.shippingStateOrProvince}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="shippingStateOrProvince"
                    error={formik.touched.shippingStateOrProvince && formik.errors.shippingStateOrProvince}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {t("orders.postalCode")} <span className="text-danger-500">*</span>
                  </label>
                  <Textinput
                    type="text"
                    placeholder={t("orders.postalCodePlaceholder")}
                    value={formik.values.shippingPostalCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="shippingPostalCode"
                    error={formik.touched.shippingPostalCode && formik.errors.shippingPostalCode}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Order Items - Full Width */}
          <Card title={t("orders.orderItems")} className="lg:col-span-2">
            <div className="space-y-4">
              {orderItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-end p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
                >
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

          {/* Coupon Code & Notes - 2 Columns */}
          <Card title={t("orders.couponCode")}>
            <div>
              <Textinput
                type="text"
                placeholder={t("orders.couponCodePlaceholder")}
                value={formik.values.couponCode}
                onChange={formik.handleChange}
                name="couponCode"
                disabled={true}
              />
            </div>
          </Card>

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

        </div>

        {/* Submit Buttons */}
        <div className="flex flex-wrap justify-end gap-3 mt-5">
          <Link
            to={`/orders/${id}`}
            className="btn btn-outline-dark btn-sm inline-flex items-center"
          >
            {t("common.cancel")}
          </Link>
          <Button
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                {t("common.updating")}
              </>
            ) : (
              <>
                <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
                {t("orders.updateOrder")}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;

