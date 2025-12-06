import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Switch from "@/components/ui/Switch";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Fileinput from "@/components/ui/Fileinput";

const CreateProduct = () => {
  const { t } = useTranslation();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    unit: "",
    weight: "",
    minQty: "",
    tags: "",
    barcode: "",
    color: "",
    size: "",
    description: "",
    metaTitle: "",
    metaDesc: "",
    price: "",
    salePrice: "",
    sku: "",
    quantity: "",
    qtyWarning: "",
  });

  // Switch states
  const [refundable, setRefundable] = useState(true);
  const [freeShipping, setFreeShipping] = useState(false);
  const [flatRate, setFlatRate] = useState(false);
  const [showStock, setShowStock] = useState(true);
  const [hideStock, setHideStock] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);

  // File states
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [thumbFile, setThumbFile] = useState(null);

  const categoryOptions = [
    { value: "electronics", label: "Điện tử" },
    { value: "phone", label: "Điện thoại" },
    { value: "laptop", label: "Laptop" },
    { value: "tablet", label: "Tablet" },
    { value: "accessories", label: "Phụ kiện" },
    { value: "clothing", label: "Thời trang" },
    { value: "food", label: "Thực phẩm" },
    { value: "furniture", label: "Nội thất" },
  ];

  const brandOptions = [
    { value: "apple", label: "Apple" },
    { value: "samsung", label: "Samsung" },
    { value: "sony", label: "Sony" },
    { value: "lg", label: "LG" },
    { value: "xiaomi", label: "Xiaomi" },
    { value: "dell", label: "Dell" },
    { value: "asus", label: "Asus" },
    { value: "other", label: "Khác" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleThumbFileChange = (e) => {
    setThumbFile(e.target.files[0]);
  };

  const handleGalleryFilesChange = (e) => {
    setGalleryFiles(Array.from(e.target.files));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center">
        <h4 className="text-xl font-medium text-slate-900 dark:text-white">
          {t("createProduct.title")}
        </h4>
        <div className="flex space-x-3">
          <Link to="/products" className="btn btn-outline-dark btn-sm">
            <Icon icon="heroicons:arrow-left" className="mr-1" />
            {t("createProduct.back")}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-5">
          {/* Thông tin cơ bản */}
          <Card title={t("createProduct.basicInfo")}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="form-label">
                  {t("createProduct.productName")} <span className="text-danger-500">{t("createProduct.required")}</span>
                </label>
                <Textinput
                  id="name"
                  type="text"
                  placeholder={t("createProduct.productNamePlaceholder")}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="form-label">
                    {t("createProduct.category")} <span className="text-danger-500">{t("createProduct.required")}</span>
                  </label>
                  <Select
                    id="category"
                    placeholder={t("createProduct.categoryPlaceholder")}
                    options={categoryOptions}
                    value={formData.category}
                    onChange={handleSelectChange("category")}
                  />
                </div>
                <div>
                  <label htmlFor="brand" className="form-label">
                    {t("createProduct.brand")}
                  </label>
                  <Select
                    id="brand"
                    placeholder={t("createProduct.brandPlaceholder")}
                    options={brandOptions}
                    value={formData.brand}
                    onChange={handleSelectChange("brand")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="unit" className="form-label">
                    {t("createProduct.unit")}
                  </label>
                  <Textinput
                    id="unit"
                    type="text"
                    placeholder={t("createProduct.unitPlaceholder")}
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="form-label">
                    {t("createProduct.weight")}
                  </label>
                  <Textinput
                    id="weight"
                    type="number"
                    placeholder={t("createProduct.weightPlaceholder")}
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="minQty" className="form-label">
                    {t("createProduct.minQty")}
                  </label>
                  <Textinput
                    id="minQty"
                    type="number"
                    placeholder={t("createProduct.minQtyPlaceholder")}
                    value={formData.minQty}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tags" className="form-label">
                    {t("createProduct.tags")}
                  </label>
                  <Textinput
                    id="tags"
                    type="text"
                    placeholder={t("createProduct.tagsPlaceholder")}
                    value={formData.tags}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="barcode" className="form-label">
                    {t("createProduct.barcode")}
                  </label>
                  <Textinput
                    id="barcode"
                    type="text"
                    placeholder={t("createProduct.barcodePlaceholder")}
                    value={formData.barcode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-slate-200 dark:border-slate-700 mt-4 pt-4">
                <div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {t("createProduct.refundable")}
                  </span>
                  <p className="text-xs text-slate-400">
                    {t("createProduct.refundableDesc")}
                  </p>
                </div>
                <Switch
                  activeClass="bg-success-500"
                  value={refundable}
                  onChange={() => setRefundable(!refundable)}
                />
              </div>
            </div>
          </Card>

          {/* Hình ảnh sản phẩm */}
          <Card title={t("createProduct.productImages")}>
            <div className="space-y-4">
              <div>
                <label className="form-label">
                  {t("createProduct.thumbnail")} <span className="text-danger-500">{t("createProduct.required")}</span>
                </label>
                <p className="text-xs text-slate-400 mb-2">
                  {t("createProduct.thumbnailDesc")}
                </p>
                <Fileinput
                  name="thumbnail"
                  selectedFile={thumbFile}
                  onChange={handleThumbFileChange}
                  placeholder={t("createProduct.selectFile")}
                />
              </div>
              <div>
                <label className="form-label">{t("createProduct.gallery")}</label>
                <p className="text-xs text-slate-400 mb-2">
                  {t("createProduct.galleryDesc")}
                </p>
                <Fileinput
                  name="gallery"
                  selectedFiles={galleryFiles}
                  onChange={handleGalleryFilesChange}
                  multiple={true}
                  placeholder={t("createProduct.selectFile")}
                />
              </div>
            </div>
          </Card>

          {/* Biến thể sản phẩm */}
          <Card title={t("createProduct.variants")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="color" className="form-label">
                  {t("createProduct.color")}
                </label>
                <Textinput
                  id="color"
                  type="text"
                  placeholder={t("createProduct.colorPlaceholder")}
                  value={formData.color}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="size" className="form-label">
                  {t("createProduct.size")}
                </label>
                <Textinput
                  id="size"
                  type="text"
                  placeholder={t("createProduct.sizePlaceholder")}
                  value={formData.size}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Card>

          {/* Mô tả sản phẩm */}
          <Card title={t("createProduct.description")}>
            <div>
              <label htmlFor="description" className="form-label">
                {t("createProduct.descriptionLabel")}
              </label>
              <Textarea
                id="description"
                placeholder={t("createProduct.descriptionPlaceholder")}
                rows={6}
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </Card>

          {/* SEO */}
          <Card title={t("createProduct.seoMetaTags")}>
            <div className="space-y-4">
              <div>
                <label htmlFor="metaTitle" className="form-label">
                  {t("createProduct.metaTitle")}
                </label>
                <Textinput
                  id="metaTitle"
                  type="text"
                  placeholder={t("createProduct.metaTitlePlaceholder")}
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="metaDesc" className="form-label">
                  {t("createProduct.metaDesc")}
                </label>
                <Textarea
                  id="metaDesc"
                  placeholder={t("createProduct.metaDescPlaceholder")}
                  rows={3}
                  value={formData.metaDesc}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          {/* Giá sản phẩm */}
          <Card title={t("createProduct.pricing")}>
            <div className="space-y-4">
              <div>
                <label htmlFor="price" className="form-label">
                  {t("createProduct.originalPrice")} <span className="text-danger-500">{t("createProduct.required")}</span>
                </label>
                <Textinput
                  id="price"
                  type="number"
                  placeholder={t("createProduct.originalPricePlaceholder")}
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="salePrice" className="form-label">
                  {t("createProduct.salePrice")}
                </label>
                <Textinput
                  id="salePrice"
                  type="number"
                  placeholder={t("createProduct.salePricePlaceholder")}
                  value={formData.salePrice}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-slate-400 mt-1">
                  {t("createProduct.salePriceDesc")}
                </p>
              </div>
            </div>
          </Card>

          {/* Kho hàng */}
          <Card title={t("createProduct.inventory")}>
            <div className="space-y-4">
              <div>
                <label htmlFor="sku" className="form-label">
                  {t("createProduct.sku")} <span className="text-danger-500">{t("createProduct.required")}</span>
                </label>
                <Textinput
                  id="sku"
                  type="text"
                  placeholder={t("createProduct.skuPlaceholder")}
                  value={formData.sku}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="quantity" className="form-label">
                  {t("createProduct.quantity")}
                </label>
                <Textinput
                  id="quantity"
                  type="number"
                  placeholder={t("createProduct.quantityPlaceholder")}
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="qtyWarning" className="form-label">
                  {t("createProduct.qtyWarning")}
                </label>
                <Textinput
                  id="qtyWarning"
                  type="number"
                  placeholder={t("createProduct.qtyWarningPlaceholder")}
                  value={formData.qtyWarning}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-slate-400 mt-1">
                  {t("createProduct.qtyWarningDesc")}
                </p>
              </div>
            </div>
          </Card>

          {/* Vận chuyển */}
          <Card title={t("createProduct.shipping")}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("createProduct.freeShipping")}
                </span>
                <Switch
                  activeClass="bg-success-500"
                  value={freeShipping}
                  onChange={() => setFreeShipping(!freeShipping)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("createProduct.flatRate")}
                </span>
                <Switch
                  activeClass="bg-success-500"
                  value={flatRate}
                  onChange={() => setFlatRate(!flatRate)}
                />
              </div>
            </div>
          </Card>

          {/* Hiển thị kho */}
          <Card title={t("createProduct.stockDisplay")}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("createProduct.showStock")}
                </span>
                <Switch
                  activeClass="bg-success-500"
                  value={showStock}
                  onChange={() => setShowStock(!showStock)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("createProduct.hideStock")}
                </span>
                <Switch
                  activeClass="bg-success-500"
                  value={hideStock}
                  onChange={() => setHideStock(!hideStock)}
                />
              </div>
            </div>
          </Card>

          {/* Trạng thái */}
          <Card title={t("createProduct.statusSection")}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {t("createProduct.featured")}
                  </span>
                  <p className="text-xs text-slate-400">
                    {t("createProduct.featuredDesc")}
                  </p>
                </div>
                <Switch
                  activeClass="bg-warning-500"
                  value={featured}
                  onChange={() => setFeatured(!featured)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {t("createProduct.activeStatus")}
                  </span>
                  <p className="text-xs text-slate-400">
                    {t("createProduct.activeStatusDesc")}
                  </p>
                </div>
                <Switch
                  activeClass="bg-success-500"
                  value={active}
                  onChange={() => setActive(!active)}
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <button type="button" className="btn btn-dark w-full">
              <Icon icon="heroicons:check" className="mr-2" />
              {t("createProduct.saveProduct")}
            </button>
            <button type="button" className="btn btn-outline-slate w-full">
              <Icon icon="heroicons:document" className="mr-2" />
              {t("createProduct.saveDraft")}
            </button>
            <Link
              to="/products"
              className="btn btn-outline-danger w-full text-center"
            >
              <Icon icon="heroicons:x-mark" className="mr-2" />
              {t("createProduct.cancelBtn")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
