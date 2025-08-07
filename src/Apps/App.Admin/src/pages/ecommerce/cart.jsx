import React, { useState } from "react";
import Card from "@/components/ui/Card";
import StepBox from "@/components/partials/ecommerce/steps/step-box";
import CartStep from "@/components/partials/ecommerce/steps/cart-step";
import ShippingInfo from "@/components/partials/ecommerce/steps/shipping-info";
import DeliveryInfo from "@/components/partials/ecommerce/steps/delivery-info";
import Payment from "@/components/partials/ecommerce/steps/payment";
import Icons from "@/components/ui/Icon";
import InvoiceCart from "@/components/partials/ecommerce/steps/invoice-cart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [step, setStep] = useState(0);
  const { items, totalPrice } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const navigateProduct = () => {
    // 👇️ navigate to /
    navigate("/products");
  };
  const handleNext = () => {
    if (step < stepsArray.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  let content;
  switch (step) {
    case 0:
      content = <CartStep />;
      break;
    case 1:
      content = <ShippingInfo />;
      break;
    case 2:
      content = <DeliveryInfo />;
      break;
    case 3:
      content = <Payment />;
      break;
    case 4:
      content = <InvoiceCart />;
      break;
    default:
      content = <CartStep />;
  }

  const stepsArray = [
    {
      step: 1,
      icon: "mdi:cart-outline",
      title: "My Cart",
    },
    {
      step: 2,
      icon: "streamline:shipping-transfer-cart-package-box-fulfillment-cart-warehouse-shipping-delivery",
      title: "Shipping Info",
    },
    {
      step: 3,
      icon: "la:shipping-fast",
      title: "Delivery Info",
    },
    {
      step: 4,
      icon: "fluent:payment-32-regular",
      title: "Payment",
    },
    {
      step: 5,
      icon: "line-md:confirm-circle",
      title: "Confirmation",
    },
  ];

  return (
    <div>
      <Card>
        <div className="grid grid-cols-5 gap-5">
          {stepsArray.map((item, i) => (
            <StepBox item={item} key={i} stepNumber={step} index={i} />
          ))}
        </div>
        <div className=" mt-8 ">
          {content}

          <div className=" grid grid-cols-12 align-center px-6 py-10 mt-8 space-x-6 rtl:space-x-reverse   ">
            <button
              onClick={navigateProduct}
              className="text-sm border border-slate-400 dark:border-0 font-medium text-slate-900 max-w-[170px] dark:text-white flex gap-2 items-center col-span-12 md:col-span-6 py-3 px-3 rounded-md hover:bg-slate-800 hover:text-white dark:bg-slate-900 dark:hover:bg-slate-900/50 delay-200 ease-in-out md:justify-start justify-center mb-4 md:mb-0"
            >
              <Icons icon="ion:arrow-back-outline" />

              {step === stepsArray.length - 1
                ? "Return to Shop"
                : " Add New Product"}
            </button>
            <div className="space-x-5 rtl:space-x-reverse col-span-12 md:col-span-6 flex md:justify-end justify-center ">
              <button
                onClick={handleBack}
                hidden={step === 0 && step === stepsArray.length - 1}
                type="button"
                className="btn btn-dark  text-sm font-normal"
              >
                <span className="flex items-center p-0 m-0">Go Back</span>
              </button>

              <button
                onClick={handleNext}
                hidden={step === stepsArray.length - 1}
                disabled={items.length > 0 ? false : true}
                type="button"
                className="btn btn-dark  text-sm font-normal disabled:cursor-not-allowed disabled:opacity-50"
              >
                {step === stepsArray.length - 2
                  ? "Submit"
                  : " Continue to Shipping"}
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
