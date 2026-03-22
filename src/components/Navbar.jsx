import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { getCartCount, setIsCartOpen } = useCart();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setMenuOpen(false);
        }
    };

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Collections', path: '/shop' },
        { name: 'Men', path: '/shop?category=Men' },
        { name: 'Women', path: '/shop?category=Women' },
        { name: 'Editorial', path: '/editorial' },
    ];

    return (
        <motion.header
            className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="navbar__inner container">
                {/* Mobile toggle */}
                <button className="navbar__mobile-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                {/* Left Links (Desktop) */}
                <nav className="navbar__links navbar__links--left">
                    {links.slice(0, 2).map(l => (
                        <Link key={l.name} to={l.path} className="navbar__link uppercase tracking-luxury">{l.name}</Link>
                    ))}
                </nav>

                {/* Logo */}
                <Link to="/" className="navbar__logo serif uppercase tracking-luxury">READY BAZZAR</Link>

                {/* Right Links (Desktop) */}
                <nav className="navbar__links navbar__links--right">
                    {links.slice(2).map(l => (
                        <Link key={l.name} to={l.path} className="navbar__link uppercase tracking-luxury">{l.name}</Link>
                    ))}
                </nav>

                {/* Right actions */}
                <div className="navbar__actions">
                    <button className="navbar__action-btn"><Search size={20} /></button>
                    <button className="navbar__action-btn" onClick={() => setIsCartOpen(true)}>
                        <ShoppingBag size={20} />
                        {getCartCount() > 0 && <span className="navbar__cart-badge">{getCartCount()}</span>}
                    </button>
                    <button className="navbar__action-btn hide-mobile"><User size={20} /></button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="navbar__mobile-menu"
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <nav className="navbar__mobile-links container">
                            {links.map((l, i) => (
                                <motion.div
                                    key={l.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                    <Link to={l.path} className="navbar__mobile-link serif" onClick={() => setMenuOpen(false)}>
                                        {l.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;
