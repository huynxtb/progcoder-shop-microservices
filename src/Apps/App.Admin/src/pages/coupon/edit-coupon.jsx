import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import Flatpickr from "react-flatpickr";
import Icon from "@/components/ui/Icon";

// Sample coupon data for demo
const sampleCoupons = {
  1: {
    id: 1,
    code: "SUMMER2024",
    name: "Khuyến mãi mùa hè 2024",
    description: "Chương trình khuyến mãi mùa hè dành cho tất cả khách hàng",
    discount: 20,
    type: "percent",
    minOrder: 500000,
    maxDiscount: 200000,
    usageLimit: 100,
    perCustomer: 1,
    startDate: new Date("2024-06-01"),
    expiryDate: new Date("2024-08-31"),
    status: "active",
  },
  2: {
    id: 2,
    code: "FREESHIP50",
    name: "Miễn phí vận chuyển",
    description: "Miễn phí vận chuyển cho đơn hàng từ 300k",
    discount: 50000,
    type: "fixed",
    minOrder: 300000,
    maxDiscount: null,
    usageLimit: 500,
    perCustomer: 2,
    startDate: new Date("2024-05-01"),
    expiryDate: new Date("2024-07-15"),
    status: "active",
  },
  3: {
    id: 3,
    code: "NEWUSER",
    name: "Ưu đãi khách mới",
    description: "Giảm 15% cho lần đầu tiên mua hàng",
    discount: 15,
    type: "percent",
    minOrder: 200000,
    maxDiscount: 100000,
    usageLimit: null,
    perCustomer: 1,
    startDate: new Date("2024-01-01"),
    expiryDate: new Date("2024-12-31"),
    status: "active",
  },
  4: {
    id: 4,
    code: "FLASH100K",
    name: "Flash Sale 100K",
    description: "Giảm ngay 100k cho đơn từ 1 triệu",
    discount: 100000,
    type: "fixed",
    minOrder: 1000000,
    maxDiscount: null,
    usageLimit: 50,
    perCustomer: 1,
    startDate: new Date("2024-05-01"),
    expiryDate: new Date("2024-06-01"),
    status: "expired",
  },
  5: {
    id: 5,
    code: "VIP30",
    name: "Ưu đãi VIP 30%",
    description: "Ưu đãi đặc biệt dành cho khách VIP",
    discount: 30,
    type: "percent",
    minOrder: 2000000,
    maxDiscount: 500000,
    usageLimit: 200,
    perCustomer: 3,
    startDate: new Date("2024-06-01"),
    expiryDate: new Date("2024-09-30"),
    status: "active",
  },
  6: {
    id: 6,
    code: "BIRTHDAY",
    name: "Sinh nhật vui vẻ",
    description: "Mã giảm giá sinh nhật",
    discount: 25,
    type: "percent",
    minOrder: 0,
    maxDiscount: 150000,
    usageLimit: null,
    perCustomer: 1,
    startDate: new Date("2024-01-01"),
    expiryDate: new Date("2024-12-31"),
    status: "inactive",
  },
};

