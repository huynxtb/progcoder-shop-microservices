import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CartItemTable from "../cart/CartItemTable";
import { FarzaaContext } from "../../context/FarzaaContext";

const CartModal = ({ cartArray, remove, quantity }) => {
  const { showCart, handleCartClose } = useContext(FarzaaContext);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to close the modal and navigate
  const closeAndNavigate = (path) => {
    handleCartClose();
    navigate(path);
  };

  return (
    <>
      <div
        className={`overlay ${showCart ? "open" : ""}`}
        role="button"
        onClick={handleCartClose}
      ></div>
      <div
        className={`cart-area cart-area-modal ${showCart ? "open" : ""}`}
        id="cart-area-modal"
      >
        <div className="cart__header">
          <h3 className="cart__title">Shopping cart</h3>
          <button
            className="cart-area-modal-close-btn"
            onClick={handleCartClose}
          >
            <i className="fa-regular fa-xmark"></i>
          </button>
        </div>
        <div className="cart__body">
          <div className="table-container">
            <CartItemTable
              cartArray={cartArray}
              remove={remove}
              quantity={quantity}
            />
          </div>

          {cartArray.length === 0 ? (
            <div className="cart-left-actions d-flex justify-content-end">
              <button
                onClick={() => closeAndNavigate("/shop")}
                className="fz-1-banner-btn update-cart-btn"
              >
                Go to Shop
              </button>
            </div>
          ) : (
            <div className="cart-left-actions d-flex justify-content-between">
              <button
                onClick={() => closeAndNavigate("/cart")}
                className="fz-1-banner-btn update-cart-btn"
              >
                View Full cart
              </button>
              <button
                className="fz-1-banner-btn update-cart-btn"
                onClick={() => closeAndNavigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;
