import { useState } from "react";
import PageBanner from "../component/shared/PageBanner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
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
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString(),
    };

    const targetUrl =
      import.meta.env.VITE_CONTACT_GOOGLE_SHEETS_WEB_APP_URL ||
      import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;

    try {
      await fetch(targetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Contact form data sent to Google Sheets");
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageBanner title="Contact Us" activeLabel="Contact us" />
      <section className="section py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <div className="section__content">
                <h2 className="section__content-title mb-4">Get in touch</h2>
                <p className="section__content-text mb-3">
                  Have a question about loans or our platform? Send us a message
                  and we will get back to you.
                </p>
                <ul className="list-unstyled section__content-text">
                  <li className="mb-2">
                    <strong>Email:</strong> support@thebanky.example
                  </li>
                  <li className="mb-2">
                    <strong>Hours:</strong> Mon–Fri, 9:00–18:00 IST
                  </li>
                  <li className="mb-2">
                    <strong>Corporate Address:</strong> D-22, Third Floor, Sector 3, Noida, Uttar Pradesh
                  </li>
                </ul>
              </div>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.6316688417137!2d77.3209296!3d28.5808212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce53fbc26da61%3A0x563f5b211573a0b2!2sTheBankey!5e0!3m2!1sen!2sin!4v1784345357543!5m2!1sen!2sin"
                  height="300" style={{ border: 0, width: '100%' }} allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>

              </div>
            </div>
            <div className="col-lg-7">
              {submitted ? (
                <div className="alert alert-success p-4">
                  <h4 className="alert-heading fw-bold">Message Sent!</h4>
                  <p className="mb-0">
                    Thank you for reaching out to us. Your query has been received
                    successfully. Our team will get back to you shortly.
                  </p>
                  <button
                    className="btn btn-outline-success mt-3"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="row g-3" onSubmit={handleSubmit}>
                  {error && (
                    <div className="col-12">
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    </div>
                  )}
                  <div className="col-md-6">
                    <label htmlFor="contact-name" className="form-label">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="contact-email" className="form-label">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="contact-subject" className="form-label">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      className="form-control"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="contact-message" className="form-label">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="form-control"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn_theme btn_theme_active w-100 justify-content-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Sending message...
                        </>
                      ) : (
                        <>
                          Send message
                          <i className="bi bi-arrow-up-right" />
                          <span style={{ top: "53.7969px", left: "42.5px" }}></span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
