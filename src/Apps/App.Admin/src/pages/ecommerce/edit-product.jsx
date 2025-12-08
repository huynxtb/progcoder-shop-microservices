import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Switch from "@/components/ui/Switch";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Fileinput from "@/components/ui/Fileinput";

// Sample product data for demo
const sampleProducts = {
  1: {
    name: "iPhone 15 Pro Max 256GB",
    category: "phone",
    brand: "apple",
    unit: "Cái",
    weight: "0.221",
    minQty: "1",
    tags: "iphone, apple, smartphone",
    barcode: "194253715061",
    color: "Titan Tự Nhiên, Titan Xanh, Titan Trắng, Titan Đen",
    size: "256GB, 512GB, 1TB",
    description: "iPhone 15 Pro Max. Được trang bị chip A17 Pro, hệ thống camera chuyên nghiệp, và thiết kế titan bền bỉ.",
    metaTitle: "iPhone 15 Pro Max 256GB - Chính hãng Apple",
    metaDesc: "Mua iPhone 15 Pro Max 256GB chính hãng. Chip A17 Pro, Camera 48MP, Titan Grade 5. Bảo hành 12 tháng.",
    price: "34990000",
    salePrice: "32990000",
    sku: "IPH-15-PM-256",
    quantity: "45",
    qtyWarning: "10",
    refundable: true,
    freeShipping: true,
    flatRate: false,
    showStock: true,
    hideStock: false,
    featured: true,
    active: true,
  },
  2: {
    name: "Samsung Galaxy S24 Ultra",
    category: "phone",
    brand: "samsung",
    unit: "Cái",
    weight: "0.232",
    minQty: "1",
    tags: "samsung, galaxy, smartphone",
    barcode: "887276789456",
    color: "Titan Gray, Titan Black, Titan Violet, Titan Yellow",
    size: "256GB, 512GB, 1TB",
    description: "Samsung Galaxy S24 Ultra với AI tích hợp, camera 200MP và S Pen.",
    metaTitle: "Samsung Galaxy S24 Ultra - AI Phone",
    metaDesc: "Samsung Galaxy S24 Ultra - Điện thoại AI đầu tiên. Camera 200MP, S Pen tích hợp.",
    price: "33990000",
    salePrice: "",
    sku: "SAM-S24-U-512",
    quantity: "28",
    qtyWarning: "5",
    refundable: true,
    freeShipping: false,
    flatRate: true,
    showStock: true,
    hideStock: false,
    featured: false,
    active: true,
  },
};

