import { Link } from "react-router-dom";

const AboutCta = () => {
  return (
    <section className="section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xxl-6 text-center">
            <div className="section__header">
              <span className="section__header-sub-title headingFour">
                Next steps
              </span>
              <h2 className="section__header-title">
                Ready to plan your home loan with confidence?
              </h2>
              <p className="section__header-content">
                Use our EMI calculator to estimate repayments, or reach out and
                we will help you compare options across our banking partners.
              </p>
            </div>
            <div className="btn-group mt_40 justify-content-center flex-wrap">
              <Link
                to="/#calculator"
                className="btn_theme btn_theme_active"
              >
                Try loan calculator
                <i className="bi bi-arrow-up-right" />
                <span style={{ top: "53.7969px", left: "42.5px" }} />
              </Link>
              <Link to="/contact" className="btn_theme">
                Talk to us
                <i className="bi bi-arrow-up-right" />
                <span style={{ top: "53.7969px", left: "42.5px" }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
