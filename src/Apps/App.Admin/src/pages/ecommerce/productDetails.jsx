import React, { Fragment, useState, useEffect } from "react";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  TabList,
  TabGroup,
  TabPanels,
  TabPanel,
  Tab
} from "@headlessui/react";
import CounterButton from "@/components/partials/ecommerce/counter-button";
import blackJumper from "@/assets/images/e-commerce/product-card/classical-black-tshirt.png";
import one from "@/assets/images/e-commerce/productDetails/1.png";
import two from "@/assets/images/e-commerce/productDetails/2.png";
import three from "@/assets/images/e-commerce/productDetails/3.png";
import gmail from "@/assets/images/e-commerce/productDetails/gmail.svg";
import facebook from "@/assets/images/e-commerce/productDetails/facebook.svg";
import twitter from "@/assets/images/e-commerce/productDetails/twitter.svg";
import insta from "@/assets/images/e-commerce/productDetails/insta.svg";
import linkedin from "@/assets/images/e-commerce/productDetails/linkedin.svg";

import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThumbSliderCom from "@/components/partials/ecommerce/thumb-slider";
import { addToCart, updateQuantity } from "@/store/api/shop/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@/components/ui/Alert";
import LoaderCircle from "@/components/Loader-circle";
import { api } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { formatCurrency, calculateDiscount, formatDate } from "@/utils/format";
import { toast } from "react-toastify";

