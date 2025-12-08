import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import Flatpickr from "react-flatpickr";
import Icon from "@/components/ui/Icon";

const CreateCoupon = () => {
  const { t } = useTranslation();
  const [discountType, setDiscountType] = useState("percent");
  const [isActive, setIsActive] = useState(true);
  const [hasUsageLimit, setHasUsageLimit] = useState(false);
  const [hasMaxDiscount, setHasMaxDiscount] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const discountTypeOptions = [
    { value: "percent", label: t("createCoupon.percentType") },
    { value: "fixed", label: t("createCoupon.fixedType") },
  ];

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
  };

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 lg:col-span-8">
        <Card title={t("createCoupon.couponInfo")} className="mb-5">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textinput
                label={t("createCoupon.code")}
                id="code"
                type="text"
                placeholder={t("createCoupon.codePlaceholder")}
                description={t("createCoupon.codeDesc")}
              />
              <Textinput
                label={t("createCoupon.programName")}
                id="name"
                type="text"
                placeholder={t("createCoupon.programNamePlaceholder")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                {t("createCoupon.description")}
              </label>
              <textarea
                className="form-control"
                rows={3}
                placeholder={t("createCoupon.descriptionPlaceholder")}
              />
            </div>
          </div>
        </Card>

        <Card title={t("createCoupon.discountConfig")} className="mb-5">
          <div className="space-y-4">
            <Select
              label={t("createCoupon.discountType")}
              options={discountTypeOptions}
              onChange={handleDiscountTypeChange}
              value={discountType}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textinput
                label={
                  discountType === "percent"
                    ? t("createCoupon.discountValuePercent")
                    : t("createCoupon.discountValueFixed")
                }
                id="discount_value"
                type="number"
                placeholder={discountType === "percent" ? "10" : "50000"}
              />
              <Textinput
                label={t("createCoupon.minOrder")}
                id="min_order"
                type="number"
                placeholder="100000"
              />
            </div>

            {discountType === "percent" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {t("createCoupon.maxDiscountLimit")}
                  </label>
                  <Switch
                    activeClass="bg-primary-500"
                    value={hasMaxDiscount}
                    onChange={() => setHasMaxDiscount(!hasMaxDiscount)}
                  />
                </div>
                {hasMaxDiscount && (
                  <Textinput
                    label={t("createCoupon.maxDiscount")}
                    id="max_discount"
                    type="number"
                    placeholder="200000"
                  />
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
                className="form-control py-2"
                value={startDate}
                onChange={([date]) => setStartDate(date)}
                options={{
                  dateFormat: "d/m/Y",
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                {t("createCoupon.endDate")}
              </label>
              <Flatpickr
                className="form-control py-2"
                value={endDate}
                onChange={([date]) => setEndDate(date)}
                options={{
                  dateFormat: "d/m/Y",
                }}
              />
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
                value={hasUsageLimit}
                onChange={() => setHasUsageLimit(!hasUsageLimit)}
              />
            </div>
            {hasUsageLimit && (
              <Textinput
                label={t("createCoupon.maxUsage")}
                id="usage_limit"
                type="number"
                placeholder="100"
              />
            )}

            <Textinput
              label={t("createCoupon.perCustomer")}
              id="per_customer"
              type="number"
              placeholder="1"
              description={t("createCoupon.perCustomerDesc")}
            />
          </div>
        </Card>

        <Card title={t("createCoupon.status")} className="mb-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t("createCoupon.activateCoupon")}
                </label>
                <p className="text-xs text-slate-400">
                  {t("createCoupon.activateCouponDesc")}
                </p>
              </div>
              <Switch
                activeClass="bg-success-500"
                value={isActive}
                onChange={() => setIsActive(!isActive)}
              />
            </div>
          </div>
        </Card>

        <Card title={t("createCoupon.summary")} className="mb-5">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{t("createCoupon.discountTypeLabel")}</span>
              <span className="font-medium">
                {discountType === "percent" ? t("coupon.percent") : t("coupon.fixed")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t("createCoupon.startDateLabel")}</span>
              <span className="font-medium">
                {startDate.toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t("createCoupon.endDateLabel")}</span>
              <span className="font-medium">
                {endDate.toLocaleDateString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t("createCoupon.statusLabel")}</span>
              <span
                className={`font-medium ${
                  isActive ? "text-success-500" : "text-warning-500"
                }`}
              >
                {isActive ? t("createCoupon.activeStatus") : t("createCoupon.inactiveStatus")}
              </span>
            </div>
          </div>
        </Card>

        <div className="flex flex-col space-y-3">
          <button type="button" className="btn btn-dark w-full inline-flex items-center justify-center">
            <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
            {t("createCoupon.createCoupon")}
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
  );
};

export default CreateCoupon;
