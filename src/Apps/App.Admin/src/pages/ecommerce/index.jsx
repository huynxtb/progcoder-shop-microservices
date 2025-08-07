import React, { useState } from "react";

import Card from "@/components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Icon from "@/components/ui/Icon";
import ProductBox from "@/components/partials/ecommerce/product-box";
import {
  categories,
  brands,
  price,
  ratings,
  selectOptions,
  selectCategory,
} from "@/constant/data";

import ProductList from "@/components/partials/ecommerce/product-list";
import CheckboxSingle from "@/components/partials/ecommerce/checkbox-single";
import CatagoriesFilterCheckbox from "@/components/partials/ecommerce/catagories-filter-checkbox";
import PriceCheckbox from "@/components/partials/ecommerce/price-checkbox";
import BrandsCheckbox from "@/components/partials/ecommerce/brands-checkbox";
import clsx from "clsx";
import Select from "react-select";
import { useGetProductsQuery } from "@/store/api/shop/shopApiSlice";
import {
  updateSearchFilter,
  updateCategoryFilter,
} from "@/store/api/shop/action";
import { useSelector, useDispatch } from "react-redux";
import Alert from "@/components/ui/Alert";
import LoaderCircle from "@/components/Loader-circle";

const Ecommerce = () => {
  // all products get

  const dispatch = useDispatch();

  const { data: getProduct, isLoading, isError, error } = useGetProductsQuery();

  const products = getProduct?.products || [];
  const searchFilter = useSelector((state) => state.cart.filters.search);
  const categoryFilter = useSelector((state) => state.cart.filters.category);

  const styles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "trasparent",
    }),

    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  // search
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    dispatch(updateSearchFilter(searchTerm));
  };
  // category

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    dispatch(updateCategoryFilter(category));
  };

  const [view, setView] = useState("grid");

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchFilter.toLowerCase())
    )

    .filter(
      (product) =>
        categoryFilter === "all" || product.category === categoryFilter
    );

  if (isLoading) {
    return <LoaderCircle />;
  }
  if (isError) {
    return <Alert> Something is mismatch...</Alert>;
  }
  return (
    <div>
      <div className="grid grid-cols-12  gap-5">
        <Card className="lg:col-span-3 lg:block  hidden   xs h-max col-span-12">
          <InputGroup
            type="text"
            prepend={<Icon icon="heroicons-outline:search" />}
            placeholder="Search"
            merged
            value={searchFilter}
            onChange={handleSearchChange}
          />
          <div className="space-y-1  divide-y divide-slate-200  dark:divide-slate-700! ">
            <div className="space-y-1 -ms-6 px-6 py-3 ">
              <div className="text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase py-2">
                categories
              </div>
              {categories.map((category, i) => (
                <CatagoriesFilterCheckbox
                  key={`cata_key_${i}`}
                  categoryFilter={categoryFilter}
                  handleCategoryChange={handleCategoryChange}
                  category={category}
                />
              ))}

              <button className="text-xs font-medium text-slate-900  dark:text-slate-300 pt-1">
                View Less
              </button>
            </div>
            <div className="space-y-1 -ms-6 px-6 py-3 ">
              <div className="text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase py-2">
                brands
              </div>
              {brands.map((brand, i) => (
                <BrandsCheckbox key={`brand_key_${i}`} brand={brand} />
              ))}

              <button className="text-xs font-medium text-slate-900  dark:text-slate-300 pt-1">
                View Less
              </button>
            </div>
            <div className="space-y-1 -ms-6 px-6 py-3 ">
              <div className="text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase py-2">
                price
              </div>
              {price.map((item, i) => (
                <PriceCheckbox key={`price_key_${i}`} item={item} />
              ))}
              {/* tests */}
            </div>
            <div className="space-y-1 -ms-6 px-6 py-3 ">
              <div className="text-slate-800 dark:text-slate-200 font-semibold text-xs uppercase py-2">
                ratings
              </div>
              {ratings.map((item, i) => (
                <CheckboxSingle key={`checkbox_key_${i}`} item={item} />
              ))}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-9  col-span-12">
          <div>
            {/* header for product filter */}
            <div className="md:flex mb-6 md:space-y-0 space-y-4">
              <div className="flex-1 flex  items-center space-x-3 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  className={clsx(
                    " border border-slate-400 dark:border-slate-700 text-slate-400 rounded-sm h-11 w-11  inline-flex  items-center  justify-center transition-all duration-200",
                    {
                      "border-slate-900 text-slate-900 dark:border-slate-300/80 dark:text-slate-200":
                        view === "grid",
                    }
                  )}
                >
                  <Icon icon="heroicons:view-columns" className=" w-6 h-6" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={clsx(
                    " border border-slate-400 dark:border-slate-700 text-slate-400 rounded-sm h-11 w-11  inline-flex  items-center  justify-center transition-all duration-200",
                    {
                      "border-slate-900 text-slate-900 dark:border-slate-300/80  dark:text-slate-200":
                        view === "list",
                    }
                  )}
                >
                  <Icon className=" w-6 h-6" icon="heroicons:list-bullet" />
                </button>
              </div>
              <div className="flex-none sm:flex items-center sm:space-x-4 sm:rtl:space-x-reverse sm:space-y-0 space-y-2">
                <div className=" flex space-x-3  rtl:space-x-reverse  items-center">
                  <label
                    htmlFor="select"
                    className="text-sm font-normal text-[#68768A] "
                  >
                    Show:
                  </label>
                  <Select
                    className="rounded-sm text-sm font-normal text-[#68768A]"
                    classNamePrefix="select"
                    defaultValue={selectOptions[0]}
                    options={selectOptions}
                    styles={styles}
                    id="hh"
                  />
                </div>
                <div className=" flex space-x-3  rtl:space-x-reverse items-center">
                  <label
                    htmlFor="select"
                    className="text-sm font-normal text-[#68768A] "
                  >
                    Sort by:
                  </label>
                  <Select
                    className="rounded-sm text-sm font-normal text-[#68768A]"
                    classNamePrefix="select"
                    defaultValue={selectCategory[0]}
                    options={selectCategory}
                    styles={styles}
                    id="hh"
                  />
                </div>
              </div>
            </div>
            {/* content */}
            {/* product grid view */}
            {view === "grid" && (
              <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 h-max">
                {filteredProducts.length > 0 ? (
                  filteredProducts?.map((item, i) => (
                    <ProductBox key={`grid_key_${i}`} item={item} />
                  ))
                ) : (
                  <div className=" col-span-12">
                    <Alert className="bg-red-500/40 text-white py-2">
                      There is No Product
                    </Alert>
                  </div>
                )}
              </div>
            )}
            {/* product list view  */}
            {view === "list" && (
              <div className=" space-y-3 grid-cols-1 gap-5 h-max">
                {filteredProducts.length > 0 ? (
                  filteredProducts?.map((item, i) => (
                    <div key={`list_key_${i}`}>
                      <ProductList item={item} key={i} />
                    </div>
                  ))
                ) : (
                  <Alert className="bg-red-500/40 text-white py-2">
                    There is No Product
                  </Alert>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
