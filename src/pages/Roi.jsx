import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageBanner from "../component/shared/PageBanner";
import AnimateOnScroll from "../component/shared/AnimateOnScroll";
import "./Roi.css";

// EMI Calculation Helper
function calculateEMI(principal, rate, years) {
  const n = years * 12;
  const r = rate / (12 * 100);
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const Roi = () => {
  const formatINR = (value) => inrFormatter.format(Math.max(0, Number(value) || 0));

  // Dynamic States for ROI Calculator
  const [loanAmount, setLoanAmount] = useState(5000000); // Default: 50 Lakhs
  const [interestRate, setInterestRate] = useState(8.4); // Default: 8.40%
  const [tenure, setTenure] = useState(20); // Default: 20 Years

  // Text inputs states
  const [loanAmountInput, setLoanAmountInput] = useState("5000000");
  const [interestRateInput, setInterestRateInput] = useState("8.4");
  const [tenureInput, setTenureInput] = useState("20");

  // Sync range slider adjustments back to text boxes
  useEffect(() => {
    setLoanAmountInput(String(loanAmount));
  }, [loanAmount]);

  useEffect(() => {
    setInterestRateInput(String(interestRate));
  }, [interestRate]);

  useEffect(() => {
    setTenureInput(String(tenure));
  }, [tenure]);

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const safeNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  // Inputs handlers
  const handleLoanAmountChange = (e) => {
    const raw = e.target.value;
    if (!/^\d*$/.test(raw)) return;
    setLoanAmountInput(raw);
    if (raw === "") return;
    setLoanAmount(clamp(safeNumber(raw, 0), 500000, 100000000)); // Min 5L, Max 10Cr
  };

  const handleInterestRateChange = (e) => {
    const raw = e.target.value;
    if (!/^\d*\.?\d*$/.test(raw)) return;
    setInterestRateInput(raw);
    if (raw === "" || raw === ".") return;
    setInterestRate(clamp(safeNumber(raw, 0.1), 4, 20)); // Min 4%, Max 20%
  };

  const handleTenureChange = (e) => {
    const raw = e.target.value;
    if (!/^\d*$/.test(raw)) return;
    setTenureInput(raw);
    if (raw === "") return;
    setTenure(clamp(safeNumber(raw, 1), 3, 30)); // Min 3, Max 30 years
  };

  // Blur validation
  const handleLoanAmountBlur = () => {
    const val = clamp(safeNumber(loanAmountInput, loanAmount), 500000, 100000000);
    setLoanAmount(val);
    setLoanAmountInput(String(val));
  };

  const handleInterestRateBlur = () => {
    const val = clamp(safeNumber(interestRateInput, interestRate), 4, 20);
    setInterestRate(val);
    setInterestRateInput(String(val));
  };

  const handleTenureBlur = () => {
    const val = clamp(safeNumber(tenureInput, tenure), 3, 30);
    setTenure(val);
    setTenureInput(String(val));
  };

  // Calculations
  const emi = calculateEMI(loanAmount, interestRate, tenure);
  const totalAmount = emi * tenure * 12;
  const totalInterest = Math.max(0, totalAmount - loanAmount);

  // Comparative calculations for Savings (Market rate assumed +0.75% higher)
  const marketRate = Number((interestRate + 0.75).toFixed(2));
  const marketEmi = calculateEMI(loanAmount, marketRate, tenure);
  const marketTotalAmount = marketEmi * tenure * 12;
  const marketTotalInterest = Math.max(0, marketTotalAmount - loanAmount);

  const monthlySavings = Math.max(0, marketEmi - emi);
  const totalSavings = Math.max(0, marketTotalInterest - totalInterest);

  // Tab State
  const [activeTab, setActiveTab] = useState("floating");

  // Search filter for bank rates
  const [searchQuery, setSearchQuery] = useState("");

  const bankRates = [
    { name: "State Bank of India (SBI)", code: "SBI", salaried: "8.40% - 9.15%", selfEmployed: "8.50% - 9.30%", fee: "Nil to 0.35%", ltv: "Up to 90%" },
    { name: "HDFC Bank", code: "HDFC", salaried: "8.50% - 9.40%", selfEmployed: "8.65% - 9.55%", fee: "Up to 0.50%", ltv: "Up to 90%" },
    { name: "ICICI Bank", code: "ICICI", salaried: "8.45% - 9.35%", selfEmployed: "8.60% - 9.50%", fee: "0.25% - 0.50%", ltv: "Up to 90%" },
    { name: "LIC Housing Finance", code: "LICHF", salaried: "8.35% - 8.90%", selfEmployed: "8.50% - 9.10%", fee: "Flat ₹10k - ₹20k", ltv: "Up to 90%" },
    { name: "Axis Bank", code: "AXIS", salaried: "8.60% - 9.45%", selfEmployed: "8.75% - 9.60%", fee: "Up to 0.50%", ltv: "Up to 90%" },
    { name: "Kotak Mahindra Bank", code: "KOTAK", salaried: "8.45% - 9.25%", selfEmployed: "8.55% - 9.35%", fee: "Nil to 0.50%", ltv: "Up to 90%" },
    { name: "Bank of Baroda (BoB)", code: "BOB", salaried: "8.40% - 9.20%", selfEmployed: "8.50% - 9.40%", fee: "Nil (Campaigns)", ltv: "Up to 90%" },
  ];

  const filteredBanks = bankRates.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PageBanner title="Home Loan Interest Rates (ROI)" activeLabel="Interest Rates" />

      <section className="roi-wrapper">
        <div className="container">
          
          {/* Quick Stats Highlights */}
          <div className="roi-stats-container">
            <div className="row g-3">
              <div className="col-6 col-md-3">
                <AnimateOnScroll animation="animate__fadeInUp">
                  <div className="roi-stat-card">
                    <div className="roi-stat-icon">
                      <i className="bi bi-percent"></i>
                    </div>
                    <div className="roi-stat-value text-success">8.35% p.a.</div>
                    <div className="roi-stat-label">Lowest ROI Offered</div>
                  </div>
                </AnimateOnScroll>
              </div>
              <div className="col-6 col-md-3">
                <AnimateOnScroll animation="animate__fadeInUp">
                  <div className="roi-stat-card">
                    <div className="roi-stat-icon">
                      <i className="bi bi-calendar-event"></i>
                    </div>
                    <div className="roi-stat-value">30 Years</div>
                    <div className="roi-stat-label">Maximum Tenure</div>
                  </div>
                </AnimateOnScroll>
              </div>
              <div className="col-6 col-md-3">
                <AnimateOnScroll animation="animate__fadeInUp">
                  <div className="roi-stat-card">
                    <div className="roi-stat-icon">
                      <i className="bi bi-cash-stack"></i>
                    </div>
                    <div className="roi-stat-value">Nil to 0.5%</div>
                    <div className="roi-stat-label">Processing Fees</div>
                  </div>
                </AnimateOnScroll>
              </div>
              <div className="col-6 col-md-3">
                <AnimateOnScroll animation="animate__fadeInUp">
                  <div className="roi-stat-card">
                    <div className="roi-stat-icon">
                      <i className="bi bi-lightning-charge"></i>
                    </div>
                    <div className="roi-stat-value">48 Hours</div>
                    <div className="roi-stat-label">Average Sanction Time</div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>

          {/* Interactive Calculator Section */}
          <div className="row g-4 mb-5">
            <div className="col-lg-7">
              <AnimateOnScroll animation="animate__fadeInLeft">
                <div className="roi-calc-card">
                  <h3 className="roi-calc-title">
                    <i className="bi bi-calculator text-success"></i> EMI & Savings Estimator
                  </h3>
                  <p className="text-muted small mb-4">
                    Adjust the sliders below to estimate your home loan EMI. See how saving even a fraction of a percent in interest rate translates to massive lifetime savings.
                  </p>

                  {/* Loan Amount */}
                  <div className="roi-calc-group">
                    <div className="roi-calc-label-row">
                      <span className="roi-calc-label">Loan Amount Required</span>
                      <span className="text-success fw-bold">{formatINR(loanAmount)}</span>
                    </div>
                    <div className="roi-calc-input-container">
                      <span className="roi-calc-input-prefix">₹</span>
                      <input
                        type="text"
                        className="roi-calc-input"
                        value={loanAmountInput}
                        onChange={handleLoanAmountChange}
                        onBlur={handleLoanAmountBlur}
                      />
                    </div>
                    <input
                      type="range"
                      className="roi-calc-slider"
                      min={500000}
                      max={100000000}
                      step={50000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                    />
                  </div>

                  {/* Interest Rate */}
                  <div className="roi-calc-group">
                    <div className="roi-calc-label-row">
                      <span className="roi-calc-label">Interest Rate (% p.a.)</span>
                      <span className="text-success fw-bold">{interestRate}%</span>
                    </div>
                    <div className="roi-calc-input-container">
                      <input
                        type="text"
                        className="roi-calc-input roi-calc-input-no-prefix"
                        value={interestRateInput}
                        onChange={handleInterestRateChange}
                        onBlur={handleInterestRateBlur}
                      />
                    </div>
                    <input
                      type="range"
                      className="roi-calc-slider"
                      min={5}
                      max={15}
                      step={0.05}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                  </div>

                  {/* Tenure */}
                  <div className="roi-calc-group">
                    <div className="roi-calc-label-row">
                      <span className="roi-calc-label">Loan Tenure (Years)</span>
                      <span className="text-success fw-bold">{tenure} Years</span>
                    </div>
                    <div className="roi-calc-input-container">
                      <input
                        type="text"
                        className="roi-calc-input roi-calc-input-no-prefix"
                        value={tenureInput}
                        onChange={handleTenureChange}
                        onBlur={handleTenureBlur}
                      />
                    </div>
                    <input
                      type="range"
                      className="roi-calc-slider"
                      min={3}
                      max={30}
                      step={1}
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                    />
                  </div>

                </div>
              </AnimateOnScroll>
            </div>

            <div className="col-lg-5">
              <AnimateOnScroll animation="animate__fadeInRight">
                <div className="roi-calc-card d-flex flex-column justify-content-between">
                  <div>
                    <h3 className="roi-calc-title">
                      <i className="bi bi-pie-chart text-success"></i> Calculation Results
                    </h3>

                    {/* Result Display Box */}
                    <div className="roi-calc-result-header">
                      <div className="roi-calc-result-title">Monthly EMI</div>
                      <div className="roi-calc-result-amount">{formatINR(emi)}</div>
                    </div>

                    <div className="roi-calc-grid-results">
                      <div className="roi-calc-mini-card">
                        <div className="roi-calc-mini-label">Principal Amount</div>
                        <div className="roi-calc-mini-value">{formatINR(loanAmount)}</div>
                      </div>
                      <div className="roi-calc-mini-card">
                        <div className="roi-calc-mini-label">Total Interest Payable</div>
                        <div className="roi-calc-mini-value text-danger">{formatINR(totalInterest)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Savings block showing the advantage of a lower rate */}
                  <div className="roi-savings-box mt-3">
                    <i className="bi bi-gift-fill"></i>
                    <div>
                      <h5>Savings with TheBankey</h5>
                      <p>
                        Getting {interestRate}% instead of market average ({marketRate}%) saves you{" "}
                        <strong>{formatINR(monthlySavings)}/month</strong>. Over the tenure, you save{" "}
                        <strong className="text-success">{formatINR(totalSavings)}</strong> in total interest!
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Bank Rate Comparison Table */}
          <div className="row mb-5">
            <div className="col-12">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="roi-section-card">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                    <div>
                      <h3 className="fw-bold text-dark mb-1">Bank-wise Interest Rates Comparison</h3>
                      <p className="text-muted small mb-0">Compare rates from leading private and public sector lenders in India</p>
                    </div>
                    <div className="roi-table-search mt-3 mt-md-0">
                      <i className="bi bi-search roi-table-search-icon"></i>
                      <input
                        type="text"
                        className="roi-table-search-input"
                        placeholder="Search bank name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="roi-table-responsive">
                    <table className="roi-table">
                      <thead>
                        <tr>
                          <th>Bank / Lender Name</th>
                          <th>Salaried (ROI p.a.)</th>
                          <th>Self-Employed (ROI p.a.)</th>
                          <th>Max LTV</th>
                          <th>Processing Fees</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBanks.length > 0 ? (
                          filteredBanks.map((bank, idx) => (
                            <tr key={idx}>
                              <td>
                                <div className="roi-bank-name">
                                  <div className="roi-bank-logo-dummy">{bank.code}</div>
                                  {bank.name}
                                </div>
                              </td>
                              <td>
                                <span className="roi-badge-rate">{bank.salaried}</span>
                              </td>
                              <td>
                                <span className="roi-badge-rate">{bank.selfEmployed}</span>
                              </td>
                              <td>{bank.ltv}</td>
                              <td>{bank.fee}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center py-4 text-muted">
                              No banks found matching your search.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-3 text-muted small">
                    <i className="bi bi-info-circle"></i> *Rates listed above are subject to change by respective banks. The final ROI offered depends on individual credit profile, property valuation, income assessment, and internal bank policies.
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Floating vs. Fixed Rates explanation */}
          <div className="row mb-5">
            <div className="col-12">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="roi-section-card">
                  <h3 className="fw-bold text-dark mb-4">Floating vs. Fixed Interest Rates</h3>
                  
                  {/* Tabs */}
                  <div className="roi-tabs">
                    <button
                      className={`roi-tab-btn ${activeTab === "floating" ? "active" : ""}`}
                      onClick={() => setActiveTab("floating")}
                    >
                      Floating Interest Rate (RLLR)
                    </button>
                    <button
                      className={`roi-tab-btn ${activeTab === "fixed" ? "active" : ""}`}
                      onClick={() => setActiveTab("fixed")}
                    >
                      Fixed Interest Rate
                    </button>
                  </div>

                  {/* Tab content */}
                  <div className="roi-tab-content">
                    {activeTab === "floating" ? (
                      <div>
                        <p className="mb-4">
                          Floating rates are linked to external benchmarks (usually the Repo Rate set by the RBI, referred to as <strong>Repo-Linked Lending Rate (RLLR)</strong>). The interest rate moves up or down in sync with central bank policy rates.
                        </p>
                        <div className="roi-tab-grid">
                          <div className="roi-tab-sub-card pro">
                            <h5><i className="bi bi-hand-thumbs-up"></i> Advantages</h5>
                            <ul>
                              <li>Usually <strong>1% to 2% cheaper</strong> than fixed interest rates initially.</li>
                              <li>If RBI cuts policy rates, your interest rate drops automatically, lowering your EMI or tenure.</li>
                              <li><strong>Zero prepayment charges</strong> allowed by RBI regulations for individual floating-rate home loans.</li>
                            </ul>
                          </div>
                          <div className="roi-tab-sub-card con">
                            <h5><i className="bi bi-hand-thumbs-down"></i> Disadvantages & Risk</h5>
                            <ul>
                              <li>Lack of budget certainty; if inflation rises and RBI increases repo rates, your rate increases.</li>
                              <li>Increases the total interest outgo if interest rates go up during the initial years of the loan.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-4">
                          Fixed interest rates remain constant throughout the entire loan tenure or for a pre-agreed lock-in period (e.g., initial 5 or 10 years). It does not change with market fluctuations.
                        </p>
                        <div className="roi-tab-grid">
                          <div className="roi-tab-sub-card pro">
                            <h5><i className="bi bi-hand-thumbs-up"></i> Advantages</h5>
                            <ul>
                              <li>Provides <strong>complete predictability</strong> of monthly EMIs, making long-term budgeting simple.</li>
                              <li>Shields you from market rate hikes when interest rates are in an upward trend.</li>
                            </ul>
                          </div>
                          <div className="roi-tab-sub-card con">
                            <h5><i className="bi bi-hand-thumbs-down"></i> Disadvantages & Risk</h5>
                            <ul>
                              <li>Usually priced higher than floating rates (premiums of 1% to 2% above float rates).</li>
                              <li>If market rates drop, you do not benefit unless you pay high switching/refinancing fees.</li>
                              <li>Prepayment penalties may apply when you pay off the loan early.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Factors affecting interest rates */}
          <div className="row g-4 mb-5">
            <div className="col-12">
              <h3 className="fw-bold text-dark text-center mb-4">Key Parameters Affecting Your Home Loan ROI</h3>
            </div>
            
            <div className="col-md-6 col-lg-3">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="roi-factor-card">
                  <div className="roi-factor-icon">
                    <i className="bi bi-credit-card-2-front"></i>
                  </div>
                  <h4 className="roi-factor-title">CIBIL (Credit) Score</h4>
                  <p className="roi-factor-text">
                    A credit score of 750+ represents excellent repayment history. Banks offer their prime (lowest) interest rate slabs to applicants with high credit rankings.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>

            <div className="col-md-6 col-lg-3">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="roi-factor-card">
                  <div className="roi-factor-icon">
                    <i className="bi bi-gender-female"></i>
                  </div>
                  <h4 className="roi-factor-title">Gender Concessions</h4>
                  <p className="roi-factor-text">
                    Most Indian lenders offer a special interest concession of 0.05% (5 bps) to women co-applicants if they are the primary owner or co-owner of the property.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>

            <div className="col-md-6 col-lg-3">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="roi-factor-card">
                  <div className="roi-factor-icon">
                    <i className="bi bi-briefcase"></i>
                  </div>
                  <h4 className="roi-factor-title">Employment Profile</h4>
                  <p className="roi-factor-text">
                    Salaried workers (especially Govt/MNC employees) face lower risk assessments, hence they enjoy slightly lower rate slabs compared to self-employed individuals.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>

            <div className="col-md-6 col-lg-3">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="roi-factor-card">
                  <div className="roi-factor-icon">
                    <i className="bi bi-house"></i>
                  </div>
                  <h4 className="roi-factor-title">LTV (Loan-to-Value)</h4>
                  <p className="roi-factor-text">
                    If you pay a higher down payment (low LTV, e.g. &lt;60% of property cost), banks face lower default risk and may offer special concessional rates.
                  </p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Premium CTA section */}
          <div className="row">
            <div className="col-12">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="roi-cta-card">
                  <h2>Get the Lowest Home Loan Interest Rate</h2>
                  <p>
                    Don't settle for standard rates. Our home loan experts coordinate with top-tier lenders to unlock exclusive concessional rate structures customized for your profile, completely free of charge.
                  </p>
                  <Link to="/contact" className="btn_theme btn_theme_active px-5 py-3 fs-5">
                    Speak with an Expert
                    <i className="bi bi-arrow-up-right"></i>
                  </Link>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Roi;
