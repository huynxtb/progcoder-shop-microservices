import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { current } from "@reduxjs/toolkit";
import CounterButton from "@/components/partials/ecommerce/counter-button";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "@/store/api/shop/cartSlice";
import { Link } from "react-router-dom";

const ProductBox = ({ item, wish }) => {
  const dispatch = useDispatch();

  const {
    name,
    category,
    img,
    rating,
    subtitle,
    price,
    oldPrice,
    percent,
    id,
  } = item;
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Card bodyClass="p-4 rounded-md" className="group ">
      <Link to={item.id}>
        <div className=" bg-secondary-200 dark:rounded-sm relative h-[191px] flex flex-col justify-center items-center mb-3 rounded-md">
          <div className="h-[146px]">
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
              {wish ? (
                <button className="bg-white p-2.5  mb-1.5 rounded-full hover:bg-danger-600  dark:hover:bg-danger-600 hover:text-white dark:hover:text-white dark:text-slate-400">
                  <Icon icon="heroicons:trash" />
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </Link>

      <div>
        <div className="flex justify-between items-center ">
          <p className="text-xs	text-slate-900 dark:text-slate-300 uppercase font-normal">
            {category}
          </p>
          {rating && (
            <span className="flex items-center text-slate-900 dark:text-slate-300  font-normal text-xs space-x-1  rtl:space-x-reverse ">
              <Icon icon="ph:star-fill" className="text-yellow-400" />
              <span>{rating}</span>
            </span>
          )}
        </div>
        <h6 className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate	">
          <Link to={item.id}>{name}</Link>
        </h6>
        <p className="text-slate-500 dark:text-slate-500  text-[11px]  font-normal mt-1.5">
          {subtitle}
        </p>
        <p className="pb-4">
          <span className="text-slate-900 dark:text-slate-300 text-base	font-medium mt-2	 ltr:mr-2 rtl:mr-2">
            ${price}
          </span>
          <del className="text-slate-500 dark:text-slate-500  font-normal text-base		">
            {oldPrice}
          </del>
        </p>
        {cartItems.some((cartItem) => cartItem.id === id) ? (
          <CounterButton product={item} />
        ) : (
          <Button
            onClick={() => handleAddToCart(item)}
            disabled={cartItems.some((cartItem) => cartItem.id === id)}
            text="Add to Cart"
            icon="heroicons:shopping-bag"
            className="btn-outline-dark w-full btn-sm  font-medium hover:bg-slate-900 hover:text-white dark:hover:text-white  dark:hover:bg-slate-700 "
            iconClass=" text-sm leading-none"
          />
        )}
      </div>
    </Card>
  );
};

export default ProductBox;
