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
      toast.success(res.data.message + ` Total Rs. ${res.data.total}`);
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

        {!cart?.items?.length ? (
          <div className="empty-cart-container">
            <img src="/empty-bag.png" alt="Empty Bag" className="empty-bag-img"/>
            <h3>Hey, it feels so light!</h3>
            <p>There is nothing in your bag. Let's add some items.</p>
            <button className="wishlist-btn" onClick={() => window.location.href = '/'}>ADD ITEMS TO WISHLIST</button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-left">
              <div className="cart-header">
                  <div className="bulk-actions">
                     <strong>{cart.items.length} ITEMS</strong>
                  </div>
              </div>
              <div className="cart-list">
                {cart.items.map(i => (
                  <div className="cart-item" key={i.productId?._id}>
                    <img src={i.productId?.Image} alt={i.productId?.name} />

                    <div className="info">
                      <h4>{i.productId?.name}</h4>
                      <p className="desc">{i.productId?.category}</p>
                      
                      <div className="qty-picker">
                        <span>Qty:</span>
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
                        </div>
                      </div>
                      
                      <p className="item-price">Rs. {i.productId?.price}</p>

                    </div>
                    <button className="remove-close" onClick={() => removeItem(i.productId._id)}>✕</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-right">
              <div className="summary">
                <h4>PRICE DETAILS ({cart.items.length} Items)</h4>
                <div className="row">
                  <span>Total MRP</span>
                  <span>Rs. {total}</span>
                </div>
                <div className="row">
                  <span>Platform Fee</span>
                  <span className="free">FREE</span>
                </div>
                <div className="row">
                  <span>Shipping Fee</span>
                  <span className="free">FREE</span>
                </div>
                <hr />
                <div className="row total-row">
                  <span>Total Amount</span>
                  <span>Rs. {total}</span>
                </div>
                <button className="checkout" onClick={checkout}>
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
