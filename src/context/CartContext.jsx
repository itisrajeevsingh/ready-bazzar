import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem('readyBazzarCart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('readyBazzarCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
        setCartItems(prev => {
            const idx = prev.findIndex(
                item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            );
            if (idx > -1) {
                const copy = [...prev];
                copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
                return copy;
            }
            return [...prev, { ...product, selectedSize, selectedColor, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId, selectedSize, selectedColor) => {
        setCartItems(prev => prev.filter(item =>
            !(item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
        ));
    };

    const updateQuantity = (productId, selectedSize, selectedColor, newQty) => {
        if (newQty < 1) return;
        setCartItems(prev => prev.map(item =>
            (item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
                ? { ...item, quantity: newQty }
                : item
        ));
    };

    const clearCart = () => setCartItems([]);
    const getCartTotal = () => cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
    const getCartCount = () => cartItems.reduce((c, i) => c + i.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems, isCartOpen, setIsCartOpen,
            addToCart, removeFromCart, updateQuantity,
            clearCart, getCartTotal, getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
