import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import Flatpickr from "react-flatpickr";
import Icon from "@/components/ui/Icon";
import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import LoaderCircle from "@/components/Loader-circle";

const EditCoupon = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [code, setCode] = useState("");

  // Yup validation schema
  const validationSchema = Yup.object({
    description: Yup.string()
      .trim()
      .required(t("editCoupon.descriptionRequired")),
    discountType: Yup.string().required(),
    discountValue: Yup.number()
      .typeError(t("editCoupon.discountValueRequired"))
      .positive(t("editCoupon.discountValueRequired"))
      .required(t("editCoupon.discountValueRequired"))
      .test(
        "max-percent",
        t("editCoupon.percentMaxError"),
        function (value) {
          if (this.parent.discountType === "percent" && value > 100) {
            return false;
          }
          return true;
        }
      ),
    minOrder: Yup.number()
      .typeError(t("validation.mustBeNumber"))
      .positive(t("validation.mustBePositive"))
      .nullable(),
    maxDiscount: Yup.number()
      .typeError(t("validation.mustBeNumber"))
      .positive(t("validation.mustBePositive"))
      .nullable(),
    usageLimit: Yup.number()
      .typeError(t("validation.mustBeNumber"))
      .positive(t("validation.mustBePositive"))
      .nullable()
      .test(
        "required-if-limit",
        t("editCoupon.usageLimitRequired"),
        function (value) {
          if (this.parent.hasUsageLimit && (!value || value <= 0)) {
            return false;
          }
          return true;
        }
      ),
  });

  const discountTypeOptions = [
    { value: "percent", label: t("createCoupon.percentType") },
    { value: "fixed", label: t("createCoupon.fixedType") },
  ];

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      discountType: "percent",
      discountValue: "",
      minOrder: "",
      maxDiscount: "",
      usageLimit: "",
      perCustomer: "1",
      hasUsageLimit: false,
      startDate: new Date(),
      endDate: new Date(),
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);

        // Map form values to DTO format
        const dto = {
          name: values.name.trim(),
          description: values.description.trim(),
          type: values.discountType === "percent" ? 2 : 1, // 1=Fixed, 2=Percentage
          value: parseFloat(values.discountValue),
          maxUsage: values.hasUsageLimit ? parseInt(values.usageLimit) : 1000,
          maxDiscountAmount: values.discountType === "percent" && values.maxDiscount ? parseFloat(values.maxDiscount) : null,
          minPurchaseAmount: values.minOrder ? parseFloat(values.minOrder) : null,
        };

        const response = await api.put(API_ENDPOINTS.DISCOUNT.UPDATE(id), dto);

        if (response && response.status >= 200 && response.status < 300) {
          toast.success(t("editCoupon.updateSuccess"), {
            position: "top-right",
            autoClose: 5000,
          });

          navigate("/coupons");
        }
      } catch (error) {
        console.error("Failed to update coupon:", error);
        toast.error(
          error.response?.data?.message || t("editCoupon.updateError"),
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Load coupon data from API
  useEffect(() => {
    const fetchCoupon = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await api.get(API_ENDPOINTS.DISCOUNT.GET_DETAIL(id));
        const couponData = response.data.result.coupon;

        // Map API response to form values
        setCode(couponData.code || "");
        
        // Use resetForm instead of setValues to avoid reinitialize issues
        formik.resetForm({
          values: {
            name: couponData.name || "",
            description: couponData.description || "",
            discountType: couponData.type === 1 ? "fixed" : "percent",
            discountValue: couponData.value?.toString() || "",
            minOrder: couponData.minPurchaseAmount?.toString() || "",
            maxDiscount: couponData.maxDiscountAmount?.toString() || "",
            usageLimit: couponData.maxUsage?.toString() || "",
            perCustomer: "1",
            hasUsageLimit: !!couponData.maxUsage,
            startDate: couponData.validFrom ? new Date(couponData.validFrom) : new Date(),
            endDate: couponData.validTo ? new Date(couponData.validTo) : new Date(),
          },
        });
      } catch (error) {
        console.error("Failed to fetch coupon:", error);
        toast.error(t("editCoupon.fetchError"), {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Helper function to check if field has error
  const hasError = (field) => formik.touched[field] && formik.errors[field];

  const handleDiscountTypeChange = (e) => {
    formik.setFieldValue("discountType", e.target.value);
    // Clear max discount when switching to fixed
    if (e.target.value === "fixed") {
      formik.setFieldValue("maxDiscount", "");
    }
  };

  if (loading) {
    return <LoaderCircle />;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center">
        <h4 className="text-xl font-medium text-slate-900 dark:text-white">
          {t("editCoupon.title")} #{id}
        </h4>
        <Link to="/coupons" className="btn btn-outline-dark btn-sm inline-flex items-center">
          <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
          {t("editCoupon.back")}
        </Link>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-8">
            <Card title={t("editCoupon.couponInfo")} className="mb-5">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">{t("editCoupon.code")}</label>
                    <Textinput
                      id="code"
                      type="text"
                      placeholder={t("editCoupon.codePlaceholder")}
                      value={code}
                      disabled
                      className="bg-slate-100 dark:bg-slate-700 cursor-not-allowed"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      {t("editCoupon.codeDesc")} ({t("common.cannotEdit")})
                    </p>
                  </div>
                  <div>
                    <Textinput
                      label={t("editCoupon.programName")}
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t("editCoupon.programNamePlaceholder")}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {t("editCoupon.description")}
                  </label>
                  <textarea
                    className={`form-control ${hasError("description") ? "border-danger-500" : ""}`}
                    rows={3}
                    placeholder={t("editCoupon.descriptionPlaceholder")}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {hasError("description") && (
                    <p className="text-danger-500 text-sm mt-1">{formik.errors.description}</p>
                  )}
                </div>
              </div>
            </Card>

            <Card title={t("editCoupon.discountConfig")} className="mb-5">
              <div className="space-y-4">
                <Select
                  label={t("editCoupon.discountType")}
                  options={discountTypeOptions}
                  onChange={handleDiscountTypeChange}
                  value={formik.values.discountType}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">
                      {formik.values.discountType === "percent"
                        ? t("editCoupon.discountValuePercent")
                        : t("editCoupon.discountValueFixed")}
                    </label>
                    <Textinput
                      id="discountValue"
                      name="discountValue"
                      type="number"
                      placeholder={formik.values.discountType === "percent" ? "10" : "50000"}
                      value={formik.values.discountValue}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={hasError("discountValue") ? "border-danger-500" : ""}
                    />
                    {hasError("discountValue") && (
                      <p className="text-danger-500 text-sm mt-1">{formik.errors.discountValue}</p>
                    )}
                  </div>
                  <div>
                    <label className="form-label">{t("editCoupon.minOrder")}</label>
                    <Textinput
                      id="minOrder"
                      name="minOrder"
                      type="number"
                      placeholder="100000"
                      value={formik.values.minOrder}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={hasError("minOrder") ? "border-danger-500" : ""}
                    />
                    {hasError("minOrder") && (
                      <p className="text-danger-500 text-sm mt-1">{formik.errors.minOrder}</p>
                    )}
                  </div>
                </div>

                {formik.values.discountType === "percent" && (
                  <div>
                    <label className="form-label">{t("editCoupon.maxDiscount")}</label>
                    <Textinput
                      id="maxDiscount"
                      name="maxDiscount"
                      type="number"
                      placeholder="200000"
                      value={formik.values.maxDiscount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={hasError("maxDiscount") ? "border-danger-500" : ""}
                    />
                    {hasError("maxDiscount") && (
                      <p className="text-danger-500 text-sm mt-1">{formik.errors.maxDiscount}</p>
                    )}
                  </div>
                )}
              </div>
            </Card>

            <Card title={t("editCoupon.duration")} className="mb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {t("editCoupon.startDate")}
                  </label>
                  <Flatpickr
                    className="form-control py-2"
                    value={formik.values.startDate}
                    onChange={([date]) => formik.setFieldValue("startDate", date)}
                    options={{
                      dateFormat: "d/m/Y",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                    {t("editCoupon.endDate")}
                  </label>
                  <Flatpickr
                    className="form-control py-2"
                    value={formik.values.endDate}
                    onChange={([date]) => formik.setFieldValue("endDate", date)}
                    options={{
                      dateFormat: "d/m/Y",
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <Card title={t("editCoupon.usageLimit")} className="mb-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {t("editCoupon.limitUsage")}
                  </label>
                  <Switch
                    activeClass="bg-primary-500"
                    value={formik.values.hasUsageLimit}
                    onChange={(val) => formik.setFieldValue("hasUsageLimit", val)}
                  />
                </div>
                {formik.values.hasUsageLimit && (
                  <div>
                    <label className="form-label">{t("editCoupon.maxUsage")}</label>
                    <Textinput
                      id="usageLimit"
                      name="usageLimit"
                      type="number"
                      placeholder="100"
                      value={formik.values.usageLimit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={hasError("usageLimit") ? "border-danger-500" : ""}
                    />
                    {hasError("usageLimit") && (
                      <p className="text-danger-500 text-sm mt-1">{formik.errors.usageLimit}</p>
                    )}
                  </div>
                )}

                {/* <div>
                  <label className="form-label">{t("editCoupon.perCustomer")}</label>
                  <Textinput
                    id="perCustomer"
                    name="perCustomer"
                    type="number"
                    placeholder="1"
                    value={formik.values.perCustomer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {t("editCoupon.perCustomerDesc")}
                  </p>
                </div> */}
              </div>
            </Card>


            <Card title={t("editCoupon.summary")} className="mb-5">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("editCoupon.discountTypeLabel")}</span>
                  <span className="font-medium">
                    {formik.values.discountType === "percent" ? t("coupon.percent") : t("coupon.fixed")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("editCoupon.startDateLabel")}</span>
                  <span className="font-medium">
                    {formik.values.startDate?.toLocaleDateString?.("vi-VN") || "-"}
                  </span>
                </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("editCoupon.endDateLabel")}</span>
                <span className="font-medium">
                  {formik.values.endDate?.toLocaleDateString?.("vi-VN") || "-"}
                </span>
              </div>
              </div>
            </Card>

            <div className="flex flex-col space-y-3">
              <button
                type="submit"
                className="btn btn-dark w-full inline-flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Icon icon="heroicons:arrow-path" className="ltr:mr-2 rtl:ml-2 animate-spin" />
                    {t("common.loading")}
                  </>
                ) : (
                  <>
                    <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
                    {t("editCoupon.updateCoupon")}
                  </>
                )}
              </button>
              <Link
                to="/coupons"
                className="btn btn-outline-dark w-full inline-flex items-center justify-center"
              >
                <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
                {t("editCoupon.back")}
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCoupon;
