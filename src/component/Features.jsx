import React from "react";
import { Link } from "react-router-dom";
import heroDollar from "../assets/images/hero_vector_dollar.png";
import heroMessage from "../assets/images/hero_vector_message.png";

const defaultFeatures = [
  {
    title: "Loan Reviews",
    desc: "Provide comprehensive and unbiased reviews of loans",
  },
  {
    title: "Loan Comparison",
    desc: "Compare different loan options side by side",
  },
  {
    title: "Educational Resources",
    desc: "Learn about different types of loans",
  },
];

const Feature = ({
  subTitle = "Featured Services",
  heading = "Empowering with best knowledge and comparison tools",
  intro = "We simplify your loan search and help you make better decisions.",
  items = defaultFeatures,
  cardHref = "/service-details",
}) => {
  return (
    <section className="feature section">

      {/* Animation */}
      <div className="animation">
        <img src={heroDollar} alt="img" />
        <img src={heroMessage} alt="img" />
      </div>

      <div className="container">

        {/* Header */}
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="section__header text-center">

              <span className="headingFour section__header-sub-title headingFour">
                {subTitle}
              </span>

              <h2>
                {heading}
              </h2>

              <p>
                {intro}
              </p>

            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="row">
          <div className="col-12">
            <div className="feature_slider">

              <div className="row">
                {items.map((item, index) => (
                  <div className="col-md-4" key={index}>

                    <div className="card card--custom">

                      {/* Icon (optional replace with SVG component) */}
                      <div className="card__icon">
                        <i className="bi bi-bank" style={{ fontSize: "30px" }}></i>
                      </div>

                      <div className="card__content">
                        <h4>
                          {item.title}
                        </h4>

                        <p className="fs-small">{item.desc}</p>
                      </div>

                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Feature;