import React from "react";
import Icon from "@/components/ui/Icon";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "@/store/api/shop/cartSlice"; // Adjust the import path based on your project structure

const CounterButton = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);

  const handleIncreaseQuantity = () => {
    if (cartItem && cartItem.quantity < 10) {
      dispatch(
        updateQuantity({ id: product.id, quantity: cartItem.quantity + 1 })
      );
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      dispatch(
        updateQuantity({ id: product.id, quantity: cartItem.quantity - 1 })
      );
    }
  };

  return (
    <div className="flex space-x-4 rtl:space-x-reverse items-center ">
      <div className="flex-1 h-8 flex  border-1 border-slate-900 delay-150 ease-in-out dark:border-slate-600! divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-slate-900 dark:divide-slate-600! rounded-sm">
        <button
          onClick={handleDecreaseQuantity}
          disabled={!cartItem || cartItem.quantity <= 1}
          type="button"
          className="flex-none px-2 dark:text-white text-slate-900 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 "
        >
          <Icon icon="eva:minus-fill" />
        </button>

        <div className="flex-1 w-[62px] text-center flex items-center justify-center">
          {cartItem ? cartItem.quantity : 0}
        </div>
        <button
          onClick={handleIncreaseQuantity}
          disabled={!cartItem || cartItem.quantity >= 10}
          type="button"
          className="flex-none px-2 disabled:cursor-not-allowed disabled:opacity-50 text-slate-900 hover:bg-slate-900 hover:text-white dark:text-white dark:hover:bg-slate-700 dark:hover:rtl:rounded-l dark:hover:ltr:rounded-r"
        >
          <Icon icon="eva:plus-fill" />
        </button>
      </div>
    </div>
  );
};

export default CounterButton;
