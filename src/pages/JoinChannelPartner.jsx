import { useState } from "react";
import PageBanner from "../component/shared/PageBanner";
import AnimateOnScroll from "../component/shared/AnimateOnScroll";

const JoinChannelPartner = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    businessType: "",
    experience: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      type: "Channel Partner",
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch(import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Form data sent to Google Sheets');
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const businessTypes = [
    "Individual / Freelancer",
    "DSA (Direct Selling Agent)",
    "Financial Advisor",
    "Real Estate Agent",
    "Chartered Accountant",
    "Other"
  ];

  const experienceLevels = [
    "New to industry",
    "1-3 years",
    "3-5 years",
    "5-10 years",
    "10+ years"
  ];

  const benefits = [
    "Attractive commission structure",
    "Dedicated relationship manager",
    "Quick loan processing",
    "Wide range of loan products",
    "Marketing and promotional support",
    "Regular training and updates",
    "Transparent payout system",
    "Performance based rewards"
  ];

  return (
    <>
      <PageBanner title="Join as a Channel Partner" activeLabel="Partner With Us" />

      <section className="section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="text-center mb-5">
                  <h2 className="section__content-title mb-3">Partner with TheBankey</h2>
                  <p className="section__content-text">
                    Become a channel partner and unlock unlimited earning potential by offering top-tier
                    loan products to your clients. We provide the tools, support, and products you need
                    to succeed in the financial services industry.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-lg-6">
              <AnimateOnScroll animation="animate__fadeInLeft">
                <div className="card border-0 shadow-sm p-4 h-100">
                  <h3 className="h4 mb-4">Why Partner With Us?</h3>

                  <div className="mb-4">
                    <h4 className="h5 mb-3" style={{ color: '#074C3E' }}>Grow Your Business</h4>
                    <p>
                      As a Banky channel partner, you gain access to an extensive portfolio of loan products
                      from multiple banking partners. This allows you to serve a wider range of customer needs
                      and significantly increase your revenue.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="h5 mb-3" style={{ color: '#074C3E' }}>Partner Benefits</h4>
                    <ul className="list-unstyled">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="mb-2">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="h5 mb-3" style={{ color: '#074C3E' }}>Who Can Join?</h4>
                    <p>
                      Whether you are an individual financial advisor, a DSA, a CA, or a real estate agent,
                      our partner program is designed to add value to your existing business and help you scale.
                    </p>
                    <div className="mt-3">
                      <a href="#partner-form" className="btn_theme btn_theme_active">
                        Register Now
                        <i className="bi bi-arrow-up-right" />
                        <span style={{ "top": "-15.958px", "left": "32.8125px" }}></span>
                        <span style={{ "top": "34.4063px", "left": "64.5313px" }}></span>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            <div className="col-lg-6">
              <AnimateOnScroll animation="animate__fadeInRight">
                <div className="card border-0 shadow-sm p-4" id="partner-form">
                  <h3 className="h4 mb-4">Partner Registration</h3>

                  {submitted ? (
                    <div className="alert alert-success">
                      <h4 className="alert-heading">Welcome Aboard!</h4>
                      <p>
                        Your registration has been submitted successfully. Our partnership team will
                        contact you shortly to discuss the next steps.
                      </p>
                      <button
                        className="btn_theme mt-2"
                        onClick={() => setSubmitted(false)}
                      >
                        Register Another Account
                        <i className="bi bi-arrow-up-right" />
                        <span style={{ "top": "-15.958px", "left": "32.8125px" }}></span>
                        <span style={{ "top": "34.4063px", "left": "64.5313px" }}></span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {error && (
                        <div className="col-12 mb-3">
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        </div>
                      )}
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="fullName" className="form-label">
                            Full Name *
                          </label>
                          <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            className="form-control"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="email" className="form-label">
                            Email Address *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="phone" className="form-label">
                            Phone Number *
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="companyName" className="form-label">
                            Company/Firm Name
                          </label>
                          <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            className="form-control"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Optional"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="businessType" className="form-label">
                            Business Type *
                          </label>
                          <select
                            id="businessType"
                            name="businessType"
                            className="form-select"
                            value={formData.businessType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select type</option>
                            {businessTypes.map((type, index) => (
                              <option key={index} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="experience" className="form-label">
                            Experience *
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            className="form-select"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select experience</option>
                            {experienceLevels.map((level, index) => (
                              <option key={index} value={level}>
                                {level}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-12">
                          <label htmlFor="message" className="form-label">
                            Additional Information
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            className="form-control"
                            rows="3"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Any specific loan products you specialize in?"
                          ></textarea>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="terms"
                              required
                            />
                            <label className="form-check-label" htmlFor="terms">
                              I agree to the{" "}
                              <a href="#" style={{ color: '#074C3E' }}>
                                Terms & Conditions
                              </a>{" "}
                              and{" "}
                              <a href="#" style={{ color: '#074C3E' }}>
                                Privacy Policy
                              </a>.
                            </label>
                          </div>
                        </div>

                        <div className="col-12">
                          <button type="submit" className="btn_theme btn_theme_active w-100 justify-content-center" disabled={loading} style={{ border: 'none' }}>
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Submitting...
                              </>
                            ) : 'Register as Partner'}
                            <i className="bi bi-arrow-up-right ms-2" />
                            <span style={{ "top": "-15.958px", "left": "32.8125px" }}></span>
                            <span style={{ "top": "34.4063px", "left": "64.5313px" }}></span>
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="card border-0 bg-light p-4">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h4 className="mb-2">Need Help with Registration?</h4>
                      <p className="mb-0">
                        Contact our Partnership team at{" "}
                        <a href="mailto:partners@thebanky.example" style={{ color: '#074C3E' }}>
                          partners@thebanky.example
                        </a>{" "}
                        or call +91 98765 43211.
                      </p>
                    </div>
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <a href="/contact" className="btn_theme">
                        Contact Support
                        <i className="bi bi-arrow-up-right" />
                        <span style={{ "top": "-15.958px", "left": "32.8125px" }}></span>
                        <span style={{ "top": "34.4063px", "left": "64.5313px" }}></span>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinChannelPartner;