export const ProductDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const buttons = [
    {
      title: t("productDetails.description"),
    },
    {
      title: t("productDetails.additionalInformation"),
    },
  ];

  // Helper function to map API displayStatus to status code
  const mapDisplayStatus = (displayStatus) => {
    if (!displayStatus) return "active";
    if (displayStatus === "Out of Stock") return "out_of_stock";
    if (displayStatus === "Hidden" || displayStatus === "hidden") return "hidden";
    return "active";
  };

  // Get status config for displayStatus badge
  const getStatusConfig = (displayStatus) => {
    const status = mapDisplayStatus(displayStatus);
    const statusConfig = {
      active: { 
        label: t("products.active"), 
        class: "bg-success-500 text-white" 
      },
      out_of_stock: { 
        label: t("products.outOfStock"), 
        class: "bg-danger-500 text-white" 
      },
      hidden: { 
        label: t("products.hidden"), 
        class: "bg-slate-500 text-white" 
      },
    };
    return statusConfig[status] || statusConfig.active;
  };

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(API_ENDPOINTS.CATALOG.GET_PRODUCT_DETAIL(id));
        
        if (response.data && response.data.result && response.data.result.product) {
          const productData = response.data.result.product;
          
          // Set initial color and size from API data
          if (productData.colors && productData.colors.length > 0) {
            setColor(productData.colors[0].trim());
          }
          if (productData.sizes && productData.sizes.length > 0) {
            setSize(productData.sizes[0].trim());
          }
          
          setProduct(productData);
        } else {
          setError(t("productDetails.productNotFound"));
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError(err.response?.data?.message || err.message || t("productDetails.failedToLoad"));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, t]);

  // Handle toggle publish/unpublish
  const handleTogglePublish = async () => {
    if (!product || isUpdating) return;

    try {
      setIsUpdating(true);
      const isCurrentlyPublished = product.published;
      const endpoint = isCurrentlyPublished 
        ? API_ENDPOINTS.CATALOG.UNPUBLISH_PRODUCT(id)
        : API_ENDPOINTS.CATALOG.PUBLISH_PRODUCT(id);
      
      const response = await api.post(endpoint);

      if (response && response.status >= 200 && response.status < 300) {
        setProduct((prev) => ({
          ...prev,
          published: !isCurrentlyPublished,
        }));
        toast.success(
          !isCurrentlyPublished 
            ? t("productDetails.publishSuccess") 
            : t("productDetails.unpublishSuccess"),
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
      }
    } catch (err) {
      console.error("Failed to update publish status:", err);
      toast.error(t("productDetails.updateError"), {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <LoaderCircle />;
  }

  if (error) {
    return (
      <Alert className="alert-danger" icon="heroicons:information-circle">
        {t("productDetails.error")}: {error}
      </Alert>
    );
  }

  if (!product) {
    return (
      <div>
        <Alert className="alert-danger" icon="heroicons:information-circle">
          {t("productDetails.productNotFound")}
        </Alert>
      </div>
    );
  }

  // Prepare colors and sizes from API data
  const colors = product.colors && product.colors.length > 0 
    ? product.colors.map(c => ({ code: c.trim() }))
    : [{ code: t("productDetails.notAvailable") }];
  
  const sizes = product.sizes && product.sizes.length > 0
    ? product.sizes.map(s => ({ code: s.trim() }))
    : [{ code: t("productDetails.notAvailable") }];

  // Prepare images for slider (thumbnail + images array)
  // Map to URLs for ThumbSliderCom
  const productImages = [];
  if (product.thumbnail?.publicURL) {
    productImages.push(product.thumbnail.publicURL);
  }
  if (product.images && Array.isArray(product.images)) {
    product.images.forEach(img => {
      if (img.publicURL) {
        productImages.push(img.publicURL);
      }
    });
  }

  return (
    <div className="w-full bg-white dark:bg-slate-800 p-6 rounded-lg">
      {/* Header with Publish/Unpublish Button */}
      <div className="flex justify-between items-start mb-5">
        <div></div>
        <div className="flex justify-end">
          <Button
            onClick={handleTogglePublish}
            disabled={isUpdating}
            className={`${
              product.published
                ? "bg-danger-500 hover:bg-danger-600"
                : "bg-success-500 hover:bg-success-600"
            } text-white`}
          >
            {isUpdating ? (
              <>
                <Icon icon="heroicons:arrow-path" className="animate-spin mr-2" />
                {t("productDetails.updating")}
              </>
            ) : product.published ? (
              <>
                <Icon icon="heroicons:x-mark" className="mr-2" />
                {t("productDetails.unpublish")}
              </>
            ) : (
              <>
                <Icon icon="heroicons:check" className="mr-2" />
                {t("productDetails.publish")}
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="pb-5">
        <div className="grid grid-cols-12  md:space-x-6 md:space-y-0 space-y-4 sm:space-y-4  rtl:space-x-reverse ">
          <div className=" col-span-12 md:col-span-5 lg:col-span-4 space-y-4 ">
            <ThumbSliderCom product={{ ...product, images: productImages }} />
          </div>
          <div className="col-span-12 md:col-span-7 lg:col-span-8 space-y-2 ">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                {product.featured && (
                  <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-medium">
                    {t("productDetails.featured")}
                  </Badge>
                )}
                <Badge 
                  className={
                    product.published 
                      ? "bg-success-500 text-white" 
                      : "bg-slate-500 text-white"
                  }
                >
                  {product.published ? t("productDetails.published") : t("productDetails.unpublished")}
                </Badge>
                {product.displayStatus && (() => {
                  const statusConfig = getStatusConfig(product.displayStatus);
                  return (
                    <Badge className={statusConfig.class}>
                      {statusConfig.label}
                    </Badge>
                  );
                })()}
              </div>
              <h1 className="text-slate-900 dark:text-slate-300 text-xl lg:text-2xl font-medium ">
                {product?.name}
              </h1>
              <p className="flex items-center text-slate-900 dark:text-slate-300  font-normal text-sm lg:text-base space-x-1.5 rtl:space-x-reverse">
                <Icon icon="ph:star-fill" className="text-yellow-400" />
                <Icon icon="ph:star-fill" className="text-yellow-400" />
                <Icon icon="ph:star-fill" className="text-yellow-400" />
                <Icon icon="ph:star-fill" className="text-yellow-400" />
                <Icon icon="ph:star-fill" className="text-slate-300/80" />
                <span className="ltr:pl-2 rtl:pr-2 text-slate-500 dark:text-slate-400">
                  {t("productDetails.reviews", { count: 789 })}
                </span>
              </p>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400 ">
                  {t("productDetails.sku")}:
                </p>
                <p className="font-medium text-sm lg:text-base text-slate-900 dark:text-slate-300 ">
                  {product.sku || t("productDetails.notAvailable")}
                </p>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400 ">
                  {t("productDetails.brand")}:
                </p>
                <p className="font-medium text-sm lg:text-base text-slate-900 dark:text-slate-300 ">
                  {product.brandName || t("productDetails.notAvailable")}
                </p>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400 ">
                  {t("productDetails.available")}:
                </p>
                <p className="font-medium text-sm lg:text-base text-slate-900 dark:text-slate-300 ">
                  {product.isAvaiable ? t("productDetails.inStock") : product.displayStatus || t("productDetails.outOfStock")}
                </p>
              </div>
            </div>
            <div className="pb-1">
              <div className="mb-4">
                <div className="pb-2 flex items-center space-x-2 rtl:space-x-reverse mb-3">
                  <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400 ">
                    {t("productDetails.color")}:
                  </p>
                  <p className="font-medium text-sm lg:text-base text-slate-900 dark:text-slate-300 ">
                    {color}
                  </p>
                </div>
                <div className="flex space-x-4 rtl:space-x-reverse h-6 ">
                  {colors.map((innerColor, i) => {
                    return (
                      <label key={i}>
                        <input
                          type="radio"
                          name="color"
                          value={innerColor.code}
                          onChange={() => setColor(innerColor.code)}
                          className="hidden"
                        />
                        <div
                          style={{ backgroundColor: innerColor.code }}
                          className={`h-7 w-7 ${
                            innerColor.code === color
                              ? "ring-slate-900! dark:ring-slate-200!"
                              : ""
                          } ring-1 ring-slate-400 dark:ring-slate-900 ring-offset-2 ring-offset-white dark:ring-offset-slate-700! cursor-pointer rounded-sm`}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="pb-2 flex items-center space-x-2 rtl:space-x-reverse mb-3">
                  <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400 ">
                    {t("productDetails.size")}:
                  </p>
                  <p className="font-medium text-base text-slate-900 dark:text-slate-300 ">
                    {size}
                  </p>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4 h-6 ">
                  {sizes.map((list, i) => {
                    return (
                      <label key={i}>
                        <input
                          type="radio"
                          name="color"
                          value={list.code}
                          onChange={() => setSize(list.code)}
                          className="hidden h-7 w-7"
                        />
                        <div
                          style={{ backgroundColor: list.code }}
                          className={`h-7 w-7 ${
                            list.code === size
                              ? "ring-slate-900! dark:ring-slate-200!"
                              : ""
                          } ring-1 ring-slate-400 dark:ring-slate-900 ring-offset-2 flex justify-center items-center ring-offset-white cursor-pointer dark:ring-offset-slate-700 rounded-sm`}
                        >
                          {list.code}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full border-t border-slate-300 dark:border-slate-600!"></div>

            <div className="overflow-x-auto ">
              <div className="inline-block max-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full   ">
                    <tbody className="bg-white  dark:bg-slate-800 ">
                      <tr className="space-x-6 rtl:space-x-reverse">
                        <td className="table-td py-2 pl-0 rtl:pr-0 font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400  ">
                          {t("productDetails.price")}:
                        </td>
                        <td className="table-td py-2 space-x-2 rtl:space-x-reverse">
                          {product.salePrice ? (
                            <>
                              <span className="text-slate-900 dark:text-slate-300 font-semibold	text-base lg:text-xl">
                                {formatCurrency(product.salePrice)}
                              </span>
                              <del className="text-slate-500 dark:text-slate-400 font-semibold text-base lg:text-xl ">
                                {formatCurrency(product.price)}
                              </del>
                              {calculateDiscount(product.price, product.salePrice) > 0 && (
                                <Badge className=" font-normal text-[10px] bg-danger-600 text-white ">
                                  <span>{calculateDiscount(product.price, product.salePrice)}%</span>
                                </Badge>
                              )}
                            </>
                          ) : (
                            <span className="text-slate-900 dark:text-slate-300 font-semibold	text-base lg:text-xl">
                              {formatCurrency(product.price)}
                            </span>
                          )}
                        </td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="space-y-5">
        {/* Description and Additional Information */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-sm">
          <Card>
            <TabGroup>
              <TabList className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
                {buttons.map((item, i) => (
                  <Tab as={Fragment} key={i}>
                    {({ selected }) => (
                      <button
                        className={` text-lg lg:text-xl font-medium mb-7 capitalize bg-white
             dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-hidden px-2
              transition duration-150 before:transition-all before:duration-150 relative 
              before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-slate-900 dark:before:bg-slate-300 
              before:-translate-x-1/2 
              
              ${
                selected
                  ? "text-slate-900 dark:text-slate-300 font-md text-lg lg:text-xl  before:w-full"
                  : "text-slate-500 dark:text-slate-500 font-md text-lg lg:text-xl before:w-0 "
              }
              `}
                      >
                        {item.title}
                      </button>
                    )}
                  </Tab>
                ))}
              </TabList>
              <TabPanels>
                <TabPanel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm lg:text-base font-normal">
                    {product.shortDescription && (
                      <p className="mb-4">{product.shortDescription}</p>
                    )}
                    {product.longDescription && (
                      <div>
                        <p className="mb-4">{product.longDescription}</p>
                      </div>
                    )}
                    {product.tags && product.tags.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium mb-2">{t("productDetails.tags")}:</p>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag, i) => (
                            <Badge key={i} className="bg-primary-500/10 text-primary-500">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    <div className="space-y-3">
                      {product.sku && (
                        <div className="flex space-x-2 items-center rtl:space-x-reverse">
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>{t("productDetails.sku")}: {product.sku}</span>
                        </div>
                      )}
                      {product.brandName && (
                        <div className="flex space-x-2 items-center rtl:space-x-reverse">
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>{t("productDetails.brand")}: {product.brandName}</span>
                        </div>
                      )}
                      {product.categoryNames && product.categoryNames.length > 0 && (
                        <div className="flex space-x-2 items-center rtl:space-x-reverse">
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>{t("productDetails.category")}: {product.categoryNames.join(", ")}</span>
                        </div>
                      )}
                      {product.unit && (
                        <div className="flex space-x-2 items-center rtl:space-x-reverse">
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>{t("productDetails.unit")}: {product.unit}</span>
                        </div>
                      )}
                      {product.weight && (
                        <div className="flex space-x-2 items-center rtl:space-x-reverse">
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>{t("productDetails.weight")}: {product.weight} {t("productDetails.kg")}</span>
                        </div>
                      )}
                      {product.colors && product.colors.length > 0 && (
                        <div className="flex space-x-2 items-center rtl:space-x-reverse">
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>{t("productDetails.colors")}: {product.colors.join(", ")}</span>
                        </div>
                      )}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex space-x-2 items-center rtl:space-x-reverse">
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>{t("productDetails.sizes")}: {product.sizes.join(", ")}</span>
                        </div>
                      )}
                      {product.seoTitle && (
                        <div className="flex space-x-2 items-center rtl:space-x-reverse">
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>{t("productDetails.seoTitle")}: {product.seoTitle}</span>
                        </div>
                      )}
                      {product.seoDescription && (
                        <div className="flex space-x-2 items-center rtl:space-x-reverse">
                          <span className="h-[10px] w-[10px] bg-slate-900 dark:bg-slate-400 rounded-full inline-block"></span>
                          <span>{t("productDetails.seoDescription")}: {product.seoDescription}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </Card>
        </div>

        {/* Metadata Section */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-sm p-6">
          <h6 className="text-slate-900 dark:text-slate-300 pb-4 text-lg lg:text-xl font-medium">
            {t("productDetails.metadata")}
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.createdBy && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  {t("productDetails.createdBy")}:
                </p>
                <p className="text-sm text-slate-900 dark:text-slate-300 font-medium">
                  {product.createdBy}
                </p>
              </div>
            )}
            {product.createdOnUtc && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  {t("productDetails.createdOn")}:
                </p>
                <p className="text-sm text-slate-900 dark:text-slate-300 font-medium">
                  {formatDate(product.createdOnUtc)}
                </p>
              </div>
            )}
            {product.lastModifiedBy && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  {t("productDetails.lastModifiedBy")}:
                </p>
                <p className="text-sm text-slate-900 dark:text-slate-300 font-medium">
                  {product.lastModifiedBy}
                </p>
              </div>
            )}
            {product.lastModifiedOnUtc && (
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                  {t("productDetails.lastModifiedOn")}:
                </p>
                <p className="text-sm text-slate-900 dark:text-slate-300 font-medium">
                  {formatDate(product.lastModifiedOnUtc)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews and Ratings */}
        <div className="border border-slate-200 dark:border-slate-700 rounded-sm p-6">
          <h6 className="text-slate-900 dark:text-slate-300 pb-6 text-lg lg:text-xl">
            {t("productDetails.reviewsAndRatings")}
          </h6>
          <div className="space-y-12">
            <div className="bg-secondary-100 dark:bg-slate-700 p-6 rounded-sm grid grid-cols-12 	">
              <div className="col-span-12 items-center md:col-span-6 flex space-x-3 justify-center md:justify-start rtl:space-x-reverse order-2 md:order-1 mt-3 md:mt-0">
                <div className="font-medium items-center flex ">
                  <p className="text-slate-900 dark:text-slate-300 text-base lg:text-lg">
                    4.2
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-base">
                    /5
                  </p>
                </div>
                <div className="flex items-center md:justify-start text-slate-900 dark:text-slate-300 font-normal text-sm lg:text-base">
                  <div className="flex items-center space-x-1.5">
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-slate-300/80" />
                  </div>
                  <div className=" text-slate-500 dark:text-slate-400">
                    {t("productDetails.reviews", { count: 789 })}
                  </div>
                </div>
              </div>
            </div>

            {/* Review Item */}
            <div className="flex space-x-3 rtl:space-x-reverse ">
              <div className=" h-14 w-14 rounded-full object-cover bg-white ring-1 overflow-hidden flex-none">
                <img
                  className="h-full w-full object-contain"
                  src={blackJumper}
                />
              </div>
              <div>
                {" "}
                <div>
                  <p className="text-slate-900  dark:text-slate-300 font-medium text-sm lg:text-base pb-1">
                    Devied Beakhum
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 font-normal text-xs  pb-1">
                    08-03-2023
                  </p>
                  <p className="flex items-center text-slate-900 dark:text-slate-300  font-normal text-sm lg:text-base space-x-1.5 rtl:space-x-reverse pb-3">
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                    <Icon icon="ph:star-fill" className="text-yellow-400" />
                  </p>
                  <p className="pb-4 text-sm lg:text-base text-slate-500 dark:text-slate-400">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna. Lori ipsum dolor sit amet, consetetur sadipscing
                    elitr, sed diam nonumy eirmod tempor invidunt.
                  </p>
                  <div className="flex space-x-2 rtl:space-x-reverse pb-3">
                    <p className="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400">
                      {t("productDetails.info")}:
                    </p>
                    <p className="font-medium text-sm lg:text-base text-[#10B26C] ">
                      {t("productDetails.verifiedPurchase")}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className=" col-span-12 mb-3">
                    <div className="flex space-x-2 rtl:space-x-reverse mb-9">
                      <div className=" h-[90px] w-[90px] rounded-sm bg-slate-100 p-1 overflow-hidden ">
                        <img
                          className="h-full w-full object-contain"
                          src={three}
                        />
                      </div>
                      <div className=" h-[90px] w-[90px] rounded-sm bg-slate-100 overflow-hidden p-1">
                        <img
                          className="h-full w-full object-contain"
                          src={one}
                        />
                      </div>
                      <div className=" h-[90px] w-[90px] rounded-sm bg-slate-100 overflow-hidden p-1">
                        <img
                          className="h-full w-full object-contain"
                          src={two}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 flex justify-end space-x-4 rtl:space-x-reverse">
                    <p className="flex items-center space-x-2 rtl:space-x-reverse ">
                      <span className="cursor-pointer ">
                        <Icon icon="heroicons:hand-thumb-up" />
                      </span>
                      <span>02</span>
                    </p>
                    <p className="flex items-center space-x-2 rtl:space-x-reverse ">
                      <span className="cursor-pointer ">
                        <Icon icon="carbon:reply" />
                      </span>
                      <span>00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
