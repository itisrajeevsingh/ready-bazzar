const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
        res.json(cart);
    } else {
        res.json({ cartItems: [] });
    }
});

// @desc    Update user cart
// @route   POST /api/cart
// @access  Private
const updateCart = asyncHandler(async (req, res) => {
    const { cartItems } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = cartItems;
        const updatedCart = await cart.save();
        res.json(updatedCart);
    } else {
        const newCart = new Cart({
            user: req.user._id,
            cartItems,
        });
        const createdCart = await newCart.save();
        res.status(201).json(createdCart);
    }
});

module.exports = {
    getCart,
    updateCart,
};
