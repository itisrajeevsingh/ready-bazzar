import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories, colorOptions, sizeOptions } from '../data/products';
import './Shop.css';

const Shop = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);

    const [activeCategory, setActiveCategory] = useState(params.get('category') || 'All');
    const [searchQuery, setSearchQuery] = useState(params.get('search') || '');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sortBy, setSortBy] = useState('recommended');
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setActiveCategory(searchParams.get('category') || 'All');
        setSearchQuery(searchParams.get('search') || '');
    }, [location.search]);

    const toggleColor = (c) => setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
    const toggleSize = (s) => setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

    const clearFilters = () => {
        setActiveCategory('All');
        setSearchQuery('');
        setPriceRange([0, 10000]);
        setSelectedColors([]);
        setSelectedSizes([]);
        navigate('/shop');
    };

    const filtered = useMemo(() => {
        return products.filter(p => {
            if (activeCategory !== 'All' && p.category !== activeCategory) return false;
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
            }
            if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
            if (selectedColors.length > 0 && !p.colors.some(c => selectedColors.includes(c))) return false;
            if (selectedSizes.length > 0 && !p.sizes.some(s => selectedSizes.includes(s))) return false;
            return true;
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            return 0;
        });
    }, [activeCategory, searchQuery, priceRange, selectedColors, selectedSizes, sortBy]);

    return (
        <div className="shop container">

            {/* Header */}
            <div className="shop__header">
                <div>
                    <h1 className="shop__title">
                        {searchQuery ? `Results for "${searchQuery}"` : activeCategory === 'All' ? 'All Products' : `${activeCategory} Collection`}
                    </h1>
                    <p className="shop__count">{filtered.length} products</p>
                </div>
                <div className="shop__controls">
                    <button className="btn btn-outline shop__filter-btn" onClick={() => setFilterOpen(true)}>
                        <Filter size={16} /> Filters
                    </button>
                    <div className="shop__sort">
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field shop__sort-select">
                            <option value="recommended">Recommended</option>
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low → High</option>
                            <option value="price-high">Price: High → Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="shop__layout">

                {/* Sidebar */}
                <aside className={`shop__sidebar ${filterOpen ? 'shop__sidebar--open' : ''}`}>
                    <div className="shop__sidebar-inner">

                        <div className="shop__sidebar-top">
                            <span className="shop__sidebar-label">FILTERS</span>
                            <button onClick={clearFilters} className="shop__clear-btn">Clear All</button>
                        </div>

                        {/* Mobile close */}
                        <button className="shop__sidebar-close" onClick={() => setFilterOpen(false)}>
                            <X size={22} />
                        </button>

                        {/* Category */}
                        <div className="shop__filter-group">
                            <h4 className="shop__filter-title">Category</h4>
                            {categories.map(c => (
                                <button
                                    key={c}
                                    className={`shop__cat-btn ${activeCategory === c ? 'shop__cat-btn--active' : ''}`}
                                    onClick={() => { setActiveCategory(c); navigate(`/shop?category=${c}`); }}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>

                        {/* Price */}
                        <div className="shop__filter-group">
                            <h4 className="shop__filter-title">Price Range</h4>
                            <div className="shop__price-inputs">
                                <input type="number" className="input-field" placeholder="Min" value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])} />
                                <span>—</span>
                                <input type="number" className="input-field" placeholder="Max" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} />
                            </div>
                        </div>

                        {/* Color */}
                        <div className="shop__filter-group">
                            <h4 className="shop__filter-title">Color</h4>
                            <div className="shop__colors">
                                {colorOptions.map(c => (
                                    <button
                                        key={c.name}
                                        title={c.name}
                                        className={`shop__color-btn ${selectedColors.includes(c.name) ? 'shop__color-btn--active' : ''}`}
                                        style={{ backgroundColor: c.hex }}
                                        onClick={() => toggleColor(c.name)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="shop__filter-group">
                            <h4 className="shop__filter-title">Size</h4>
                            <div className="shop__sizes">
                                {sizeOptions.map(s => (
                                    <button
                                        key={s}
                                        className={`shop__size-btn ${selectedSizes.includes(s) ? 'shop__size-btn--active' : ''}`}
                                        onClick={() => toggleSize(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mobile apply */}
                        <div className="shop__sidebar-apply">
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setFilterOpen(false)}>Apply Filters</button>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="shop__main">
                    {filtered.length === 0 ? (
                        <div className="shop__empty">
                            <Filter size={48} opacity={0.3} />
                            <h3>No products found</h3>
                            <p>Try adjusting your filters.</p>
                            <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
                        </div>
                    ) : (
                        <div className="pgrid">
                            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Shop;
