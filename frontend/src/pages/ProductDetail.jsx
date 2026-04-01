import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, ArrowLeft, Plus, Minus, Heart, ShoppingBag } from 'lucide-react';
import { products, colorOptions } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [mainImage, setMainImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setMainImage(data.image); // Use data.image as default
                if (data.images && data.images.length > 0) {
                    setMainImage(data.images[0]);
                }
                setSelectedSize(data.sizes[0]);
                setSelectedColor(data.colors[0]);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        window.scrollTo(0, 0);
        fetchProduct();
    }, [id]);

    if (loading) return <div className="container pd-loading">Loading...</div>;
    if (error) return (
        <div className="pd-notfound container">
            <h2>Error</h2>
            <p>{error}</p>
            <Link to="/shop" className="btn btn-primary">Return to Shop</Link>
        </div>
    );
    if (!product) {
        return (
            <div className="pd-notfound container">
                <h2>Product Not Found</h2>
                <p>The product you are looking for does not exist.</p>
                <Link to="/shop" className="btn btn-primary">Return to Shop</Link>
            </div>
        );
    }

    const getHex = (name) => (colorOptions.find(c => c.name === name) || {}).hex || '#ccc';

    const handleAdd = () => {
        setAdding(true);
        addToCart(product, selectedSize, selectedColor, quantity);
        setTimeout(() => setAdding(false), 600);
    };

    return (
        <div className="pd container">
            {/* Breadcrumbs */}
            <nav className="pd__breadcrumbs">
                <button onClick={() => navigate(-1)} className="pd__back"><ArrowLeft size={14} /> Back</button>
                <span>/</span>
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
                <span>/</span>
                <span className="pd__crumb-current">{product.name}</span>
            </nav>

            <div className="pd__layout">
                {/* Gallery */}
                <div className="pd__gallery">
                    <div className="pd__thumbs">
                        {(product.images && product.images.length > 0 ? product.images : [product.image]).map((img, i) => (
                            <button
                                key={i}
                                className={`pd__thumb ${mainImage === img ? 'pd__thumb--active' : ''}`}
                                onClick={() => setMainImage(img)}
                            >
                                <img src={img} alt={`View ${i + 1}`} />
                            </button>
                        ))}
                    </div>
                    <div className="pd__main-img-wrap">
                        {product.discount > 0 && <span className="pd__disc-badge">{product.discount}% OFF</span>}
                        <img src={mainImage} alt={product.name} className="pd__main-img" />
                    </div>
                </div>

                {/* Info */}
                <div className="pd__info">
                    <span className="pd__brand">{product.brand}</span>
                    <h1 className="pd__name">{product.name}</h1>

                    <div className="pd__rating-row">
                        <div className="pd__stars">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'} stroke="#fbbf24" />
                            ))}
                            <span>{product.rating}</span>
                        </div>
                        <span className="pd__reviews">({product.reviews} reviews)</span>
                    </div>

                    <div className="pd__price-row">
                        <span className="pd__price">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                            <span className="pd__orig-price">₹{product.originalPrice}</span>
                        )}
                    </div>
                    <p className="pd__tax">Inclusive of all taxes</p>

                    <p className="pd__desc">{product.description}</p>

                    {/* Color */}
                    <div className="pd__option-group">
                        <span className="pd__option-label">Color: <strong>{selectedColor}</strong></span>
                        <div className="pd__color-row">
                            {product.colors.map(c => (
                                <button
                                    key={c}
                                    className={`pd__color-btn ${selectedColor === c ? 'pd__color-btn--active' : ''}`}
                                    style={{ backgroundColor: getHex(c) }}
                                    onClick={() => setSelectedColor(c)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size */}
                    <div className="pd__option-group">
                        <div className="pd__option-header">
                            <span className="pd__option-label">Size: <strong>{selectedSize}</strong></span>
                            <button className="pd__size-guide">Size Guide</button>
                        </div>
                        <div className="pd__size-row">
                            {product.sizes.map(s => (
                                <button
                                    key={s}
                                    className={`pd__size-btn ${selectedSize === s ? 'pd__size-btn--active' : ''}`}
                                    onClick={() => setSelectedSize(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pd__actions">
                        <div className="pd__qty">
                            <button onClick={() => quantity > 1 && setQuantity(q => q - 1)}><Minus size={16} /></button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)}><Plus size={16} /></button>
                        </div>
                        <button className="btn btn-primary pd__add-btn" onClick={handleAdd} disabled={adding}>
                            {adding ? 'Adding...' : <><ShoppingBag size={18} /> Add to Cart</>}
                        </button>
                        <button className="pd__wish-btn"><Heart size={20} /></button>
                    </div>

                    {/* Trust */}
                    <div className="pd__trust">
                        <div className="pd__trust-item">
                            <Truck size={22} color="var(--primary)" />
                            <div><strong>Free Delivery</strong><br /><small>On orders over ₹999</small></div>
                        </div>
                        <div className="pd__trust-item">
                            <ShieldCheck size={22} color="var(--primary)" />
                            <div><strong>Easy Returns</strong><br /><small>30-day return policy</small></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
