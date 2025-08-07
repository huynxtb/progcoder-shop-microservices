import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import CounterButton from "@/components/partials/ecommerce/counter-button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "@/store/api/shop/cartSlice";
import { Link } from "react-router-dom";
const ProductList = ({ item }) => {
  const dispatch = useDispatch();
  const { name, category, img, rating, desc, price, oldPrice, percent, id } =
    item;
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Card
      bodyClass="p-3 rounded-md 2xl:flex lg:flex md:flex-none sm:flex-none"
      className="group "
    >
      <Link to={item.id}>
        <div className=" bg-secondary-200 dark:rounded-sm relative h-[259px] flex flex-col justify-center items-center rounded-md  mb-3 lg:mb-0   md:ltr:mr-0 sm:ltr:mr-0 md:rtl:ml-0 sm:rtl:ml-0 lg:ltr:mr-3 lg:rtl:ml-3">
          <div className="h-[235px]  w-[266px] p-12">
            <img
              className="  h-full w-full  object-contain  transition-all duration-300 group-hover:scale-105"
              src={img}
              alt={name}
            />
            {percent && (
              <Badge className=" font-normal bg-danger-600 text-white absolute ltr:left-2 rtl:right-2 top-3">
                {percent}
              </Badge>
            )}
            <div className="hover-box flex flex-col invisible absolute ltr:right-2 rtl:left-2 top-2 opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ">
              <button className="bg-white p-2.5  mb-1.5 rounded-full">
                <Icon
                  icon="ph:heart-fill"
                  className="text-slate-400 dark:text-slate-400 hover:text-danger-600 dark:hover:text-danger-600"
                />
              </button>
              <button className="bg-white p-2.5 mb-1.5 rounded-full  ">
                <Icon
                  icon="ph:eye"
                  className="text-slate-400 dark:text-slate-400 hover:text-danger-600  dark:hover:text-danger-600"
                />
              </button>
              <button className="bg-white p-2.5 mb-1.5 rounded-full ">
                <Icon
                  icon="jam:refresh-reverse"
                  className="text-slate-400 dark:text-slate-400 hover:text-danger-600  dark:hover:text-danger-600"
                />
              </button>
            </div>
          </div>
        </div>
      </Link>

      <div>
        <p className="text-xs	text-slate-900 dark:text-slate-300 font-normal uppercase pb-2">
          {category}
        </p>
        <h6 className="text-slate-900 dark:text-slate-300 text-lg	font-medium	pb-2 w-full truncate">
          <Link to={item.id}>{name}</Link>
        </h6>
        <p className="pb-2 space-x-2 rtl:space-x-reverse">
          <span className="text-slate-900 dark:text-slate-300 text-lg	font-semibold ">
            ${price}
          </span>
          <del className="text-slate-500 dark:text-slate-500 font-semibold text-lg">
            {oldPrice}
          </del>
        </p>
        {rating && (
          <span className="flex items-center text-slate-900 dark:text-slate-300  font-normal text-xs space-x-[4px] rtl:space-x-reverse pb-3">
            <Icon icon="ph:star-fill" className="text-yellow-400" />
            <Icon icon="ph:star-fill" className="text-yellow-400" />
            <Icon icon="ph:star-fill" className="text-yellow-400" />
            <Icon icon="ph:star-fill" className="text-yellow-400" />
            <span className="ltr:pl-2 rtl:pr-2">{rating}</span>
          </span>
        )}
        <p className="text-slate-500 dark:text-slate-500  text-sm  font-normal pb-4">
          {desc}
        </p>
        <div className="flex space-x-4 rtl:space-x-reverse max-w-[370px]">
          <CounterButton product={item} />

          <button
            onClick={() => handleAddToCart(item)}
            disabled={cartItems.some((cartItem) => cartItem.id === id)}
            className="font-medium text-sm flex items-center max-w-[202px] px-4  disabled:cursor-not-allowed disabled:opacity-50 border-slate-900 dark:border-slate-700 border hover:bg-slate-900 rounded-sm hover:text-white dark:hover:text-white dark:hover:bg-slate-700 ml-3 rtl:mr-3"
            iconClass=" text-sm leading-none"
          >
            <Icon icon="heroicons:shopping-bag" className="ltr:mr-2 rtl:ml-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProductList;
