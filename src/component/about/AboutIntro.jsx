import { Link } from "react-router-dom";
import heroArrow from "../../assets/images/hero_vector_arrow.png";
import chooseVector from "../../assets/images/choose_vector.png";
import chooseUs from "../../assets/images/choose_us.png";

const AboutIntro = () => {
  return (
    <section className="choose-us">
      <div className="animation">
        <img src={heroArrow} alt="" />
        <img src={chooseVector} alt="" />
      </div>

      <div className="container">
        <div className="row align-items-center justify-content-between section">
          <div className="col-12 col-md-8 col-lg-5 mx-auto mx-lg-0 order-1 order-lg-0">
            <div className="choose-us__thumb me-xl-4 me-xxl-0 wow fadeInUp">
              <img src={chooseUs} alt="The Bankey — Finwin Digital Solutions" />
            </div>
          </div>

          <div className="col-12 col-lg-7 col-xxl-6">
            <div className="section__content ms-lg-4 ms-xl-0">
              <span className="section__content-sub-title headingFour wow fadeInDown">
                Finwin Digital Solutions (OPC) Pvt. Ltd.
              </span>

              <h2 className="section__content-title wow fadeInUp">
                A structured home loan partner for clients and banks
              </h2>

              <p className="section__content-text wow fadeInUp">
                The management of &quot;Finwin Digital Solutions (OPC) Pvt.
                Ltd.&quot; comprises of highly efficient &amp; self-motivated
                team who works in Delhi/NCR.
              </p>

              <p className="section__content-text wow fadeInUp">
                Finwin Digital Solutions (OPC) Pvt. Ltd. was founded on June 2024
                by Rahul Arora who has a clear vision to run home loan business
                in a structured manner and to establish a healthy relationship
                between client and bank.
              </p>

              <p className="section__content-text wow fadeInUp">
                Rahul Arora an ex-banker is the founder who has more than 22
                years of proficient experience in the field of Home Loan Sales;
                he looks after the end-to-end process of HNI clients, Builder
                tie-ups projects approval.
              </p>

              <span className="section__content-sub-title headingFour d-block mt-4 wow fadeInDown">
                Brand name
              </span>

              <p className="section__content-text wow fadeInUp mb-0">
                <strong>&quot;THE BANKEY&quot;</strong> is the Brand Name of
                Finwin Digital Solutions (OPC) Pvt. Ltd. As the brand name
                suggest we are providing key to Banking Solutions.
              </p>

              <div className="btn-group mt_40 flex-wrap wow fadeInUp">
                <Link to="/contact" className="btn_theme btn_theme_active">
                  Contact us
                  <i className="bi bi-arrow-up-right" />
                  <span style={{ top: "53.7969px", left: "42.5px" }}></span>
                </Link>
                <Link to="/#calculator" className="btn_theme">
                  Loan calculator
                  <i className="bi bi-arrow-up-right" />
                  <span style={{ top: "53.7969px", left: "42.5px" }}></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
