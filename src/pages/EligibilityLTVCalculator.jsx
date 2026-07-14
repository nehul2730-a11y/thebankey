import React, { useState, useEffect } from "react";
import PageBanner from "../component/shared/PageBanner";
import AnimateOnScroll from "../component/shared/AnimateOnScroll";
import "./EligibilityLTVCalculator.css";

// EMI Calculation Helper
function calculateEMI(principal, rate, years) {
  const n = years * 12;
  const r = rate / (12 * 100);
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// Reverse EMI to find Principal based on affordable EMI
function calculatePrincipalFromEMI(emi, rate, years) {
  const n = years * 12;
  const r = rate / (12 * 100);
  if (r === 0) return emi * n;
  return emi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
}

const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const EligibilityLTVCalculator = () => {
  // Format currency
  const formatINR = (value) => inrFormatter.format(Math.max(0, Number(value) || 0));

  // Numeric States
  const [propertyValue, setPropertyValue] = useState(5000000); // 50 Lakhs
  const [monthlyIncome, setMonthlyIncome] = useState(75000); // 75k
  const [existingEmi, setExistingEmi] = useState(10000); // 10k
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenure, setTenure] = useState(20); // 20 Years
  const [ltvRatio, setLtvRatio] = useState(80); // 80% LTV
  const [foir, setFoir] = useState(50); // 50% FOIR

  // String Inputs for text box edits (handling empty/partial values)
  const [propertyValueInput, setPropertyValueInput] = useState("5000000");
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState("75000");
  const [existingEmiInput, setExistingEmiInput] = useState("10000");
  const [interestRateInput, setInterestRateInput] = useState("8.5");
  const [tenureInput, setTenureInput] = useState("20");
  const [ltvRatioInput, setLtvRatioInput] = useState("80");
  const [foirInput, setFoirInput] = useState("50");

  // Sync range slider adjustments back to text boxes
  useEffect(() => {
    setPropertyValueInput(String(propertyValue));
  }, [propertyValue]);

  useEffect(() => {
    setMonthlyIncomeInput(String(monthlyIncome));
  }, [monthlyIncome]);

  useEffect(() => {
    setExistingEmiInput(String(existingEmi));
  }, [existingEmi]);

  useEffect(() => {
    setInterestRateInput(String(interestRate));
  }, [interestRate]);

  useEffect(() => {
    setTenureInput(String(tenure));
  }, [tenure]);

  useEffect(() => {
    setLtvRatioInput(String(ltvRatio));
  }, [ltvRatio]);

  useEffect(() => {
    setFoirInput(String(foir));
  }, [foir]);

  // Clamp and safe parses
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const safeNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  // Input Change Handlers
  const handlePropertyValueChange = (e) => {
    const raw = e.target.value;
    if (!/^\d*$/.test(raw)) return;
    setPropertyValueInput(raw);
    if (raw === "") return;
    setPropertyValue(clamp(safeNumber(raw, 0), 100000, 100000000)); // Min 1L, Max 10Cr
  };

  const handleMonthlyIncomeChange = (e) => {
    const raw = e.target.value;
    if (!/^\d*$/.test(raw)) return;
    setMonthlyIncomeInput(raw);
    if (raw === "") return;
    setMonthlyIncome(clamp(safeNumber(raw, 0), 10000, 5000000)); // Min 10k, Max 50L
  };

  const handleExistingEmiChange = (e) => {
    const raw = e.target.value;
    if (!/^\d*$/.test(raw)) return;
    setExistingEmiInput(raw);
    if (raw === "") return;
    setExistingEmi(clamp(safeNumber(raw, 0), 0, 2000000)); // Max 20L
  };

  const handleInterestRateChange = (e) => {
    const raw = e.target.value;
    if (!/^\d*\.?\d*$/.test(raw)) return;
    setInterestRateInput(raw);
    if (raw === "" || raw === ".") return;
    setInterestRate(clamp(safeNumber(raw, 0.1), 1, 30)); // Min 1%, Max 30%
  };

  const handleTenureChange = (e) => {
    const raw = e.target.value;
    if (!/^\d*$/.test(raw)) return;
    setTenureInput(raw);
    if (raw === "") return;
    setTenure(clamp(safeNumber(raw, 1), 1, 35)); // Min 1, Max 35 yrs
  };

  const handleLtvRatioChange = (e) => {
    const raw = e.target.value;
    if (!/^\d*$/.test(raw)) return;
    setLtvRatioInput(raw);
    if (raw === "") return;
    setLtvRatio(clamp(safeNumber(raw, 0), 10, 100)); // Min 10%, Max 100%
  };

  const handleFoirChange = (e) => {
    const raw = e.target.value;
    if (!/^\d*$/.test(raw)) return;
    setFoirInput(raw);
    if (raw === "") return;
    setFoir(clamp(safeNumber(raw, 0), 10, 90)); // Min 10%, Max 90%
  };

  // Blurs to clean up and force values back inside limits
  const handlePropertyValueBlur = () => {
    const val = clamp(safeNumber(propertyValueInput, propertyValue), 100000, 100000000);
    setPropertyValue(val);
    setPropertyValueInput(String(val));
  };

  const handleMonthlyIncomeBlur = () => {
    const val = clamp(safeNumber(monthlyIncomeInput, monthlyIncome), 10000, 5000000);
    setMonthlyIncome(val);
    setMonthlyIncomeInput(String(val));
  };

  const handleExistingEmiBlur = () => {
    const val = clamp(safeNumber(existingEmiInput, existingEmi), 0, 2000000);
    setExistingEmi(val);
    setExistingEmiInput(String(val));
  };

  const handleInterestRateBlur = () => {
    const val = clamp(safeNumber(interestRateInput, interestRate), 1, 30);
    setInterestRate(val);
    setInterestRateInput(String(val));
  };

  const handleTenureBlur = () => {
    const val = clamp(safeNumber(tenureInput, tenure), 1, 35);
    setTenure(val);
    setTenureInput(String(val));
  };

  const handleLtvRatioBlur = () => {
    const val = clamp(safeNumber(ltvRatioInput, ltvRatio), 10, 100);
    setLtvRatio(val);
    setLtvRatioInput(String(val));
  };

  const handleFoirBlur = () => {
    const val = clamp(safeNumber(foirInput, foir), 10, 90);
    setFoir(val);
    setFoirInput(String(val));
  };

  // Calculations
  const monthlyFoirCap = monthlyIncome * (foir / 100);
  const availableEmiBudget = Math.max(0, monthlyFoirCap - existingEmi);

  // 1. Income Based Limit
  const maxLoanIncome = calculatePrincipalFromEMI(availableEmiBudget, interestRate, tenure);

  // 2. Property LTV Based Limit
  const maxLoanLTV = propertyValue * (ltvRatio / 100);

  // 3. Final Eligibility
  const finalEligibility = Math.min(maxLoanIncome, maxLoanLTV);
  const formattedEligibility = finalEligibility > 0 ? finalEligibility : 0;

  // Final EMI
  const finalEmi = calculateEMI(formattedEligibility, interestRate, tenure);

  // Down Payment Required
  const downPayment = Math.max(0, propertyValue - formattedEligibility);

  // Percentage Calculations for bars
  const loanPercentOfProperty = propertyValue > 0 ? (formattedEligibility / propertyValue) * 100 : 0;
  const dpPercentOfProperty = propertyValue > 0 ? (downPayment / propertyValue) * 100 : 0;

  const totalMaxLimit = Math.max(maxLoanIncome, maxLoanLTV, 1);
  const incomeBarWidth = (maxLoanIncome / totalMaxLimit) * 100;
  const ltvBarWidth = (maxLoanLTV / totalMaxLimit) * 100;

  const isIncomeLimiting = maxLoanIncome < maxLoanLTV;
  const foirStatusPercent = monthlyIncome > 0 ? ((existingEmi + finalEmi) / monthlyIncome) * 100 : 0;

  return (
    <>
      <PageBanner title="Eligibility & LTV Calculator" activeLabel="Eligibility Calculator" />

      <section className="ltv-calc-wrapper">
        <div className="container">
          <div className="row g-4">

            {/* INPUTS COLUMN */}
            <div className="col-lg-7">
              <AnimateOnScroll animation="animate__fadeInLeft">
                <div className="ltv-calc-card">
                  <h3 className="ltv-calc-title">
                    <i className="bi bi-sliders text-success"></i> Financial Details
                  </h3>

                  {/* Property Value */}
                  <div className="ltv-calc-group">
                    <div className="ltv-calc-label-row">
                      <span className="ltv-calc-label">Property Valuation</span>
                      <span className="text-success fw-bold">{formatINR(propertyValue)}</span>
                    </div>
                    <div className="ltv-calc-input-container">
                      <span className="ltv-calc-input-prefix">₹</span>
                      <input
                        type="text"
                        className="ltv-calc-input"
                        value={propertyValueInput}
                        onChange={handlePropertyValueChange}
                        onBlur={handlePropertyValueBlur}
                      />
                    </div>
                    <input
                      type="range"
                      className="ltv-calc-slider"
                      min={100000}
                      max={100000000}
                      step={50000}
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                    />
                  </div>

                  {/* Gross Monthly Income */}
                  <div className="ltv-calc-group">
                    <div className="ltv-calc-label-row">
                      <span className="ltv-calc-label">Gross Monthly Income</span>
                      <span className="text-success fw-bold">{formatINR(monthlyIncome)}</span>
                    </div>
                    <div className="ltv-calc-input-container">
                      <span className="ltv-calc-input-prefix">₹</span>
                      <input
                        type="text"
                        className="ltv-calc-input"
                        value={monthlyIncomeInput}
                        onChange={handleMonthlyIncomeChange}
                        onBlur={handleMonthlyIncomeBlur}
                      />
                    </div>
                    <input
                      type="range"
                      className="ltv-calc-slider"
                      min={10000}
                      max={1000000}
                      step={1000}
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    />
                  </div>

                  {/* Existing Monthly EMIs */}
                  <div className="ltv-calc-group">
                    <div className="ltv-calc-label-row">
                      <span className="ltv-calc-label">Existing Monthly EMIs / Obligations</span>
                      <span className="text-danger fw-bold">{formatINR(existingEmi)}</span>
                    </div>
                    <div className="ltv-calc-input-container">
                      <span className="ltv-calc-input-prefix">₹</span>
                      <input
                        type="text"
                        className="ltv-calc-input"
                        value={existingEmiInput}
                        onChange={handleExistingEmiChange}
                        onBlur={handleExistingEmiBlur}
                      />
                    </div>
                    <input
                      type="range"
                      className="ltv-calc-slider"
                      min={0}
                      max={300000}
                      step={500}
                      value={existingEmi}
                      onChange={(e) => setExistingEmi(Number(e.target.value))}
                    />
                    <div className="ltv-calc-info-tooltip">
                      Includes personal loans, credit card EMIs, car loans, etc.
                    </div>
                  </div>

                  {/* Interest Rate & Tenure Row */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="ltv-calc-group">
                        <div className="ltv-calc-label-row">
                          <span className="ltv-calc-label">Interest Rate</span>
                          <span className="text-success fw-bold">{interestRate}% p.a.</span>
                        </div>
                        <div className="ltv-calc-input-container">
                          <input
                            type="text"
                            className="ltv-calc-input ltv-calc-input-no-prefix"
                            value={interestRateInput}
                            onChange={handleInterestRateChange}
                            onBlur={handleInterestRateBlur}
                          />
                        </div>
                        <input
                          type="range"
                          className="ltv-calc-slider"
                          min={5}
                          max={20}
                          step={0.1}
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="ltv-calc-group">
                        <div className="ltv-calc-label-row">
                          <span className="ltv-calc-label">Loan Term</span>
                          <span className="text-success fw-bold">{tenure} Years</span>
                        </div>
                        <div className="ltv-calc-input-container">
                          <input
                            type="text"
                            className="ltv-calc-input ltv-calc-input-no-prefix"
                            value={tenureInput}
                            onChange={handleTenureChange}
                            onBlur={handleTenureBlur}
                          />
                        </div>
                        <input
                          type="range"
                          className="ltv-calc-slider"
                          min={1}
                          max={30}
                          step={1}
                          value={tenure}
                          onChange={(e) => setTenure(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Advanced settings row (LTV Ratio and FOIR) */}
                  <div className="row mt-3 border-top pt-4">
                    <div className="col-12 mb-3">
                      <span className="fw-bold text-muted small uppercase">Bank Parameters & Criteria</span>
                    </div>
                    <div className="col-md-6">
                      <div className="ltv-calc-group">
                        <div className="ltv-calc-label-row">
                          <span className="ltv-calc-label">Max LTV Ratio</span>
                          <span className="fw-bold text-primary">{ltvRatio}%</span>
                        </div>
                        <input
                          type="text"
                          className="ltv-calc-input ltv-calc-input-no-prefix"
                          value={ltvRatioInput}
                          onChange={handleLtvRatioChange}
                          onBlur={handleLtvRatioBlur}
                        />
                        <input
                          type="range"
                          className="ltv-calc-slider"
                          min={50}
                          max={95}
                          step={5}
                          value={ltvRatio}
                          onChange={(e) => setLtvRatio(Number(e.target.value))}
                        />
                        <div className="ltv-calc-info-tooltip">
                          Max property value funded by bank.
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="ltv-calc-group">
                        <div className="ltv-calc-label-row">
                          <span className="ltv-calc-label">FOIR Limit</span>
                          <span className="fw-bold text-primary">{foir}%</span>
                        </div>
                        <input
                          type="text"
                          className="ltv-calc-input ltv-calc-input-no-prefix"
                          value={foirInput}
                          onChange={handleFoirChange}
                          onBlur={handleFoirBlur}
                        />
                        <input
                          type="range"
                          className="ltv-calc-slider"
                          min={30}
                          max={80}
                          step={5}
                          value={foir}
                          onChange={(e) => setFoir(Number(e.target.value))}
                        />
                        <div className="ltv-calc-info-tooltip">
                          Max % of income allowed for monthly EMI obligations.
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </AnimateOnScroll>
            </div>

            {/* RESULTS COLUMN */}
            <div className="col-lg-5">
              <AnimateOnScroll animation="animate__fadeInRight">
                <div className="ltv-calc-card">
                  <h3 className="ltv-calc-title">
                    <i className="bi bi-wallet2 text-success"></i> Loan Eligibility
                  </h3>

                  {/* Main Result Card */}
                  <div className="ltv-calc-result-header">
                    <div className="ltv-calc-result-title">Eligible Loan Amount</div>
                    <div className="ltv-calc-result-amount">{formatINR(formattedEligibility)}</div>
                  </div>

                  {/* Result Grid */}
                  <div className="ltv-calc-grid-results">
                    <div className="ltv-calc-mini-card">
                      <div className="ltv-calc-mini-label">Monthly EMI</div>
                      <div className="ltv-calc-mini-value theme-color">{formatINR(finalEmi)}</div>
                    </div>
                    <div className="ltv-calc-mini-card">
                      <div className="ltv-calc-mini-label">Down Payment Required</div>
                      <div className="ltv-calc-mini-value">{formatINR(downPayment)}</div>
                    </div>
                  </div>

                  {/* Property Cost Visualizer */}
                  <div className="ltv-calc-visualizer">
                    <div className="ltv-calc-vis-title">
                      <span>Valuation Breakdown</span>
                      <span>{formatINR(propertyValue)}</span>
                    </div>
                    <div className="ltv-calc-bar-container">
                      <div
                        className="ltv-calc-bar-fill loan"
                        style={{ width: `${loanPercentOfProperty}%` }}
                        title={`Loan: ${loanPercentOfProperty.toFixed(1)}%`}
                      ></div>
                      <div
                        className="ltv-calc-bar-fill dp"
                        style={{ width: `${dpPercentOfProperty}%` }}
                        title={`Down Payment: ${dpPercentOfProperty.toFixed(1)}%`}
                      ></div>
                    </div>
                    <div className="ltv-calc-legend">
                      <div className="ltv-calc-legend-item">
                        <div className="ltv-calc-dot loan"></div>
                        <span>Loan ({loanPercentOfProperty.toFixed(0)}%)</span>
                      </div>
                      <div className="ltv-calc-legend-item">
                        <div className="ltv-calc-dot dp"></div>
                        <span>Down Payment ({dpPercentOfProperty.toFixed(0)}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Split Comparison of Limits */}
                  <div className="ltv-calc-comparison-box">
                    <h5 className="h6 fw-bold mb-1">Limit Factors</h5>

                    {/* Income limit row */}
                    <div className="ltv-calc-comparison-row">
                      <div className="ltv-calc-comp-label-row">
                        <span>Income-based Limit</span>
                        <span>
                          {formatINR(maxLoanIncome)}
                          {isIncomeLimiting && (
                            <span className="ltv-calc-limiting-tag">Limiting Factor</span>
                          )}
                        </span>
                      </div>
                      <div className="ltv-calc-comp-bar">
                        <div
                          className={`ltv-calc-comp-fill ${isIncomeLimiting ? "limiting" : "active"}`}
                          style={{ width: `${incomeBarWidth}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* LTV Limit row */}
                    <div className="ltv-calc-comparison-row">
                      <div className="ltv-calc-comp-label-row">
                        <span>LTV-based Property Limit</span>
                        <span>
                          {formatINR(maxLoanLTV)}
                          {!isIncomeLimiting && (
                            <span className="ltv-calc-limiting-tag">Limiting Factor</span>
                          )}
                        </span>
                      </div>
                      <div className="ltv-calc-comp-bar">
                        <div
                          className={`ltv-calc-comp-fill ${!isIncomeLimiting ? "limiting" : "active"}`}
                          style={{ width: `${ltvBarWidth}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* dynamic tips based on result bottleneck */}
                  {formattedEligibility <= 0 ? (
                    <div className="ltv-calc-tips-box warning-tips">
                      <h5><i className="bi bi-exclamation-triangle-fill"></i> Eligibility Alert</h5>
                      <p className="mb-0">
                        Based on your inputs, your current monthly obligations exceed your available FOIR budget.
                        To build eligibility:
                      </p>
                      <ul className="ltv-calc-tips-list mt-2">
                        <li>Reduce existing monthly EMIs.</li>
                        <li>Add a co-applicant to pool additional monthly income.</li>
                        <li>Consider extending the tenure to reduce the installment cost.</li>
                      </ul>
                    </div>
                  ) : isIncomeLimiting ? (
                    <div className="ltv-calc-tips-box warning-tips">
                      <h5><i className="bi bi-info-circle-fill"></i> Boost Your Eligibility</h5>
                      <p className="mb-2">
                        Your loan eligibility is restricted by your **Monthly Income and Obligations**. You can increase it by:
                      </p>
                      <ul className="ltv-calc-tips-list">
                        <li>Extending your Loan Tenure (current: {tenure} years).</li>
                        <li>Prepaying/closing existing loans to reduce your current EMI footprint.</li>
                        <li>Adding a co-applicant (spouse/parents) with an active income channel.</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="ltv-calc-tips-box">
                      <h5><i className="bi bi-check-circle-fill"></i> Strong Financial Profile</h5>
                      <p className="mb-0">
                        Your income easily supports this loan! Your eligibility is capped only by the **Property Value & LTV limit** ({ltvRatio}%).
                        To borrow more:
                      </p>
                      <ul className="ltv-calc-tips-list mt-2">
                        <li>Consider purchasing a higher-value property.</li>
                        <li>Opt for banks offering a higher LTV ratio (up to 90%).</li>
                      </ul>
                    </div>
                  )}

                  {/* CTA button */}
                  <div className="mt-4">
                    <a href="/contact" className="btn_theme btn_theme_active w-100 justify-content-center">
                      Apply for Pre-Approval
                      <i className="bi bi-arrow-up-right"></i>
                      <span style={{ top: "53.7969px", left: "42.5px" }}></span>
                    </a>
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

export default EligibilityLTVCalculator;
