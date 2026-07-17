import React from "react";
import { Link } from "react-router-dom";
import PageBanner from "../component/shared/PageBanner";
import AnimateOnScroll from "../component/shared/AnimateOnScroll";

const LoanComparison = () => {
  const homeLoans = [
    {
      id: "sbi-home-loan",
      title: "SBI Home Loan",
      icon: "bi-bank",
      interestRate: "From 8.40% p.a.",
      loanAmount: "Up to 90% of property value",
      tenure: "Up to 30 Years",
      processingFee: "0.15% - 0.35%",
      features: [
        "Low interest rates",
        "No hidden charges",
        "Overdraft facility available",
        "Concession for women borrowers"
      ],
      popularBanks: ["State Bank of India"]
    },
    {
      id: "hdfc-home-loan",
      title: "HDFC Home Loan",
      icon: "bi-building",
      interestRate: "From 8.50% p.a.",
      loanAmount: "Up to 90% of property value",
      tenure: "Up to 30 Years",
      processingFee: "Up to 0.50%",
      features: [
        "Customized repayment options",
        "Expert legal and technical counseling",
        "Seamless digital approval process",
        "Special rates for existing customers"
      ],
      popularBanks: ["HDFC Bank"]
    },
    {
      id: "icici-home-loan",
      title: "ICICI Bank Home Loan",
      icon: "bi-house-heart",
      interestRate: "From 8.75% p.a.",
      loanAmount: "Up to ₹5 Crores",
      tenure: "Up to 30 Years",
      processingFee: "0.50% - 1.00%",
      features: [
        "Instant provisional sanction",
        "Balance transfer facility with top-up",
        "Micro-market focused solutions",
        "Doorstep service available"
      ],
      popularBanks: ["ICICI Bank"]
    },
    {
      id: "axis-home-loan",
      title: "Axis Bank Home Loan",
      icon: "bi-house",
      interestRate: "From 8.70% p.a.",
      loanAmount: "Up to ₹5 Crores",
      tenure: "Up to 30 Years",
      processingFee: "Up to 1%",
      features: [
        "Asha home loans for affordable housing",
        "Fast track processing",
        "Floating and fixed rate options",
        "Nil prepayment charges on floating rates"
      ],
      popularBanks: ["Axis Bank"]
    }
  ];

  return (
    <>
      <PageBanner title="Home Loan Comparison" activeLabel="Compare Home Loans" />

      <section className="section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="text-center mb-5">
                  <h2 className="section__content-title mb-3">Compare Top Home Loans</h2>
                  <p className="section__content-text">
                    Finding the right home loan doesn't have to be complicated. Compare interest rates,
                    processing fees, and loan tenures across top banking partners to make an informed
                    decision for your dream home.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          <div className="row g-4 loan-reviews justify-content-center">
            {homeLoans.map((loan, index) => (
              <div key={loan.id} className="col-lg-4 col-md-6">
                <AnimateOnScroll
                  animation={index % 2 === 0 ? "animate__fadeInLeft" : "animate__fadeInRight"}
                >
                  <div className="loan-reviews_card card h-100 p-4" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '20px' }}>
                    <div className="loan-reviews__part-one w-100 p-0 d-flex flex-row align-items-center justify-content-between gap-3">
                      <div 
                        className="loan-reviews__thumb d-flex align-items-center justify-content-center m-0"
                        style={{ backgroundColor: 'rgba(7, 76, 62, 0.05)', width: '80px', height: '80px', borderRadius: '16px' }}
                      >
                        <i className={`bi ${loan.icon}`} style={{ fontSize: '2.5rem', color: '#074C3E' }}></i>
                      </div>
                      <div className="loan-reviews__review m-0 border-0 p-0">
                        <div className="d-flex align-items-center gap-2 bg-light rounded-pill px-3 py-1 border">
                          <i className="bi bi-star-fill text-warning"></i>
                          <span className="fw-bold" style={{ color: '#074C3E' }}>4.9</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="loan-reviews__part-two position-relative d-flex flex-column w-100 p-0 mt-2" style={{ borderLeft: 'none' }}>
                      <style>
                        {`
                          .loan-reviews__part-two::before { display: none !important; }
                          .loan-reviews__part-two::after { display: none !important; }
                        `}
                      </style>
                      <div className="reviews-heading mb-3">
                        <h4 className="reviews-heading__title h5">{loan.title}</h4>
                        <p className="reviews-heading__content small text-muted mb-0">
                          Top partner for your home financing needs
                        </p>
                      </div>
                      <div className="reviews-inner flex-grow-1">
                        <ul className="mb-4 list-unstyled">
                          <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i><strong>Rate:</strong> {loan.interestRate}</li>
                          <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i><strong>Amount:</strong> {loan.loanAmount}</li>
                          <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i><strong>Tenure:</strong> {loan.tenure}</li>
                          <li className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i><strong>Fee:</strong> {loan.processingFee}</li>
                          {loan.features.slice(0, 1).map((feature, i) => (
                            <li key={i} className="mb-2"><i className="bi bi-check2-circle text-success me-2"></i>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-auto pt-3 border-top">
                        <p className="small text-muted mb-3 text-center">
                          <span className="fw-bold">Provider:</span> {loan.popularBanks.join(", ")}
                        </p>
                        <Link to="/contact" className="btn_theme w-100 justify-content-center">
                          Apply Now
                          <i className="bi bi-arrow-up-right" />
                          <span style={{ "top": "-15.958px", "left": "32.8125px" }}></span>
                          <span style={{ "top": "34.4063px", "left": "64.5313px" }}></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-12">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="card border-0 text-white p-4 p-md-5 text-center shadow" style={{ backgroundColor: '#074C3E' }}>
                  <h3 className="mb-3 text-white">Need Help Choosing?</h3>
                  <p className="mb-4 lead opacity-75">
                    Our financial experts can help you compare and select the perfect loan product tailored to your unique profile.
                  </p>
                  <div>
                    <Link to="/contact" className="btn_theme btn_theme_active btn-lg px-5 me-md-3 mb-3 mb-md-0" style={{ border: 'none' }}>
                      Talk to an Expert
                      <i className="bi bi-arrow-up-right" />
                      <span style={{ "top": "-15.958px", "left": "32.8125px" }}></span>
                      <span style={{ "top": "34.4063px", "left": "64.5313px" }}></span>
                    </Link>
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

export default LoanComparison;
