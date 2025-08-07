import React, { Fragment } from "react";
import Icon from "@/components/ui/Icon";
import SimpleBar from "simplebar-react";
import { useSelector, useDispatch } from "react-redux";
import { motion, useCycle } from "framer-motion";
import Button from "@/components/ui/Button";
import { removeFromCart, updateQuantity } from "@/store/api/shop/cartSlice";
import CartItem from "./cart-item";
import NoItem from "./no-item";
import clsx from "clsx";
const variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 160px 50px )",
    transition: {
      delay: 0.34,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const variants2 = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const CartPanel = ({ open, close }) => {
  const { items, totalPrice } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const handleIncreaseQuantity = (productId) => {
    const item = items.find((item) => item.id === productId);

    if (item && item.quantity < 10) {
      dispatch(updateQuantity({ id: productId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const item = items.find((item) => item.id === productId);

    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id: productId, quantity: item.quantity - 1 }));
    }
  };
  return (
    <div>
      <motion.div
        className={`
        setting-wrapper fixed ltr:right-0 rtl:left-0 top-0 md:w-[400px] w-[300px]
         bg-white dark:bg-slate-800 h-screen z-9999   shadow-base2
          dark:shadow-base3 border border-slate-200 dark:border-slate-700 
          ${open ? "ml-0" : " ml-[-400px]"}
        `}
        animate={open ? "open" : "closed"}
        variants={variants}
      >
        <div className="px-6 h-full overflow-y-auto flex flex-col">
          <header className=" sticky flex-none top-0 bg-white dark:bg-slate-800 flex items-center justify-between border-b border-slate-100 dark:border-slate-700 -mx-5 px-6 py-[15px] mb-6">
            <div>
              <span className="block text-xl text-slate-900 font-medium dark:text-[#eee]">
                Cart
              </span>
              <span className="block text-sm font-light text-[#68768A] dark:text-[#eee]">
                Total Price ${totalPrice}
              </span>
            </div>
            <div
              className="cursor-pointer text-2xl text-slate-800 dark:text-slate-200"
              onClick={close}
            >
              <Icon icon="heroicons-outline:x" />
            </div>
          </header>
          <motion.div
            className={clsx(
              "divide-y divide-slate-200 dark:divide-slate-700 flex-1",
              {
                "flex flex-col justify-center": items.length <= 0,
              }
            )}
          >
            {items.length > 0 ? (
              items?.map((item, i) => (
                <motion.div
                  variants={variants2}
                  key={i}
                  className=" py-5 -mx-6 px-6"
                >
                  <CartItem
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleIncreaseQuantity={handleIncreaseQuantity}
                    handleDecreaseQuantity={handleDecreaseQuantity}
                    item={item}
                  />
                </motion.div>
              ))
            ) : (
              <NoItem />
            )}
          </motion.div>

          <footer className="bg-white dark:bg-slate-800 py-6 sticky  flex-none bottom-0 -mx-6 px-6  space-y-4 border-t border-slate-200 dark:border-slate-700">
            <div className=" flex justify-between text-base font-medium leading-none text-slate-900 dark:text-white ">
              <span>Subtotal:</span>
              <span>${totalPrice}</span>
            </div>
            {items.length > 0 && (
              <div className=" flex justify-between space-x-3 rtl:space-x-reverse">
                <Button
                  text="Continue to Shipping"
                  className="flex-1 btn-dark "
                />
                <Button
                  text="View Cart"
                  className="flex-1 btn-dark "
                  link="cart"
                />
              </div>
            )}
          </footer>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPanel;
