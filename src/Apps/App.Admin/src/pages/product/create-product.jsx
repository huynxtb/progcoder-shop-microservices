import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Switch from "@/components/ui/Switch";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import ReactSelect from "react-select";
import Fileinput from "@/components/ui/Fileinput";
import { catalogService } from "@/services/catalogService";

const CreateProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbnailError, setThumbnailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await catalogService.getCategories();
        const categoryOptions = response.data.result.items.map(item => ({
          value: item.id,
          label: item.name
        }));
        setCategories(categoryOptions);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [t]);

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoadingBrands(true);
        const response = await catalogService.getBrands();
        const brandOptions = response.data.result.items.map(item => ({
          value: item.id,
          label: item.name
        }));
        setBrands(brandOptions);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      } finally {
        setLoadingBrands(false);
      }
    };

    fetchBrands();
  }, [t]);

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .required(t("validation.required")),
    category: Yup.array()
      .min(1, t("validation.required"))
      .required(t("validation.required")),
    price: Yup.number()
      .typeError(t("validation.mustBeNumber"))
      .positive(t("validation.mustBePositive"))
      .required(t("validation.required")),
    sku: Yup.string()
      .trim()
      .required(t("validation.required")),
    brand: Yup.string().nullable(),
    unit: Yup.string(),
    weight: Yup.number()
      .typeError(t("validation.mustBeNumber"))
      .positive(t("validation.mustBePositive"))
      .nullable(),
    minQty: Yup.number()
      .typeError(t("validation.mustBeNumber"))
      .positive(t("validation.mustBePositive"))
      .nullable(),
    tags: Yup.string(),
    barcode: Yup.string(),
    color: Yup.string(),
    size: Yup.string(),
    shortDescription: Yup.string(),
    longDescription: Yup.string(),
    metaTitle: Yup.string(),
    metaDesc: Yup.string(),
    salePrice: Yup.number()
      .typeError(t("validation.mustBeNumber"))
      .positive(t("validation.mustBePositive"))
      .nullable()
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      category: [],
      brand: "",
      unit: "",
      weight: "",
      minQty: "",
      tags: "",
      barcode: "",
      color: "",
      size: "",
      shortDescription: "",
      longDescription: "",
      metaTitle: "",
      metaDesc: "",
      price: "",
      salePrice: "",
      sku: "",
      quantity: "",
      qtyWarning: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('values', values);
      // Validate thumbnail separately
      if (!thumbFile) {
        setThumbnailError(t("validation.required"));
        toast.error(t("createProduct.validationError"), {
          position: "top-right",
          autoClose: 5000,
        });
        return;
      }

      setIsSubmitting(true);

      try {
        // Build FormData
        const submitFormData = new FormData();

        // Append
        submitFormData.append("name", values.name);
        submitFormData.append("sku", values.sku);
        submitFormData.append("shortDescription", values.shortDescription);
        submitFormData.append("longDescription", values.longDescription);
        submitFormData.append("price", values.price);
        submitFormData.append("salePrice", values.salePrice || 0);
        submitFormData.append("published", published);
        submitFormData.append("featured", featured);
        submitFormData.append("seoTitle", values.metaTitle);
        submitFormData.append("seoDescription", values.metaDesc);
        submitFormData.append("barcode", values.barcode);
        submitFormData.append("unit", values.unit);
        submitFormData.append("weight", values.weight || 0);

        if (values.category && Array.isArray(values.category) && values.category.length > 0) {
          values.category.forEach((cat) => {
            submitFormData.append("categoryIds", cat.value);
          });
        }

        if (galleryFiles.length > 0) {
          galleryFiles.forEach((file) => {
            submitFormData.append("imageFiles", file);
          });
        }

        if (thumbFile) {
          submitFormData.append("thumbnailFile", thumbFile);
        }

        if (values.brand && values.brand !== "") {
          submitFormData.append("brandId", values.brand);
        }

        if (values.color && values.color !== "") {
          const colors = values.color.split(',');
          colors.forEach((color) => {
            submitFormData.append("colors", color);
          });
        }

        if (values.size && values.size !== "") {
          const sizes = values.size.split(',');
          sizes.forEach((size) => {
            submitFormData.append("sizes", size);
          });
        }

        if (values.tags && values.tags !== "") {
          const tags = values.tags.split(',');
          tags.forEach((tag) => {
            submitFormData.append("tags", tag);
          });
        }

        // Send to API
        const response = await catalogService.createProduct(submitFormData);

        if (response && response.status >= 200 && response.status < 300) {
          toast.success(t("createProduct.successMessage"), {
            position: "top-right",
            autoClose: 5000,
          });

          navigate("/products");
        }

      } catch (error) {
        console.error("Failed to create product:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleThumbFileChange = (e) => {
    const file = e.target.files[0];
    setThumbFile(file);
    if (file) {
      setThumbnailError("");
    }
  };

  const handleGalleryFilesChange = (e) => {
    setGalleryFiles(Array.from(e.target.files));
  };

  // Helper function to check if field has error
  const hasError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center">
        <h4 className="text-xl font-medium text-slate-900 dark:text-white">
          {t("createProduct.title")}
        </h4>
        <div className="flex space-x-3">
          <Link to="/products" className="btn btn-outline-dark btn-sm inline-flex items-center">
            <Icon icon="heroicons:arrow-left" className="ltr:mr-2 rtl:ml-2" />
            {t("createProduct.back")}
          </Link>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
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
                    name="name"
                    type="text"
                    placeholder={t("createProduct.productNamePlaceholder")}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={hasError("name") ? "border-danger-500" : ""}
                  />
                  {hasError("name") && (
                    <p className="text-danger-500 text-sm mt-1">{formik.errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="sku" className="form-label">
                    {t("createProduct.sku")} <span className="text-danger-500">{t("createProduct.required")}</span>
                  </label>
                  <Textinput
                    id="sku"
                    name="sku"
                    type="text"
                    placeholder={t("createProduct.skuPlaceholder")}
                    value={formik.values.sku}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={hasError("sku") ? "border-danger-500" : ""}
                  />
                  {hasError("sku") && (
                    <p className="text-danger-500 text-sm mt-1">{formik.errors.sku}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="form-label">
                      {t("createProduct.category")} <span className="text-danger-500">{t("createProduct.required")}</span>
                    </label>
                    <ReactSelect
                      id="category"
                      name="category"
                      placeholder={t("createProduct.categoryPlaceholder")}
                      options={categories}
                      value={formik.values.category}
                      onChange={(selectedOptions) => {
                        formik.setFieldValue("category", selectedOptions || []);
                      }}
                      onBlur={() => formik.setFieldTouched("category", true)}
                      isMulti
                      isLoading={loadingCategories}
                      className="react-select"
                      classNamePrefix="select"
                      styles={{
                        option: (provided) => ({
                          ...provided,
                          fontSize: "14px",
                        }),
                      }}
                    />
                    {hasError("category") && (
                      <p className="text-danger-500 text-sm mt-1">{formik.errors.category}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="brand" className="form-label">
                      {t("createProduct.brand")}
                    </label>
                    <ReactSelect
                      id="brand"
                      name="brand"
                      placeholder={t("createProduct.brandPlaceholder")}
                      options={brands}
                      value={brands.find(brand => brand.value === formik.values.brand) || null}
                      onChange={(selectedOption) => {
                        formik.setFieldValue("brand", selectedOption ? selectedOption.value : "");
                      }}
                      onBlur={() => formik.setFieldTouched("brand", true)}
                      isLoading={loadingBrands}
                      className="react-select"
                      classNamePrefix="select"
                      styles={{
                        option: (provided) => ({
                          ...provided,
                          fontSize: "14px",
                        }),
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="unit" className="form-label">
                      {t("createProduct.unit")}
                    </label>
                    <Textinput
                      id="unit"
                      name="unit"
                      type="text"
                      placeholder={t("createProduct.unitPlaceholder")}
                      value={formik.values.unit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div>
                    <label htmlFor="weight" className="form-label">
                      {t("createProduct.weight")}
                    </label>
                    <Textinput
                      id="weight"
                      name="weight"
                      type="number"
                      placeholder={t("createProduct.weightPlaceholder")}
                      value={formik.values.weight}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={hasError("weight") ? "border-danger-500" : ""}
                    />
                    {hasError("weight") && (
                      <p className="text-danger-500 text-sm mt-1">{formik.errors.weight}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="tags" className="form-label">
                      {t("createProduct.tags")}
                    </label>
                    <Textinput
                      id="tags"
                      name="tags"
                      type="text"
                      placeholder={t("createProduct.tagsPlaceholder")}
                      value={formik.values.tags}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div>
                    <label htmlFor="barcode" className="form-label">
                      {t("createProduct.barcode")}
                    </label>
                    <Textinput
                      id="barcode"
                      name="barcode"
                      type="text"
                      placeholder={t("createProduct.barcodePlaceholder")}
                      value={formik.values.barcode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
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
                    className={thumbnailError ? "border-danger-500" : ""}
                  />
                  {thumbnailError && (
                    <p className="text-danger-500 text-sm mt-1">{thumbnailError}</p>
                  )}
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
                    name="color"
                    type="text"
                    placeholder={t("createProduct.colorPlaceholder")}
                    value={formik.values.color}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div>
                  <label htmlFor="size" className="form-label">
                    {t("createProduct.size")}
                  </label>
                  <Textinput
                    id="size"
                    name="size"
                    type="text"
                    placeholder={t("createProduct.sizePlaceholder")}
                    value={formik.values.size}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </Card>

            {/* Mô tả sản phẩm */}
            <Card title={t("createProduct.description")}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="shortDescription" className="form-label">
                    {t("createProduct.shortDescriptionLabel")}
                  </label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    placeholder={t("createProduct.shortDescriptionPlaceholder")}
                    rows={6}
                    value={formik.values.shortDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="form-label">
                    {t("createProduct.longDescriptionLabel")}
                  </label>
                  <Textarea
                    id="longDescription"
                    name="longDescription"
                    placeholder={t("createProduct.longDescriptionPlaceholder")}
                    rows={6}
                    value={formik.values.longDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
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
                    name="metaTitle"
                    type="text"
                    placeholder={t("createProduct.metaTitlePlaceholder")}
                    value={formik.values.metaTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div>
                  <label htmlFor="metaDesc" className="form-label">
                    {t("createProduct.metaDesc")}
                  </label>
                  <Textarea
                    id="metaDesc"
                    name="metaDesc"
                    placeholder={t("createProduct.metaDescPlaceholder")}
                    rows={3}
                    value={formik.values.metaDesc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="btn btn-dark inline-flex items-center justify-center"
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
                    {t("createProduct.saveProduct")}
                  </>
                )}
              </button>
              <Link
                to="/products"
                className="btn btn-outline-danger inline-flex items-center justify-center"
              >
                <Icon icon="heroicons:x-mark" className="ltr:mr-2 rtl:ml-2" />
                {t("createProduct.cancelBtn")}
              </Link>
            </div>
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
                    name="price"
                    type="number"
                    placeholder={t("createProduct.originalPricePlaceholder")}
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={hasError("price") ? "border-danger-500" : ""}
                  />
                  {hasError("price") && (
                    <p className="text-danger-500 text-sm mt-1">{formik.errors.price}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="salePrice" className="form-label">
                    {t("createProduct.salePrice")}
                  </label>
                  <Textinput
                    id="salePrice"
                    name="salePrice"
                    type="number"
                    placeholder={t("createProduct.salePricePlaceholder")}
                    value={formik.values.salePrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={hasError("salePrice") ? "border-danger-500" : ""}
                  />
                  {hasError("salePrice") && (
                    <p className="text-danger-500 text-sm mt-1">{formik.errors.salePrice}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">
                    {t("createProduct.salePriceDesc")}
                  </p>
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
                  </div>
                  <Switch
                    activeClass="bg-success-500"
                    value={published}
                    onChange={() => setPublished(!published)}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
