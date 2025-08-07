import React from "react";
import Icon from "@/components/ui/Icon";
function CartItem({
  item,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleRemoveFromCart,
}) {
  return (
    <div className="flex space-x-4 rtl:space-x-reverse">
      <div className="flex-none">
        <div className="md:w-20 md:h-20 w-14 h-14 bg-slate-200  rounded-sm">
          <img
            src={item.img}
            alt=""
            className=" w-full h-full object-cover p-3"
          />
        </div>
      </div>
      <div className="flex-1  space-y-1 truncate">
        <div className=" md:text-base text-sm  truncate   font-normal  text-slate-900 dark:text-white">
          {item.name}
        </div>
        <div className=" text-sm text-slate-500 dark:text-slate-400 pb-2">
          Price: <span className=" text-xs">${item.price * item.quantity}</span>
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-1 h-8 md:max-w-[112px] max-w-[95px] flex border border-1 border-slate-900 delay-150 ease-in-out dark:border-slate-600 divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-slate-900 dark:divide-slate-600 rounded-sm">
            <button
              className="md:px-3 px-2 disabled:cursor-not-allowed"
              onClick={() => handleDecreaseQuantity(item.id)}
              disabled={item.quantity <= 1}
            >
              <Icon icon="eva:minus-fill" />
            </button>

            <span className="flex-1 text-xs  text-center flex items-center justify-center">
              {item.quantity}
            </span>
            <button
              className="md:px-3 px-2 disabled:cursor-not-allowed"
              onClick={() => handleIncreaseQuantity(item.id)}
              disabled={item.quantity >= 10}
            >
              <Icon icon="eva:plus-fill" />
            </button>
          </div>

          <button
            onClick={() => handleRemoveFromCart(item.id)}
            className=" text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400 bg-slate-100 hover:bg-danger-500 hover:text-white dark:hover:bg-danger-500 dark:hover:text-white"
          >
            <Icon icon="heroicons:trash" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
