import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";
import heroDollar from "../assets/images/hero_vector_dollar.png";
import heroMessage from "../assets/images/hero_vector_message.png";

const teamMembers = [
  {
    title: "Rahul Arora",
    desc: "Rahul Arora an ex-banker is the founder who has more than 22 years of proficient experience in the field of Home Loan Sales; he looks after the end-to-end process of HNI clients, Builder tie-ups projects approval.",
  },
  {
    title: "Neha Soni ",
    desc: "Neha Soni is designated as Credit & Operations she is a multitalented person who has home loan experience of more than 5 years. She takes care of all Credit - operations part of the company.",
  },
  {
    title: "Prapti Pandey",
    desc: "Prapti Pandey is designated as Business head of the company who has experience of more than 3 years, she handles all sales and telecalling team, builder data and all lead generation part.  ",
  },
];
const OurTeam = ({
  sectionSubtitle = "Our Team",
  sectionTitle = "Empowering You with Loan Knowledge and Comparison Tools",
  sectionIntro = "We simplify your loan search and help you make better decisions.",
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

              <span className=" section__header-sub-title headingFour">
                {sectionSubtitle}
              </span>

              <h2>
                {sectionTitle}
              </h2>

              <p>
                {sectionIntro}
              </p>

            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="row">
          <div className="col-12">
            <div className="feature_slider">

              <div className="row">
                {teamMembers.map((item, index) => (
                  <div className="col-md-4" key={index}>

                    <div className="card card--custom">

                      {/* Icon (optional replace with SVG component) */}
                      <div className="card__icon">
                        <i className="bi bi-person-circle" style={{ fontSize: "30px" }}></i>
                      </div>

                      <div className="card__content">
                        <p className="fs-small font_600">
                          {item.title}
                        </p>
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
}
export default OurTeam;