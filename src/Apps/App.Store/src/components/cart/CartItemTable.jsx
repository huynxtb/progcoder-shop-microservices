import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { formatCurrency } from '../../utils/format';

const CartItemTable = ({ cartArray, remove, quantity }) => {
  const { t } = useTranslation();
  return (
    <table className="cart-page-table">
      <tbody>
        <tr>
          <th>{t("cart.product")}</th>
          <th>{t("common.price")}</th>
          <th>{t("common.quantity")}</th>
          <th>{t("common.total")}</th>
          <th>{t("cart.remove")}</th>
        </tr>
        {cartArray.length === 0 ? (
          <tr className="no-item-msg">
            <td className="no-item-msg-text">{t("cart.emptyCart")}</td>
          </tr>
        ) : (
          cartArray.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="cart-product">
                  <div className="cart-product__img">
                    <img src={item.imgSrc} alt="Product Image" />
                  </div>
                  <div className="cart-product__txt">
                    <h6>
                      <Link to="/shopDetails">{item.name}</Link>
                    </h6>
                  </div>
                </div>
              </td>
              <td>{formatCurrency(item.price)}</td>
              <td>
                <div className="cart-product__quantity">
                  <div className="cart-product__quantity-btns">
                    <button
                      className="cart-product__minus"
                      onClick={() => quantity(item.id, item.quantity - 1)}
                    >
                      <i className="fa-light fa-minus"></i>
                    </button>
                    <button
                      className="cart-product__plus"
                      onClick={() => quantity(item.id, item.quantity + 1)}
                    >
                      <i className="fa-light fa-plus"></i>
                    </button>
                  </div>
                  <input
                    type="number"
                    name="product-quantity-input"
                    className="cart-product-quantity-input"
                    min="0"
                    value={item.quantity}
                    onChange={(event) => {
                      const newQuantity = parseInt(event.target.value);
                      quantity(item.id, newQuantity);
                    }}
                  />
                </div>
              </td>
              <td>{formatCurrency(item.total ? item.total : item.quantity * item.price)}</td>
              <td>
                <button
                  className="item-remove-btn"
                  onClick={() => remove(item.id)}
                >
                  <i className="fa-light fa-xmark"></i>
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CartItemTable;