const EditProduct = () => {
  const { t } = useTranslation();
  const { id } = useParams();

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

  // Load product data
  useEffect(() => {
    const productData = sampleProducts[id];
    if (productData) {
      setFormData({
        name: productData.name || "",
        category: productData.category || "",
        brand: productData.brand || "",
        unit: productData.unit || "",
        weight: productData.weight || "",
        minQty: productData.minQty || "",
        tags: productData.tags || "",
        barcode: productData.barcode || "",
        color: productData.color || "",
        size: productData.size || "",
        description: productData.description || "",
        metaTitle: productData.metaTitle || "",
        metaDesc: productData.metaDesc || "",
        price: productData.price || "",
        salePrice: productData.salePrice || "",
        sku: productData.sku || "",
        quantity: productData.quantity || "",
        qtyWarning: productData.qtyWarning || "",
      });
      setRefundable(productData.refundable ?? true);
      setFreeShipping(productData.freeShipping ?? false);
      setFlatRate(productData.flatRate ?? false);
      setShowStock(productData.showStock ?? true);
      setHideStock(productData.hideStock ?? false);
      setFeatured(productData.featured ?? false);
      setActive(productData.active ?? true);
    }
  }, [id]);

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
          {t("editProduct.title")} #{id}
        </h4>
        <div className="flex space-x-3">
          <Link to="/products" className="btn btn-outline-dark btn-sm inline-flex items-center">
            <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
            {t("editProduct.back")}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-5">
          {/* Thông tin cơ bản */}
          <Card title={t("editProduct.basicInfo")}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="form-label">
                  {t("editProduct.productName")} <span className="text-danger-500">{t("editProduct.required")}</span>
                </label>
                <Textinput
                  id="name"
                  type="text"
                  placeholder={t("editProduct.productNamePlaceholder")}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="form-label">
                    {t("editProduct.category")} <span className="text-danger-500">{t("editProduct.required")}</span>
                  </label>
                  <Select
                    id="category"
                    placeholder={t("editProduct.categoryPlaceholder")}
                    options={categoryOptions}
                    value={formData.category}
                    onChange={handleSelectChange("category")}
                  />
                </div>
                <div>
                  <label htmlFor="brand" className="form-label">
                    {t("editProduct.brand")}
                  </label>
                  <Select
                    id="brand"
                    placeholder={t("editProduct.brandPlaceholder")}
                    options={brandOptions}
                    value={formData.brand}
                    onChange={handleSelectChange("brand")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="unit" className="form-label">
                    {t("editProduct.unit")}
                  </label>
                  <Textinput
                    id="unit"
                    type="text"
                    placeholder={t("editProduct.unitPlaceholder")}
                    value={formData.unit}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="weight" className="form-label">
                    {t("editProduct.weight")}
                  </label>
                  <Textinput
                    id="weight"
                    type="number"
                    placeholder={t("editProduct.weightPlaceholder")}
                    value={formData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="minQty" className="form-label">
                    {t("editProduct.minQty")}
                  </label>
                  <Textinput
                    id="minQty"
                    type="number"
                    placeholder={t("editProduct.minQtyPlaceholder")}
                    value={formData.minQty}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tags" className="form-label">
                    {t("editProduct.tags")}
                  </label>
                  <Textinput
                    id="tags"
                    type="text"
                    placeholder={t("editProduct.tagsPlaceholder")}
                    value={formData.tags}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="barcode" className="form-label">
                    {t("editProduct.barcode")}
                  </label>
                  <Textinput
                    id="barcode"
                    type="text"
                    placeholder={t("editProduct.barcodePlaceholder")}
                    value={formData.barcode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-2 border-t border-slate-200 dark:border-slate-700 mt-4 pt-4">
                <div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {t("editProduct.refundable")}
                  </span>
                  <p className="text-xs text-slate-400">
                    {t("editProduct.refundableDesc")}
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
          <Card title={t("editProduct.productImages")}>
            <div className="space-y-4">
              <div>
                <label className="form-label">
                  {t("editProduct.thumbnail")} <span className="text-danger-500">{t("editProduct.required")}</span>
                </label>
                <p className="text-xs text-slate-400 mb-2">
                  {t("editProduct.thumbnailDesc")}
                </p>
                <Fileinput
                  name="thumbnail"
                  selectedFile={thumbFile}
                  onChange={handleThumbFileChange}
                  placeholder={t("editProduct.selectFile")}
                />
              </div>
              <div>
                <label className="form-label">{t("editProduct.gallery")}</label>
                <p className="text-xs text-slate-400 mb-2">
                  {t("editProduct.galleryDesc")}
                </p>
                <Fileinput
                  name="gallery"
                  selectedFiles={galleryFiles}
                  onChange={handleGalleryFilesChange}
                  multiple={true}
                  placeholder={t("editProduct.selectFile")}
                />
              </div>
            </div>
          </Card>

          {/* Biến thể sản phẩm */}
          <Card title={t("editProduct.variants")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="color" className="form-label">
                  {t("editProduct.color")}
                </label>
                <Textinput
                  id="color"
                  type="text"
                  placeholder={t("editProduct.colorPlaceholder")}
                  value={formData.color}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="size" className="form-label">
                  {t("editProduct.size")}
                </label>
                <Textinput
                  id="size"
                  type="text"
                  placeholder={t("editProduct.sizePlaceholder")}
                  value={formData.size}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Card>

          {/* Mô tả sản phẩm */}
          <Card title={t("editProduct.description")}>
            <div>
              <label htmlFor="description" className="form-label">
                {t("editProduct.descriptionLabel")}
              </label>
              <Textarea
                id="description"
                placeholder={t("editProduct.descriptionPlaceholder")}
                rows={6}
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
          </Card>

          {/* SEO */}
          <Card title={t("editProduct.seoMetaTags")}>
            <div className="space-y-4">
              <div>
                <label htmlFor="metaTitle" className="form-label">
                  {t("editProduct.metaTitle")}
                </label>
                <Textinput
                  id="metaTitle"
                  type="text"
                  placeholder={t("editProduct.metaTitlePlaceholder")}
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="metaDesc" className="form-label">
                  {t("editProduct.metaDesc")}
                </label>
                <Textarea
                  id="metaDesc"
                  placeholder={t("editProduct.metaDescPlaceholder")}
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
          <Card title={t("editProduct.pricing")}>
            <div className="space-y-4">
              <div>
                <label htmlFor="price" className="form-label">
                  {t("editProduct.originalPrice")} <span className="text-danger-500">{t("editProduct.required")}</span>
                </label>
                <Textinput
                  id="price"
                  type="number"
                  placeholder={t("editProduct.originalPricePlaceholder")}
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="salePrice" className="form-label">
                  {t("editProduct.salePrice")}
                </label>
                <Textinput
                  id="salePrice"
                  type="number"
                  placeholder={t("editProduct.salePricePlaceholder")}
                  value={formData.salePrice}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-slate-400 mt-1">
                  {t("editProduct.salePriceDesc")}
                </p>
              </div>
            </div>
          </Card>

          {/* Kho hàng */}
          <Card title={t("editProduct.inventory")}>
            <div className="space-y-4">
              <div>
                <label htmlFor="sku" className="form-label">
                  {t("editProduct.sku")} <span className="text-danger-500">{t("editProduct.required")}</span>
                </label>
                <Textinput
                  id="sku"
                  type="text"
                  placeholder={t("editProduct.skuPlaceholder")}
                  value={formData.sku}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="quantity" className="form-label">
                  {t("editProduct.quantity")}
                </label>
                <Textinput
                  id="quantity"
                  type="number"
                  placeholder={t("editProduct.quantityPlaceholder")}
                  value={formData.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="qtyWarning" className="form-label">
                  {t("editProduct.qtyWarning")}
                </label>
                <Textinput
                  id="qtyWarning"
                  type="number"
                  placeholder={t("editProduct.qtyWarningPlaceholder")}
                  value={formData.qtyWarning}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-slate-400 mt-1">
                  {t("editProduct.qtyWarningDesc")}
                </p>
              </div>
            </div>
          </Card>

          {/* Vận chuyển */}
          <Card title={t("editProduct.shipping")}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("editProduct.freeShipping")}
                </span>
                <Switch
                  activeClass="bg-success-500"
                  value={freeShipping}
                  onChange={() => setFreeShipping(!freeShipping)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("editProduct.flatRate")}
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
          <Card title={t("editProduct.stockDisplay")}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("editProduct.showStock")}
                </span>
                <Switch
                  activeClass="bg-success-500"
                  value={showStock}
                  onChange={() => setShowStock(!showStock)}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {t("editProduct.hideStock")}
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
          <Card title={t("editProduct.statusSection")}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {t("editProduct.featured")}
                  </span>
                  <p className="text-xs text-slate-400">
                    {t("editProduct.featuredDesc")}
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
                    {t("editProduct.activeStatus")}
                  </span>
                  <p className="text-xs text-slate-400">
                    {t("editProduct.activeStatusDesc")}
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
            <button type="button" className="btn btn-dark w-full inline-flex items-center justify-center">
              <Icon icon="heroicons:check" className="ltr:mr-2 rtl:ml-2" />
              {t("editProduct.updateProduct")}
            </button>
            <button type="button" className="btn btn-outline-slate w-full inline-flex items-center justify-center">
              <Icon icon="heroicons:document" className="ltr:mr-2 rtl:ml-2" />
              {t("editProduct.saveDraft")}
            </button>
            <Link
              to="/products"
              className="btn btn-outline-danger w-full inline-flex items-center justify-center"
            >
              <Icon icon="heroicons:x-mark" className="ltr:mr-2 rtl:ml-2" />
              {t("editProduct.cancelBtn")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
