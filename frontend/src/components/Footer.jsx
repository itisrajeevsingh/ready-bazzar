import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer section-padding">
            <div className="container">
                {/* Brand Story & Newsletter */}
                <div className="footer__top">
                    <div className="footer__brand-block">
                        <Link to="/" className="footer__brand serif uppercase tracking-luxury">READY BAZZAR</Link>
                        <p className="footer__motto serif italic">Definers of Modern Elegance</p>
                    </div>
                    <div className="footer__subscribe">
                        <h3 className="footer__subscribe-title uppercase tracking-luxury">Join the Archive</h3>
                        <p className="footer__subscribe-text">Receive exclusive access to new collections and editorial stories.</p>
                        <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Your email address" className="footer__input" required />
                            <button type="submit" className="footer__submit-btn uppercase">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer__divider" />

                {/* Links Grid */}
                <div className="footer__grid">
                    <div className="footer__col">
                        <h4 className="footer__heading uppercase tracking-luxury">The House</h4>
                        <ul className="footer__list">
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/editorial">Editorial</Link></li>
                            <li><Link to="/sustainability">Responsibility</Link></li>
                            <li><Link to="/press">Press</Link></li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__heading uppercase tracking-luxury">Collections</h4>
                        <ul className="footer__list">
                            <li><Link to="/shop?category=Men">Men's Archive</Link></li>
                            <li><Link to="/shop?category=Women">Women's Archive</Link></li>
                            <li><Link to="/shop?category=Accessories">Accessories</Link></li>
                            <li><Link to="/shop?category=Footwear">Footwear</Link></li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__heading uppercase tracking-luxury">Client Service</h4>
                        <ul className="footer__list">
                            <li><a href="#">Shipping & Returns</a></li>
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Size Guide</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__heading uppercase tracking-luxury">Connect</h4>
                        <div className="footer__socials">
                            <a href="#" className="footer__social-link">Instagram</a>
                            <a href="#" className="footer__social-link">Facebook</a>
                            <a href="#" className="footer__social-link">Pinterest</a>
                            <a href="#" className="footer__social-link">Twitter</a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="footer__bottom">
                    <div className="footer__bottom-inner">
                        <p className="footer__copy">&copy; {new Date().getFullYear()} Ready Bazzar. All rights reserved.</p>
                        <div className="footer__legal">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
