import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageBanner from "../component/shared/PageBanner";
import AnimateOnScroll from "../component/shared/AnimateOnScroll";
import "./Cibil.css";

const Cibil = () => {
  const [score, setScore] = useState(750);
  const [activeDisputeTab, setActiveDisputeTab] = useState("balance");

  // Dynamic Rating logic
  const getRating = (val) => {
    if (val >= 750) {
      return {
        label: "Excellent",
        color: "#16a34a",
        bgLight: "#f0fdf4",
        textStyle: "text-success",
        prob: "High Approval Probability",
        desc: "Outstanding credit profile! Lenders view you as a highly responsible borrower. You are highly likely to get quick approval on loans and credit cards with the best possible terms and lowest interest rates.",
        icon: "bi-check-circle-fill",
        probStyle: { backgroundColor: "#dcfce7", color: "#15803d" }
      };
    } else if (val >= 650) {
      return {
        label: "Good",
        color: "#d97706",
        bgLight: "#fef3c7",
        textStyle: "text-warning",
        prob: "Good Approval Probability",
        desc: "Strong credit history. You have a very good chance of loan approval. Lenders will review your applications favorably, though interest rates might be standard.",
        icon: "bi-check-circle",
        probStyle: { backgroundColor: "#fef9c3", color: "#854d0e" }
      };
    } else if (val >= 550) {
      return {
        label: "Fair",
        color: "#f97316",
        bgLight: "#fff7ed",
        textStyle: "text-primary",
        prob: "Moderate Approval Probability",
        desc: "Moderate credit profile. Approval is possible, but lenders will exercise caution. They may ask for a higher down payment, guarantor, or charge higher interest rates.",
        icon: "bi-exclamation-circle",
        probStyle: { backgroundColor: "#ffedd5", color: "#c2410c" }
      };
    } else {
      return {
        label: "Poor",
        color: "#ef4444",
        bgLight: "#fef2f2",
        textStyle: "text-danger",
        prob: "Low Approval Probability",
        desc: "Low credit score. Lenders see you as a high-risk borrower. There is a high risk of loan rejection. Focus on improving your score using the steps below before applying.",
        icon: "bi-x-circle-fill",
        probStyle: { backgroundColor: "#fee2e2", color: "#b91c1c" }
      };
    }
  };

  const rating = getRating(score);

  // SVG Gauge calculations
  const r = 90;
  const circumference = 2 * Math.PI * r;
  const percentage = (score - 300) / 600;
  const strokeDashoffset = circumference - percentage * circumference;

  // Dispute tabs content
  const disputeTabs = {
    balance: {
      title: "Inaccurate Current Balance or Amount Overdue",
      icon: "bi-currency-rupee",
      body: (
        <>
          <p>
            On purchasing your CIBIL Score and Report, you may notice that your <strong>‘Current Balance’</strong> or <strong>‘Amount Overdue’</strong> may not be updated.
          </p>
          <p>
            This is usually because the CIBIL report reflects information submitted monthly by lenders, so recent payments may take up to 30-45 days to show. However, if it has been longer, it should be disputed with the bank or financial institution.
          </p>
          <div className="alert alert-warning border-0 mt-3" style={{ background: "rgba(255, 193, 7, 0.1)", color: "#854d0e" }}>
            <i className="bi bi-info-circle-fill me-2"></i>
            <strong>Important:</strong> CIBIL cannot alter any credit information in your report unless authorized by the Credit Institution (CI).
          </div>
        </>
      ),
    },
    personal: {
      title: "Incorrect Personal Details",
      icon: "bi-person-badge",
      body: (
        <>
          <p>
            Ensure that your name, address, contact details, PAN, and date of birth are correct. Any errors here can lead to mapping issues where someone else's credit data gets linked to your report, or vice versa, causing a fall in your credit rating.
          </p>
          <p>
            It is critical to rectify spelling errors, double entries, or outdated contact info by raising a dispute directly.
          </p>
        </>
      ),
    },
    ownership: {
      title: "Ownership Details",
      icon: "bi-shield-check",
      body: (
        <>
          <p>
            If any account or enquiry listed in your report does not belong to you, it could be a sign of identity theft or a clerical error by the credit institution.
          </p>
          <p>
            This should be disputed immediately to remove unauthorized items from your profile and protect your credit reputation.
          </p>
        </>
      ),
    },
  };

  return (
    <div className="cibil-wrapper">
      <PageBanner title="CIBIL Score Guide" activeLabel="CIBIL Score" />

      {/* Intro & Simulator Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="cibil-section-subtitle">Score Simulator</span>
          <h2 className="cibil-section-title">Check Your Loan Approval Odds</h2>
          <p className="cibil-section-intro">
            CIBIL Score is a 3 digit numeric summary of your credit history, derived by using details found in the ‘Accounts’ and ‘Enquiries’ sections on your CIBIL Report and ranges from 300 to 900.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Gauge card */}
          <div className="col-lg-6">
            <div className="cibil-simulator-card text-center d-flex flex-column justify-content-between">
              <div>
                <h3 className="fs-4 fw-bold mb-4 text-dark">Interactive Score Meter</h3>
                <div className="cibil-gauge-container">
                  <svg className="cibil-gauge-svg">
                    <circle
                      className="cibil-gauge-bg"
                      cx="120"
                      cy="120"
                      r={r}
                    />
                    <circle
                      className="cibil-gauge-progress"
                      cx="120"
                      cy="120"
                      r={r}
                      stroke={rating.color}
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                    />
                  </svg>
                  <div className="cibil-gauge-info">
                    <span className="cibil-gauge-score">{score}</span>
                    <span className="cibil-gauge-range-label">Range: 300 - 900</span>
                    <span
                      className="cibil-gauge-rating"
                      style={{ backgroundColor: rating.color }}
                    >
                      {rating.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider control */}
              <div className="cibil-slider-container">
                <div className="cibil-slider-header">
                  <span>Poor (300)</span>
                  <span>Excellent (900)</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="900"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="cibil-slider"
                  style={{
                    background: `linear-gradient(to right, ${rating.color} 0%, ${rating.color} ${
                      ((score - 300) / 600) * 100
                    }%, #e2e8f0 ${((score - 300) / 600) * 100}%, #e2e8f0 100%)`
                  }}
                />
                <div className="cibil-slider-ticks">
                  <span>300</span>
                  <span>550</span>
                  <span>650</span>
                  <span>750</span>
                  <span>900</span>
                </div>
                <p className="mt-3 text-muted small">
                  Drag the slider to simulate different CIBIL scores and view loan approval chances.
                </p>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="col-lg-6">
            <div className="cibil-result-panel">
              <div
                className="cibil-prob-badge"
                style={rating.probStyle}
              >
                <i className={`bi ${rating.icon}`}></i>
                {rating.prob}
              </div>
              <h4 className="cibil-result-title text-dark">
                Score Range Impact (Rating: <span style={{ color: rating.color }}>{rating.label}</span>)
              </h4>
              <p className="cibil-result-desc">{rating.desc}</p>
              <div className="border-top pt-4">
                <h5 className="fs-6 fw-bold mb-3 text-dark">What this score tells lenders:</h5>
                <ul className="list-unstyled d-flex flex-column gap-2 text-muted small">
                  <li className="d-flex align-items-start gap-2">
                    <i className="bi bi-chevron-right text-success mt-1"></i>
                    The closer your score is to 900, the higher are the chances of your loan application getting approved.
                  </li>
                  <li className="d-flex align-items-start gap-2">
                    <i className="bi bi-chevron-right text-success mt-1"></i>
                    A high score represents lower credit risk, ensuring faster disbursals and better interest rates.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Major Factors Section */}
      <section className="bg-white py-5 border-top border-bottom">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="cibil-section-subtitle">Score Determinants</span>
            <h2 className="cibil-section-title">4 Major Factors That Affect Your CIBIL Score</h2>
            <p className="cibil-section-intro">
              Lenders analyze these critical factors when reading your CIBIL report. Understanding them is key to maintaining a high score.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="cibil-factor-card">
                <div className="cibil-factor-icon-wrapper">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <h3 className="cibil-factor-title">Payment History</h3>
                <p className="cibil-factor-desc">
                  Making late payments or defaulting your EMIs or dues (recently or consistently) will negatively impact your score.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="cibil-factor-card">
                <div className="cibil-factor-icon-wrapper">
                  <i className="bi bi-search"></i>
                </div>
                <h3 className="cibil-factor-title">Multiple Enquiries</h3>
                <p className="cibil-factor-desc">
                  If you have recently been sanctioned multiple loans and credit cards, lenders view applications with caution indicating a high debt burden.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="cibil-factor-card">
                <div className="cibil-factor-icon-wrapper">
                  <i className="bi bi-wallet2"></i>
                </div>
                <h3 className="cibil-factor-title">High Credit Utilization</h3>
                <p className="cibil-factor-desc">
                  An increase in the current balance of your credit card indicates an increased repayment burden and may negatively affect your score.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="cibil-factor-card">
                <div className="cibil-factor-icon-wrapper">
                  <i className="bi bi-pie-chart"></i>
                </div>
                <h3 className="cibil-factor-title">Credit Mix</h3>
                <p className="cibil-factor-desc">
                  A balanced mix between secured loans (Auto, Home) and unsecured loans (Personal, Credit Cards) positively affects your score.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Steps to Improve Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="cibil-section-subtitle">Improvement Roadmap</span>
          <h2 className="cibil-section-title">How Can I Improve My CIBIL Score?</h2>
          <p className="cibil-section-intro">
            Maintaining a good credit history is essential for loan approvals by lenders. Follow these 6 steps to systematically improve your score.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-md-6 col-lg-4">
            <div className="cibil-step-card">
              <span className="cibil-step-num">01</span>
              <h3 className="cibil-step-title">
                <i className="bi bi-check2-circle"></i>
                Pay Dues on Time
              </h3>
              <p className="cibil-step-desc">
                Late payments are viewed negatively by lenders. Set reminders or auto-debits to ensure zero default history.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="cibil-step-card">
              <span className="cibil-step-num">02</span>
              <h3 className="cibil-step-title">
                <i className="bi bi-percent"></i>
                Keep Balances Low
              </h3>
              <p className="cibil-step-desc">
                Always be prudent not to use too much credit. Control your credit card utilization below 30% of your limit.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="cibil-step-card">
              <span className="cibil-step-num">03</span>
              <h3 className="cibil-step-title">
                <i className="bi bi-layers"></i>
                Maintain Healthy Mix
              </h3>
              <p className="cibil-step-desc">
                Have a healthy mix of secured loans (home, auto) and unsecured loans (credit cards). Too many unsecured loans raise flags.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="cibil-step-card">
              <span className="cibil-step-num">04</span>
              <h3 className="cibil-step-title">
                <i className="bi bi-shield-exclamation"></i>
                Moderate Credit Seeking
              </h3>
              <p className="cibil-step-desc">
                Do not seek excessive credit continuously. Apply for new credit cards or loans cautiously and moderately.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="cibil-step-card">
              <span className="cibil-step-num">05</span>
              <h3 className="cibil-step-title">
                <i className="bi bi-people"></i>
                Monitor Co-Signed Accounts
              </h3>
              <p className="cibil-step-desc">
                Monitor guaranteed or joint accounts monthly. You are equally liable; co-holder negligence impacts your ability to get credit.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <div className="cibil-step-card">
              <span className="cibil-step-num">06</span>
              <h3 className="cibil-step-title">
                <i className="bi bi-clock-history"></i>
                Review Credit History
              </h3>
              <p className="cibil-step-desc">
                Monitor your CIBIL Score and Report regularly throughout the year to avoid unpleasant surprises in loan applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Correcting Mistakes Section */}
      <section className="bg-white py-5 border-top border-bottom">
        <div className="container py-4">
          <div className="text-center mb-5">
            <span className="cibil-section-subtitle">Dispute Settlement</span>
            <h2 className="cibil-section-title">How to Correct Mistakes on Your CIBIL Report</h2>
            <p className="cibil-section-intro">
              Inaccuracies on your credit report can result in reduced chances of a loan approval. Understand the types of inaccuracies that occur.
            </p>
          </div>

          <div className="row g-4 align-items-stretch">
            {/* Left navigation */}
            <div className="col-lg-4">
              <div className="cibil-dispute-nav">
                {Object.keys(disputeTabs).map((key) => (
                  <button
                    key={key}
                    className={`cibil-dispute-nav-btn ${activeDisputeTab === key ? "active" : ""}`}
                    onClick={() => setActiveDisputeTab(key)}
                  >
                    <span>
                      <i className={`bi ${disputeTabs[key].icon} me-2`}></i>
                      {disputeTabs[key].title.split(" or ")[0].split(" Details")[0]}
                    </span>
                    <i className="bi bi-chevron-right"></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Right details content */}
            <div className="col-lg-8">
              <div className="cibil-dispute-content-card">
                <h3 className="cibil-dispute-content-title">
                  <i className={`bi ${disputeTabs[activeDisputeTab].icon}`}></i>
                  {disputeTabs[activeDisputeTab].title}
                </h3>
                <div className="cibil-dispute-content-body mt-3">
                  {disputeTabs[activeDisputeTab].body}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Myths vs Facts Section */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <span className="cibil-section-subtitle">Myths vs. Facts</span>
          <h2 className="cibil-section-title">Busting Common Credit Myths</h2>
          <p className="cibil-section-intro">
            Get the facts right. Don't let rumors compromise your borrowing power. Here is the truth behind common CIBIL myths.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-12">
            <div className="cibil-simulator-card">
              
              {/* Myth/Fact 1 */}
              <div className="cibil-myth-fact-row">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="cibil-myth-box">
                      <div className="cibil-myth-header">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        Myth
                      </div>
                      <p className="cibil-myth-text">
                        CIBIL maintains a list of defaulters only, and having your name in CIBIL is bad.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cibil-fact-box">
                      <div className="cibil-fact-header">
                        <i className="bi bi-check-circle-fill"></i>
                        Fact
                      </div>
                      <p className="cibil-fact-text">
                        If you have ever taken a loan or credit card, your name is with CIBIL. It tracks repayment history monthly. Positive history leads to easier, faster loan approvals. CIBIL does not classify individuals as defaulters.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Myth/Fact 2 */}
              <div className="cibil-myth-fact-row">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="cibil-myth-box">
                      <div className="cibil-myth-header">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        Myth
                      </div>
                      <p className="cibil-myth-text">
                        Checking your own CIBIL Score and Report will make your score go down.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cibil-fact-box">
                      <div className="cibil-fact-header">
                        <i className="bi bi-check-circle-fill"></i>
                        Fact
                      </div>
                      <p className="cibil-fact-text">
                        When you check your own score directly from CIBIL, it is classified as a "soft enquiry" and has absolutely zero impact on your credit score. Only hard enquiries (made by banks when you apply for loans) can impact it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Myth/Fact 3 */}
              <div className="cibil-myth-fact-row">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="cibil-myth-box">
                      <div className="cibil-myth-header">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        Myth
                      </div>
                      <p className="cibil-myth-text">
                        It is better to use cash instead of using credit cards or loans.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cibil-fact-box">
                      <div className="cibil-fact-header">
                        <i className="bi bi-check-circle-fill"></i>
                        Fact
                      </div>
                      <p className="cibil-fact-text">
                        Having a responsible credit history is much better than having no history at all. Without a credit history, lenders have no reference to verify your payment track record, making approvals slower or harder. Use credit cards wisely and pay full balances monthly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Myth/Fact 4 */}
              <div className="cibil-myth-fact-row">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="cibil-myth-box">
                      <div className="cibil-myth-header">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        Myth
                      </div>
                      <p className="cibil-myth-text">
                        CIBIL is an organization meant ONLY to help banks and financial institutions.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cibil-fact-box">
                      <div className="cibil-fact-header">
                        <i className="bi bi-check-circle-fill"></i>
                        Fact
                      </div>
                      <p className="cibil-fact-text">
                        CIBIL's goal is to empower consumers to build credit discipline. By helping you understand how lenders evaluate your applications, you can apply only when approval chances are high and avoid unnecessary rejections.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Myth/Fact 5 */}
              <div className="cibil-myth-fact-row">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="cibil-myth-box">
                      <div className="cibil-myth-header">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        Myth
                      </div>
                      <p className="cibil-myth-text">
                        CIBIL has the authority to make corrections in my credit report directly.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cibil-fact-box">
                      <div className="cibil-fact-header">
                        <i className="bi bi-check-circle-fill"></i>
                        Fact
                      </div>
                      <p className="cibil-fact-text">
                        CIBIL cannot make unilateral changes in your report. Any correction must be approved and initiated by the respective bank or financial institution. CIBIL can only facilitate this communication process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Myth/Fact 6 */}
              <div className="cibil-myth-fact-row">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="cibil-myth-box">
                      <div className="cibil-myth-header">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        Myth
                      </div>
                      <p className="cibil-myth-text">
                        A low CIBIL Score means I will never get a loan or credit card.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cibil-fact-box">
                      <div className="cibil-fact-header">
                        <i className="bi bi-check-circle-fill"></i>
                        Fact
                      </div>
                      <p className="cibil-fact-text">
                        There is a lender for every borrower. Some institutions specialize in lending to individuals with lower scores. However, they will charge higher interest rates or processing fees due to the higher perceived risk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Myth/Fact 7 */}
              <div className="cibil-myth-fact-row">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="cibil-myth-box">
                      <div className="cibil-myth-header">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        Myth
                      </div>
                      <p className="cibil-myth-text">
                        My assets, income, investments, savings accounts; all have an impact on my CIBIL Score.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cibil-fact-box">
                      <div className="cibil-fact-header">
                        <i className="bi bi-check-circle-fill"></i>
                        Fact
                      </div>
                      <p className="cibil-fact-text">
                        CIBIL Report only aggregates loan and credit card accounts history. It does not look at your bank balances, mutual funds, salary/income details, or other investments. None of these affect your CIBIL score.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Myth/Fact 8 */}
              <div className="cibil-myth-fact-row">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="cibil-myth-box">
                      <div className="cibil-myth-header">
                        <i className="bi bi-exclamation-triangle-fill"></i>
                        Myth
                      </div>
                      <p className="cibil-myth-text">
                        A bounced cheque will lead to a lower credit score for the issuer.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="cibil-fact-box">
                      <div className="cibil-fact-header">
                        <i className="bi bi-check-circle-fill"></i>
                        Fact
                      </div>
                      <p className="cibil-fact-text">
                        Since savings or current account details are not reported to CIBIL, a bounced cheque does not directly impact your credit score. However, missing an EMI payment or credit card dues will drastically reduce your CIBIL score.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-4 mb-5">
        <div className="cibil-cta-card">
          <h2 className="cibil-cta-title">Ready to secure your dream loan?</h2>
          <p className="cibil-cta-desc">
            Let our home loan specialists review your CIBIL standing and recommend the best banking partner for your profile. Get professional advisory at zero cost!
          </p>
          <Link to="/contact" className="cibil-cta-btn">
            Get Free Consultation
            <i className="bi bi-arrow-right-short"></i>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cibil;
