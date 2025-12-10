import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const CreateCoupon = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discountTypeOptions = [
    { value: "percent", label: t("createCoupon.percentType") },
    { value: "fixed", label: t("createCoupon.fixedType") },
  ];

  // Yup validation schema
  const validationSchema = Yup.object({
    code: Yup.string()
      .trim()
      .required(t("createCoupon.codeRequired")),
    description: Yup.string()
      .trim()
      .required(t("createCoupon.descriptionRequired")),
    discountType: Yup.string().required(),
    discountValue: Yup.number()
      .typeError(t("createCoupon.discountValueRequired"))
      .positive(t("createCoupon.discountValueRequired"))
      .required(t("createCoupon.discountValueRequired"))
      .test(
        "max-percent",
        t("createCoupon.percentMaxError"),
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
      .nullable()
      .test(
        "required-if-percent",
        t("createCoupon.discountValueRequired"),
        function (value) {
          if (this.parent.hasMaxDiscount && this.parent.discountType === "percent" && !value) {
            return false;
          }
          return true;
        }
      ),
    usageLimit: Yup.number()
      .typeError(t("validation.mustBeNumber"))
      .positive(t("validation.mustBePositive"))
      .nullable()
      .test(
        "required-if-limit",
        t("createCoupon.usageLimitRequired"),
        function (value) {
          if (this.parent.hasUsageLimit && (!value || value <= 0)) {
            return false;
          }
          return true;
        }
      ),
    startDate: Yup.date().required(),
    endDate: Yup.date()
      .required()
      .test(
        "after-start",
        t("createCoupon.dateError"),
        function (value) {
          if (this.parent.startDate && value <= this.parent.startDate) {
            return false;
          }
          return true;
        }
      ),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      description: "",
      discountType: "percent",
      discountValue: "",
      minOrder: "",
      maxDiscount: "",
      hasUsageLimit: false,
      usageLimit: "",
      startDate: new Date(),
      endDate: new Date(),
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);

        // Map form values to DTO format
        const dto = {
          code: values.code.trim().toUpperCase(),
          name: values.name.trim(),
          description: values.description.trim(),
          type: values.discountType === "percent" ? 2 : 1, // 1=Fixed, 2=Percentage
          value: parseFloat(values.discountValue),
          maxUsage: values.hasUsageLimit ? parseInt(values.usageLimit) : 1000, // Default to 1000 if no limit
          maxDiscountAmount: values.discountType === "percent" && values.maxDiscount ? parseFloat(values.maxDiscount) : null,
          minPurchaseAmount: values.minOrder ? parseFloat(values.minOrder) : null,
          validFrom: values.startDate.toISOString(),
          validTo: values.endDate.toISOString(),
        };

        const response = await api.post(API_ENDPOINTS.DISCOUNT.CREATE, dto);

        if (response && response.status >= 200 && response.status < 300) {
          toast.success(t("createCoupon.createSuccess"), {
            position: "top-right",
            autoClose: 5000,
          });

          navigate("/coupons");
        }
      } catch (error) {
        console.error("Failed to create coupon:", error);
        toast.error(
          error.response?.data?.message || t("createCoupon.createError"),
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

  // Helper function to check if field has error
  const hasError = (field) => formik.touched[field] && formik.errors[field];

  const handleDiscountTypeChange = (e) => {
    formik.setFieldValue("discountType", e.target.value);
    // Clear max discount when switching to fixed
    if (e.target.value === "fixed") {
      formik.setFieldValue("maxDiscount", "");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <Card title={t("createCoupon.couponInfo")} className="mb-5">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Textinput
                    label={t("createCoupon.code")}
                    id="code"
                    name="code"
                    type="text"
                    placeholder={t("createCoupon.codePlaceholder")}
                    description={t("createCoupon.codeDesc")}
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={hasError("code") ? "border-danger-500" : ""}
                  />
                  {hasError("code") && (
                    <p className="text-danger-500 text-sm mt-1">{formik.errors.code}</p>
                  )}
                </div>
                <div>
                  <Textinput
                    label={t("createCoupon.programName")}
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("createCoupon.programNamePlaceholder")}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  {t("createCoupon.description")}
                </label>
                <textarea
                  className={`form-control ${hasError("description") ? "border-danger-500" : ""}`}
                  rows={3}
                  placeholder={t("createCoupon.descriptionPlaceholder")}
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

          <Card title={t("createCoupon.discountConfig")} className="mb-5">
            <div className="space-y-4">
              <Select
                label={t("createCoupon.discountType")}
                options={discountTypeOptions}
                onChange={handleDiscountTypeChange}
                value={formik.values.discountType}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Textinput
                    label={
                      formik.values.discountType === "percent"
                        ? t("createCoupon.discountValuePercent")
                        : t("createCoupon.discountValueFixed")
                    }
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
                  <Textinput
                    label={t("createCoupon.minOrder")}
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
                  <Textinput
                    label={t("createCoupon.maxDiscount")}
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

          <Card title={t("createCoupon.duration")} className="mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  {t("createCoupon.startDate")}
                </label>
                <Flatpickr
                  className={`form-control py-2 ${hasError("startDate") ? "border-danger-500" : ""}`}
                  value={formik.values.startDate}
                  onChange={([date]) => formik.setFieldValue("startDate", date)}
                  options={{
                    dateFormat: "d/m/Y",
                  }}
                />
                {hasError("startDate") && (
                  <p className="text-danger-500 text-sm mt-1">{formik.errors.startDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  {t("createCoupon.endDate")}
                </label>
                <Flatpickr
                  className={`form-control py-2 ${hasError("endDate") ? "border-danger-500" : ""}`}
                  value={formik.values.endDate}
                  onChange={([date]) => formik.setFieldValue("endDate", date)}
                  options={{
                    dateFormat: "d/m/Y",
                  }}
                />
                {hasError("endDate") && (
                  <p className="text-danger-500 text-sm mt-1">{formik.errors.endDate}</p>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <Card title={t("createCoupon.usageLimit")} className="mb-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t("createCoupon.limitUsage")}
                </label>
                <Switch
                  activeClass="bg-primary-500"
                  value={formik.values.hasUsageLimit}
                  onChange={(val) => formik.setFieldValue("hasUsageLimit", val)}
                />
              </div>
              {formik.values.hasUsageLimit && (
                <div>
                  <Textinput
                    label={t("createCoupon.maxUsage")}
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

              {/* <Textinput
                label={t("createCoupon.perCustomer")}
                id="per_customer"
                type="number"
                placeholder="1"
                description={t("createCoupon.perCustomerDesc")}
              /> */}
            </div>
          </Card>


          <Card title={t("createCoupon.summary")} className="mb-5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">{t("createCoupon.discountTypeLabel")}</span>
                <span className="font-medium">
                  {formik.values.discountType === "percent" ? t("coupon.percent") : t("coupon.fixed")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("createCoupon.startDateLabel")}</span>
                <span className="font-medium">
                  {formik.values.startDate?.toLocaleDateString?.("vi-VN") || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("createCoupon.endDateLabel")}</span>
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
                  {t("createCoupon.createCoupon")}
                </>
              )}
            </button>
            <Link
              to="/coupons"
              className="btn btn-outline-dark w-full inline-flex items-center justify-center"
            >
              <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
              {t("createCoupon.back")}
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateCoupon;
