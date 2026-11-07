import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

function CartPage() {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <section className="cart-page">

      <h1 className="page-title">
        Shopping Cart 🛒
      </h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">

          <h2>Your cart is empty.</h2>

          <p>Start adding products to your cart!</p>

          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>

        </div>
      ) : (
        <>
          <div className="cart-items">

            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>

                <img
                  src={item.thumbnail}
                  alt={item.title}
                />

                <div className="cart-item-info">

                  <h3>{item.title}</h3>

                  <p>${item.price}</p>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="cart-item-actions">

                  <strong>
                    ${(item.price * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className="cart-summary">

            <h2>
              Total: ${cartTotal.toFixed(2)}
            </h2>

            <button
              className="clear-cart-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>

          </div>
        </>
      )}

    </section>
  );
}

export default CartPage;