const EditCoupon = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [discountType, setDiscountType] = useState("percent");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [perCustomer, setPerCustomer] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [hasUsageLimit, setHasUsageLimit] = useState(false);
  const [hasMaxDiscount, setHasMaxDiscount] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Load coupon data
  useEffect(() => {
    const couponData = sampleCoupons[id];
    if (couponData) {
      setCode(couponData.code || "");
      setName(couponData.name || "");
      setDescription(couponData.description || "");
      setDiscountType(couponData.type || "percent");
      setDiscountValue(couponData.discount?.toString() || "");
      setMinOrder(couponData.minOrder?.toString() || "");
      setMaxDiscount(couponData.maxDiscount?.toString() || "");
      setUsageLimit(couponData.usageLimit?.toString() || "");
      setPerCustomer(couponData.perCustomer?.toString() || "");
      setIsActive(couponData.status === "active");
      setHasUsageLimit(!!couponData.usageLimit);
      setHasMaxDiscount(!!couponData.maxDiscount);
      setStartDate(couponData.startDate || new Date());
      setEndDate(couponData.expiryDate || new Date());
    }
  }, [id]);

  const discountTypeOptions = [
    { value: "percent", label: t("createCoupon.percentType") },
    { value: "fixed", label: t("createCoupon.fixedType") },
  ];

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
  };

  const handleSave = () => {
    console.log("Saving coupon:", {
      id,
      code,
      name,
      description,
      discountType,
      discountValue,
      minOrder,
      maxDiscount,
      usageLimit,
      perCustomer,
      isActive,
      startDate,
      endDate,
    });
  };

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
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    {t("editCoupon.codeDesc")}
                  </p>
                </div>
                <div>
                  <label className="form-label">{t("editCoupon.programName")}</label>
                  <Textinput
                    id="name"
                    type="text"
                    placeholder={t("editCoupon.programNamePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
                  {t("editCoupon.description")}
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder={t("editCoupon.descriptionPlaceholder")}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Card title={t("editCoupon.discountConfig")} className="mb-5">
            <div className="space-y-4">
              <Select
                label={t("editCoupon.discountType")}
                options={discountTypeOptions}
                onChange={handleDiscountTypeChange}
                value={discountType}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">
                    {discountType === "percent"
                      ? t("editCoupon.discountValuePercent")
                      : t("editCoupon.discountValueFixed")}
                  </label>
                  <Textinput
                    id="discount_value"
                    type="number"
                    placeholder={discountType === "percent" ? "10" : "50000"}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">{t("editCoupon.minOrder")}</label>
                  <Textinput
                    id="min_order"
                    type="number"
                    placeholder="100000"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                  />
                </div>
              </div>

              {discountType === "percent" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {t("editCoupon.maxDiscountLimit")}
                    </label>
                    <Switch
                      activeClass="bg-primary-500"
                      value={hasMaxDiscount}
                      onChange={() => setHasMaxDiscount(!hasMaxDiscount)}
                    />
                  </div>
                  {hasMaxDiscount && (
                    <div>
                      <label className="form-label">{t("editCoupon.maxDiscount")}</label>
                      <Textinput
                        id="max_discount"
                        type="number"
                        placeholder="200000"
                        value={maxDiscount}
                        onChange={(e) => setMaxDiscount(e.target.value)}
                      />
                    </div>
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
                  value={startDate}
                  onChange={([date]) => setStartDate(date)}
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
          <Card title={t("editCoupon.usageLimit")} className="mb-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t("editCoupon.limitUsage")}
                </label>
                <Switch
                  activeClass="bg-primary-500"
                  value={hasUsageLimit}
                  onChange={() => setHasUsageLimit(!hasUsageLimit)}
                />
              </div>
              {hasUsageLimit && (
                <div>
                  <label className="form-label">{t("editCoupon.maxUsage")}</label>
                  <Textinput
                    id="usage_limit"
                    type="number"
                    placeholder="100"
                    value={usageLimit}
                    onChange={(e) => setUsageLimit(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="form-label">{t("editCoupon.perCustomer")}</label>
                <Textinput
                  id="per_customer"
                  type="number"
                  placeholder="1"
                  value={perCustomer}
                  onChange={(e) => setPerCustomer(e.target.value)}
                />
                <p className="text-xs text-slate-400 mt-1">
                  {t("editCoupon.perCustomerDesc")}
                </p>
              </div>
            </div>
          </Card>

          <Card title={t("editCoupon.status")} className="mb-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {t("editCoupon.activateCoupon")}
                  </label>
                  <p className="text-xs text-slate-400">
                    {t("editCoupon.activateCouponDesc")}
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

          <Card title={t("editCoupon.summary")} className="mb-5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">{t("editCoupon.discountTypeLabel")}</span>
                <span className="font-medium">
                  {discountType === "percent" ? t("coupon.percent") : t("coupon.fixed")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("editCoupon.startDateLabel")}</span>
                <span className="font-medium">
                  {startDate?.toLocaleDateString?.("vi-VN") || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("editCoupon.endDateLabel")}</span>
                <span className="font-medium">
                  {endDate?.toLocaleDateString?.("vi-VN") || "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{t("editCoupon.statusLabel")}</span>
                <span
                  className={`font-medium ${
                    isActive ? "text-success-500" : "text-warning-500"
                  }`}
                >
                  {isActive ? t("editCoupon.activeStatus") : t("editCoupon.inactiveStatus")}
                </span>
              </div>
            </div>
          </Card>

          <div className="flex flex-col space-y-3">
            <button
              type="button"
              className="btn btn-dark w-full inline-flex items-center justify-center"
              onClick={handleSave}
            >
              <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
              {t("editCoupon.updateCoupon")}
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
    </div>
  );
};

export default EditCoupon;

