import titleVector from "../assets/images/title_vector.png";
import { faqData1, faqData2 } from "../constants/faq";

const Faq = () => {
    return (
        <section className="section faq-section" id="faqa">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-7 col-xxl-6">
                    <div className="section__header">
                        <span className="section__header-sub-title headingFour wow fadeInDown" data-wow-duration="0.8s" style={{ visibility: 'visible', animationDuration: '0.8s', animationName: 'fadeInDown' }}><img src={titleVector} alt="vector" />Frequently Asked Questions</span>
                        <h2 className="section__header-title wow fadeInUp" data-wow-duration="0.8s" style={{ visibility: 'visible', animationDuration: '0.8s', animationName: 'fadeInUp' }}>Find Answers to Common Questions</h2>
                        <p className="section__header-content wow fadeInDown" data-wow-duration="0.8s" style={{ visibility: 'visible', animationDuration: '0.8s', animationName: 'fadeInDown' }}>We've compiled a list of frequently asked questions to provide you with quick and helpful answers. If you have a question that is not addressed below</p>
                    </div>
                </div>
            </div> 
            <div className="row justify-content-between gy-4 gy-lg-0">
                <div className="col-12 col-lg-6 col-xxl-6">
                    <div className="accordion wow fadeInDown" data-wow-duration="0.8s" id="faq" style={{ visibility: 'visible', animationDuration: '0.8s', animationName: 'fadeInDown' }}>
                        {faqData1.map((faq, idx) => (
                          <div className={`accordion-item${idx === 0 ? ' accordion_bg' : ''}`} key={faq.id}>
                            <h5 className="accordion-header">
                              <button
                                className={`accordion-button${idx === 0 ? '' : ' collapsed'}`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#faq-accordion-${faq.id}`}
                                aria-expanded={idx === 0 ? "true" : "false"}
                                aria-controls={`faq-accordion-${faq.id}`}
                              >
                                {faq.question}
                              </button>
                            </h5>
                            <div
                              id={`faq-accordion-${faq.id}`}
                              className={`accordion-collapse collapse${idx === 0 ? ' show' : ''}`}
                              data-bs-parent="#faq"
                            >
                              <div className="accordion-body">
                                <p className="mb-0">{faq.answer}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
                <div className="col-12 col-lg-6 col-xxl-6">
                    <div className="accordion wow fadeInUp" data-wow-duration="0.8s" id="faq2" style={{ visibility: 'visible', animationDuration: '0.8s', animationName: 'fadeInUp' }}>
                        {faqData2.map((faq, idx) => (
                          <div className="accordion-item" key={faq.id}>
                            <h5 className="accordion-header">
                              <button
                                className={`accordion-button collapsed`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#faq2-accordion-${faq.id}`}
                                aria-expanded="false"
                                aria-controls={`faq2-accordion-${faq.id}`}
                              >
                                {faq.question}
                              </button>
                            </h5>
                            <div
                              id={`faq2-accordion-${faq.id}`}
                              className="accordion-collapse collapse"
                              data-bs-parent="#faq2"
                            >
                              <div className="accordion-body">
                                <p className="mb-0">{faq.answer}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}
export default Faq;