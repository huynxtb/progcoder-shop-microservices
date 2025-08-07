import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useCycle } from "framer-motion";
import CartPanel from "../../cart";

const HeaderCart = () => {
  const { items } = useSelector((state) => state.cart);
  const [isOpen, toggleOpen] = useCycle(false, true);

  const handleOpenCart = () => {
    toggleOpen();
  };
  return (
    <div>
      <motion.span
        onClick={handleOpenCart}
        className="relative lg:h-[32px] lg:w-[32px] lg:bg-slate-100 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center"
      >
        <Icon icon="heroicons:shopping-cart" />
        <span className="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-99">
          {items.length}
        </span>
      </motion.span>
      <CartPanel close={handleOpenCart} open={isOpen} />
    </div>
  );
};

export default HeaderCart;
