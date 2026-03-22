import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RotateCcw, Headphones, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products, heroBanners, categories } from '../data/products';
import './Home.css';

const categoryImages = [
    "/images/cat-men.png",
    "/images/cat-women.png",
    "/images/cat-kids.png",
    "/images/cat-accessories.png",
    "/images/cat-footwear.png",
];

const Home = () => {
    const [currentBanner, setCurrentBanner] = useState(0);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const yValue = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityValue = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner(prev => (prev + 1) % heroBanners.length);
        }, 8000);
        return () => clearInterval(timer);
    }, []);

    const newArrivals = products.filter(p => p.isNew);
    const trending = products.slice(0, 4);

    const bannerFade = {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.05 },
        transition: { duration: 1.5, ease: "easeOut" }
    };

    const textReveal = {
        initial: { y: 60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    return (
        <div className="home">

            {/* ===== HERO ===== */}
            <section className="hero" ref={heroRef}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentBanner}
                        className="hero__slide"
                        {...bannerFade}
                        style={{ backgroundImage: `url(${heroBanners[currentBanner].image})`, y: yValue }}
                    >
                        <div className="hero__overlay" />
                        <motion.div className="hero__content container" style={{ opacity: opacityValue }}>
                            <motion.span
                                className="hero__tag uppercase tracking-luxury text-gold italic"
                                {...textReveal}
                                transition={{ ...textReveal.transition, delay: 0.2 }}
                            >
                                Exclusive Couture
                            </motion.span>
                            <motion.h1
                                className="hero__title display-1 serif"
                                {...textReveal}
                                transition={{ ...textReveal.transition, delay: 0.4 }}
                            >
                                {heroBanners[currentBanner].title}
                            </motion.h1>
                            <motion.p
                                className="hero__subtitle italic"
                                {...textReveal}
                                transition={{ ...textReveal.transition, delay: 0.6 }}
                            >
                                {heroBanners[currentBanner].subtitle}
                            </motion.p>
                            <motion.div
                                {...textReveal}
                                transition={{ ...textReveal.transition, delay: 0.8 }}
                            >
                                <Link to={heroBanners[currentBanner].link} className="btn btn-primary hero__cta">
                                    Explore Collection
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                <div className="hero__scroll">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <ChevronDown size={32} strokeWidth={1} />
                    </motion.div>
                </div>

                <div className="hero__controls">
                    {heroBanners.map((_, i) => (
                        <button
                            key={i}
                            className={`hero__dot ${i === currentBanner ? 'hero__dot--active' : ''}`}
                            onClick={() => setCurrentBanner(i)}
                        >
                            <span className="hero__dot-num">0{i + 1}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ===== FEATURES BAR ===== */}
            <section className="features">
                <div className="container features__grid">
                    <div className="features__item">
                        <div className="features__icon"><Truck size={26} /></div>
                        <div><strong>Free Shipping</strong><br /><span>On orders over ₹999</span></div>
                    </div>
                    <div className="features__item">
                        <div className="features__icon"><ShieldCheck size={26} /></div>
                        <div><strong>Secure Payment</strong><br /><span>100% secure checkout</span></div>
                    </div>
                    <div className="features__item">
                        <div className="features__icon"><RotateCcw size={26} /></div>
                        <div><strong>Easy Returns</strong><br /><span>30-day return policy</span></div>
                    </div>
                    <div className="features__item">
                        <div className="features__icon"><Headphones size={26} /></div>
                        <div><strong>24/7 Support</strong><br /><span>Dedicated help desk</span></div>
                    </div>
                </div>
            </section>

            {/* ===== SHOP BY CATEGORY ===== */}
            <section className="section section-padding">
                <div className="container">
                    <motion.div
                        className="section__header section__header--center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="uppercase tracking-luxury text-gold">Curation</span>
                        <h2 className="display-2 serif">Shop by Essence</h2>
                    </motion.div>
                    <div className="catgrid">
                        {categories.filter(c => c !== 'All').map((cat, i) => (
                            <motion.div
                                key={cat}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <Link to={`/shop?category=${cat}`} className="catcard">
                                    <img src={categoryImages[i]} alt={cat} className="catcard__img" />
                                    <div className="catcard__overlay">
                                        <div className="catcard__content">
                                            <span className="catcard__tag uppercase tracking-luxury">0{i + 1}</span>
                                            <h3 className="catcard__name serif">{cat}</h3>
                                            <span className="catcard__link italic">Explore Collection</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== NEW ARRIVALS ===== */}
            <section className="section section--alt section-padding">
                <div className="container">
                    <div className="section__header">
                        <div>
                            <span className="uppercase tracking-luxury text-gold">Latest</span>
                            <h2 className="display-2 serif">New Arrivals</h2>
                        </div>
                        <Link to="/shop" className="btn btn-outline">View Catalog</Link>
                    </div>
                    <div className="pgrid">
                        {newArrivals.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <ProductCard product={p} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PROMO BANNER ===== */}
            <section className="promo">
                <div className="container">
                    <motion.div
                        className="promo__inner"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="promo__text">
                            <span className="promo__tag uppercase tracking-luxury">Seasonal Event</span>
                            <h2 className="display-2 serif text-white">Summer Clearance</h2>
                            <p className="promo__desc serif italic">Exquisite pieces curated for the modern minimalist. Up to 70% off during our annual archive sale.</p>
                            <Link to="/shop" className="btn btn-gold">Explore the Sale</Link>
                        </div>
                        <motion.div
                            className="promo__img"
                            style={{ backgroundImage: 'url(/images/promo.png)' }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.8 }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* ===== TRENDING ===== */}
            <section className="section section-padding">
                <div className="container">
                    <div className="section__header section__header--center">
                        <span className="uppercase tracking-luxury text-gold">High Demand</span>
                        <h2 className="display-2 serif">Trending Archive</h2>
                    </div>
                    <div className="pgrid">
                        {trending.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <ProductCard product={p} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
