import React from "react";
import { Link } from "react-router-dom";
import heroDollar from "../assets/images/hero_vector_dollar.png";
import heroMessage from "../assets/images/hero_vector_message.png";
import heroSetting from "../assets/images/hero_vector_setting.png";
import heroArrow from "../assets/images/hero_vector_arrow.png";
import titleVector from "../assets/images/title_vector.png";
import heroImg from "../assets/images/hero_img.png";


const Landing = () => {
  return (
    <section className="hero">
      <div className="hero__animation">
        <img src={heroDollar} alt="img" />
        <img src={heroMessage} alt="img" />
        <img src={heroDollar} alt="img" />
        <img src={heroSetting} alt="img" />
        <img src={heroArrow} alt="img" />
      </div>

      <div className="container">
        <div className="row gy-5 align-items-center justify-content-between">

          <div className="col-lg-6">
            <div className="section__content">

              <span className="section__content-sub-title headingFour">
                <img src={titleVector} alt="vector" />
                Compare and Choose the Best Home loan option
              </span>

              <h1 className="display-3">
                Find a path for your
                <span className="word d-inline-flex">
                  {"Dream ".split("").map((letter, i) => (
                    <span key={i} className="letter">
                      {letter}
                    </span>
                  ))}
                </span>{" "} Home
              </h1>

              <p>
                Welcome to TheBankey, your trusted resource for financial loan
                reviews and comparisons.
              </p>

              <div className="btn-group mt_40 wow fadeInUp" data-wow-duration="0.8s" style={{ visibility: "visible", animationDuration: "0.8s", animationName: "fadeInUp" }}>
                <a href="#calculator" className="btn_theme btn_theme_active">Loan Calculator<i className="bi bi-arrow-up-right"></i><span style={{ top: "53.7969px", left: "42.5px" }}></span></a>
                <Link to="/eligibility-calculator" className="btn_theme">Eligibility & LTV Calculator<i className="bi bi-arrow-up-right"></i><span style={{ top: "41.3729px", left: "-4.85938px" }}></span></Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-xxl-5">
            <div className="hero__thumb">
              <img src={heroImg} alt="hero" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Landing;