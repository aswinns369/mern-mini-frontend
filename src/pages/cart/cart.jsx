

import './cart.css';
import { useEffect, useMemo, useState } from 'react';
import api from '../../api';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../../components/Navbar/Navbar';

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });

  const loadCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data || { items: [] });
    } catch (e) {
      if (e.response?.status === 401) {
        toast.error('Please login to view your cart');
      } else {
        toast.error(e.response?.data?.message || 'Failed to load cart');
      }
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const total = useMemo(() => {
    if (!cart?.items?.length) return 0;
    return cart.items.reduce(
      (sum, i) => sum + (i.productId?.price || 0) * i.quantity,
      0
    );
  }, [cart]);

  const changeQty = async (pid, next) => {
    try {
      const res = await api.patch(`/cart/item/${pid}`, { qty: next });
      setCart(res.data);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to update quantity');
    }
  };

  const removeItem = async pid => {
    try {
      const res = await api.delete(`/cart/item/${pid}`);
      setCart(res.data);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to remove item');
    }
  };

  const checkout = async () => {
    try {
      const res = await api.post('/cart/checkout');
      toast.success(res.data.message + ` Total ₹${res.data.total}`);
      setTimeout(() => (window.location.href = '/'), 1200);
    } catch (e) {
      toast.error(e.response?.data?.message || 'Checkout failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <ToastContainer />
        <h2>Your Cart</h2>

        {!cart?.items?.length ? (
          <p className="empty">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-list">
              {cart.items.map(i => (
                <div className="cart-item" key={i.productId?._id}>
                  <img src={i.productId?.Image} alt={i.productId?.name} />

                  <div className="info">
                    <h4>{i.productId?.name}</h4>
                    <p>₹{i.productId?.price}</p>

                    <div className="qty">
                      <button
                        onClick={() =>
                          changeQty(
                            i.productId._id,
                            Math.max(1, i.quantity - 1)
                          )
                        }
                        className="minus"
                      >
                        −
                      </button>

                      <span>{i.quantity}</span>

                      <button
                        onClick={() =>
                          changeQty(i.productId._id, i.quantity + 1)
                        }
                        className="plus"
                      >
                        +
                      </button>

                      <button
                        className="remove"
                        onClick={() => removeItem(i.productId._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary">
              <div className="row">
                <span>Total</span>
                <strong>₹{total}</strong>
              </div>
              <button className="checkout" onClick={checkout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
