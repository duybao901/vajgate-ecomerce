import React from 'react';
import FooterBottomImage from './footer-bottom-img.png';

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col col-sm-12 col-md-6 col-lg-3 footer-about">
                        <h3 className="footer-hd">ABOUT JAVGATE</h3>
                        <ul>
                            <li>We are awesome!</li>
                            <li>Join us and live like a king.</li>
                            <li>+490 54 324 77</li>
                            <li>POTSDAMER PLATZ 93564</li>
                            <button>Contact Us</button>
                        </ul>
                    </div>
                    <div className="col col-sm-12 col-md-6 col-lg-3 footer-tags">
                        <h3 className="footer-hd">TAGS</h3>
                        <ul>
                            <li>Art</li>
                            <li>Decor</li>
                            <li>Design</li>
                            <li>Fashion</li>
                            <li>Ideas</li>
                            <li>Photo</li>
                            <li>Popular</li>
                            <li>Style</li>
                        </ul>
                    </div>
                    <div className="col col-sm-12 col-md-6 col-lg-3 footer-archive">
                        <h3 className="footer-hd">ARCHIVE</h3>
                        <ul>
                            <li className="footer-hve">
                                <p>Designer Shoes</p>
                            </li>
                            <li className="footer-hve">
                                <p>Gallery</p>
                            </li>
                            <li className="footer-hve">
                                <p>Pricing</p>
                            </li>
                            <li className="footer-hve">
                                <p>Feature Index</p>
                            </li>
                            <li className="footer-hve">
                                <p>Login</p>
                            </li>
                            <li className="footer-hve">
                                <p>Help & Support</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col col-sm-12 col-md-6 col-lg-3">
                        <h3 className="footer-hd">CONTACT</h3>
                        <ul className="footer-channel">
                            <li>
                                <a
                                    href="https://www.facebook.com/bao.duy.076/"
                                    style={{
                                        marginBottom: '10px',
                                        display: 'block',
                                    }}
                                >
                                    <i className="fab fa-facebook-square"></i>{' '}
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/duycarry123">
                                    <i className="fab fa-github"></i> Git
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <ul className="footer-team">
                        <li className="footer-hve ">
                            <p>Designer Shoes</p>
                        </li>
                        <li className="footer-hve">
                            <p>Gallery</p>
                        </li>
                        <li className="footer-hve">
                            <p>Pricing</p>
                        </li>
                    </ul>
                    <img src={FooterBottomImage} alt="footerimg"></img>
                    <div>Copyright©duyav-Vajs</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
