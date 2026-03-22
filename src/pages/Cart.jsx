import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { colorOptions } from '../data/products';
import './Cart.css';

const Cart = () => {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getCartTotal
    } = useCart();
    const navigate = useNavigate();
    const drawerRef = useRef(null);

    // Close drawer when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target) && isCartOpen) {
                setIsCartOpen(false);
            }
        };

        if (isCartOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen, setIsCartOpen]);

    const getColorHex = (colorName) => {
        const colorObj = colorOptions.find(c => c.name === colorName);
        return colorObj ? colorObj.hex : '#ccc';
    };

    const handleCheckout = () => {
        setIsCartOpen(false);
        alert('Proceeding to secure checkout...');
    };

    return (
        <>
            <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} />

            <div
                ref={drawerRef}
                className={`cart-drawer ${isCartOpen ? 'open' : ''}`}
            >
                <div className="cart-header">
                    <h2 className="cart-title">
                        <ShoppingBag size={24} />
                        Your Cart <span className="cart-count">({cartItems.length} items)</span>
                    </h2>
                    <button
                        className="btn-icon"
                        onClick={() => setIsCartOpen(false)}
                        aria-label="Close Cart"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="cart-body">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <div className="cart-empty-icon">
                                <ShoppingBag size={40} />
                            </div>
                            <h3>Your cart is empty</h3>
                            <p>Looks like you haven't added anything to your cart yet.</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setIsCartOpen(false);
                                    navigate('/shop');
                                }}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map((item, index) => (
                                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="cart-item">
                                    <Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)} className="cart-item-img">
                                        <img src={item.image} alt={item.name} />
                                    </Link>

                                    <div className="cart-item-info">
                                        <div className="cart-item-top">
                                            <Link to={`/product/${item.id}`} onClick={() => setIsCartOpen(false)} className="cart-item-name">
                                                <h4>{item.name}</h4>
                                            </Link>
                                            <button
                                                className="cart-item-remove"
                                                onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="cart-item-price">₹{item.price}</div>

                                        <div className="cart-item-variants">
                                            {item.selectedSize && (
                                                <span className="cart-item-variant">Size: <strong>{item.selectedSize}</strong></span>
                                            )}
                                            {item.selectedColor && (
                                                <span className="cart-item-variant">
                                                    Color:
                                                    <span
                                                        className="color-dot"
                                                        style={{ backgroundColor: getColorHex(item.selectedColor) }}
                                                    />
                                                    <strong>{item.selectedColor}</strong>
                                                </span>
                                            )}
                                        </div>

                                        <div className="cart-item-actions">
                                            <div className="quantity-ctrl">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary">
                            <div className="cart-summary-line">
                                <span>Subtotal</span>
                                <span>₹{getCartTotal()}</span>
                            </div>
                            <div className="cart-summary-line">
                                <span>Shipping</span>
                                <span className="text-success">Free</span>
                            </div>
                            <div className="cart-summary-total">
                                <span>Total</span>
                                <span>₹{getCartTotal()}</span>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary cart-checkout-btn"
                            onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            className="btn btn-outline cart-full-btn"
                            onClick={() => {
                                setIsCartOpen(false);
                                navigate('/cart');
                            }}
                        >
                            View Full Cart
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Cart;
