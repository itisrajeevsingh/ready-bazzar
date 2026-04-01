import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    const handleQuickAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, product.sizes[0], product.colors[0], 1);
    };

    return (
        <motion.div
            className="pcard"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <Link to={`/product/${product._id}`} className="pcard__link">
                <div className="pcard__img-wrap">
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="pcard__img"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />

                    <div className="pcard__badges">
                        {product.discount > 0 && <span className="pcard__badge pcard__badge--sale">-{product.discount}%</span>}
                        {product.isNew && <span className="pcard__badge pcard__badge--new uppercase">New</span>}
                    </div>

                    <button className={`pcard__fav ${isHovered ? 'pcard__fav--visible' : ''}`} onClick={(e) => e.preventDefault()}>
                        <Heart size={18} strokeWidth={1.5} />
                    </button>

                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="pcard__overlay"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <button className="btn btn-primary pcard__add-btn" onClick={handleQuickAdd}>
                                    <ShoppingBag size={16} /> <span>Quick Add</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="pcard__info">
                    <div className="pcard__brand uppercase tracking-luxury">{product.brand}</div>
                    <h3 className="pcard__name serif">{product.name}</h3>
                    <div className="pcard__footer">
                        <div className="pcard__prices">
                            <span className="pcard__price">₹{product.price}</span>
                            {product.originalPrice > product.price && (
                                <span className="pcard__original">₹{product.originalPrice}</span>
                            )}
                        </div>
                        <div className="pcard__rating">
                            <Star size={12} fill="var(--accent)" stroke="var(--accent)" />
                            <span>{product.rating}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
