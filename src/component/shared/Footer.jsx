import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

const Footer = () => {
    return (
        <footer className="footer footer-secondary">
            <div className="container">
                <div className="row section">
                    <div className="col-12">
                        <div className="footer-secondary__content">
                            <div className="footer__logo">
                                <Link to="/">
                                    <img
                                        src={Logo}
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                            <div className="quick-link order-1 order-lg-0">
                                <ul className="quick-link__list">
                                    <li><a href="#">Help & Support</a></li>
                                    <li><a href="#">Privacy policy</a></li>
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><Link to="/contact">Contact us</Link></li>
                                </ul>
                            </div>
                            <div className="social">
                                <a href="#" className="btn_theme social_box"><i className="bi bi-facebook"></i><span></span></a>
                                <a href="#" className="btn_theme social_box"><i className="bi bi-twitter"></i><span></span></a>
                                <a href="#" className="btn_theme social_box"><i className="bi bi-pinterest"></i><span></span></a>
                                <a href="#" className="btn_theme social_box"><i className="bi bi-twitch"></i><span></span></a>
                                <a href="#" className="btn_theme social_box"><i className="bi bi-skype"></i><span></span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="footer__copyright">
                            <p className="copyright text-center">Copyright © <span id="copyYear">2026</span> <Link to="/" className="secondary_color">TheBankey</Link>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;