import { useState } from "react";
import PageBanner from "../component/shared/PageBanner";
import AnimateOnScroll from "../component/shared/AnimateOnScroll";

const JoinEmployee = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
    coverLetter: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Prepare data for Google Sheets (skip file)
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      experience: formData.experience,
      coverLetter: formData.coverLetter,
      resumeFileName: formData.resume ? formData.resume.name : '',
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

      // If using no-cors, response will be opaque; we can't read it.
      // For simplicity, assume success.
      console.log('Form data sent to Google Sheets');
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const jobPositions = [
    "Loan Officer",
    "Credit Analyst",
    "Customer Service Representative",
    "Sales Executive",
    "Marketing Specialist",
    "IT Support",
    "HR Manager",
    "Finance Analyst",
    "Branch Manager",
    "Operations Supervisor"
  ];

  const experienceLevels = [
    "Fresh Graduate",
    "1-3 years",
    "3-5 years",
    "5-8 years",
    "8+ years"
  ];

  const benefits = [
    "Competitive salary with performance bonuses",
    "Health insurance & wellness programs",
    "Professional development & training",
    "Flexible working hours & remote options",
    "Career growth opportunities",
    "Team building activities & events",
    "Retirement savings plan",
    "Paid time off & holidays"
  ];

  return (
    <>
      <PageBanner title="Join as an Employee" activeLabel="Careers" />

      <section className="section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="text-center mb-5">
                  <h2 className="section__content-title mb-3">Build Your Career with TheBankey</h2>
                  <p className="section__content-text">
                    Join our team of passionate professionals dedicated to helping people achieve their
                    financial goals through innovative loan solutions. We're looking for talented individuals
                    who share our commitment to excellence and customer satisfaction.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-lg-6">
              <AnimateOnScroll animation="animate__fadeInLeft">
                <div className="card border-0 shadow-sm p-4 h-100">
                  <h3 className="h4 mb-4">Why Work With Us?</h3>

                  <div className="mb-4">
                    <h4 className="h5 text-primary mb-3">Our Culture</h4>
                    <p>
                      At TheBankey, we foster a collaborative environment where innovation is encouraged,
                      and every team member's contribution is valued. We believe in work-life balance and
                      provide the support you need to grow both personally and professionally.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="h5 text-primary mb-3">Benefits & Perks</h4>
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
                    <h4 className="h5 text-primary mb-3">Current Openings</h4>
                    <p>
                      We're actively hiring for positions in Sales, Operations, Customer Service,
                      Technology, and Finance. Even if you don't see your perfect role listed,
                      we encourage you to apply—we're always looking for great talent!
                    </p>
                    <div className="mt-3">
                      <a href="#application-form" className="btn_theme btn_theme_active">
                        Apply Now
                        <i className="bi bi-arrow-up-right"></i>
                        <span style={{ top: "53.7969px", left: "42.5px" }}></span>
                      </a>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            <div className="col-lg-6">
              <AnimateOnScroll animation="animate__fadeInRight">
                <div className="card border-0 shadow-sm p-4" id="application-form">
                  <h3 className="h4 mb-4">Application Form</h3>

                  {submitted ? (
                    <div className="alert alert-success">
                      <h4 className="alert-heading">Thank You!</h4>
                      <p>
                        Your application has been submitted successfully. Our HR team will review
                        your application and contact you within 3-5 business days.
                      </p>
                      <button
                        className="btn btn-outline-primary mt-2"
                        onClick={() => setSubmitted(false)}
                      >
                        Submit Another Application
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
                          <label htmlFor="position" className="form-label">
                            Desired Position *
                          </label>
                          <select
                            id="position"
                            name="position"
                            className="form-select"
                            value={formData.position}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select a position</option>
                            {jobPositions.map((pos, index) => (
                              <option key={index} value={pos}>
                                {pos}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="experience" className="form-label">
                            Years of Experience *
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            className="form-select"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select experience level</option>
                            {experienceLevels.map((level, index) => (
                              <option key={index} value={level}>
                                {level}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="resume" className="form-label">
                            Resume/CV *
                          </label>
                          <input
                            id="resume"
                            name="resume"
                            type="file"
                            className="form-control"
                            onChange={handleChange}
                            accept=".pdf,.doc,.docx"
                            required
                          />
                          <small className="form-text text-muted d-block mt-2">
                            Accepted formats: PDF, DOC, DOCX (Max 5MB)
                          </small>
                        </div>

                        <div className="col-12">
                          <label htmlFor="coverLetter" className="form-label">
                            Cover Letter
                          </label>
                          <textarea
                            id="coverLetter"
                            name="coverLetter"
                            className="form-control"
                            rows="4"
                            value={formData.coverLetter}
                            onChange={handleChange}
                            placeholder="Tell us why you're interested in joining TheBankey..."
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
                              <a href="#" className="text-primary">
                                Privacy Policy
                              </a>{" "}
                              and consent to my data being processed for recruitment purposes.
                            </label>
                          </div>
                        </div>

                        <div className="col-12">
                          <button type="submit" className="btn_theme btn_theme_active w-100 justify-content-center" disabled={loading}>
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Submitting...
                              </>
                            ) : (
                              <>
                                Submit Application
                                <i className="bi bi-arrow-up-right"></i>
                                <span style={{ top: "53.7969px", left: "42.5px" }}></span>
                              </>
                            )}
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
                      <h4 className="mb-2">Have Questions About the Application Process?</h4>
                      <p className="mb-0">
                        Contact our HR team at{" "}
                        <a href="mailto:careers@thebanky.com" className="text-primary">
                          careers@thebankey.com
                        </a>{" "}
                        or call +91 98765 43210.
                      </p>
                    </div>
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <a href="/contact" className="btn btn-outline-primary">
                        Contact HR
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

export default JoinEmployee;