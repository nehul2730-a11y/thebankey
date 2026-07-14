import { useState } from "react";
import "./HomeLoanCalculator.css";
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

const HomeLoanCalculator = () => {
  const formatINR = (value) => inrFormatter.format(Math.max(0, Number(value) || 0));
  const [loanAmount, setLoanAmount] = useState(500000);
  const [deposit, setDeposit] = useState(10);
  const [loanType, setLoanType] = useState(10);
  const [interest, setInterest] = useState(8); // Default effective interest
  const [depositInput, setDepositInput] = useState("10");
  const [interestInput, setInterestInput] = useState("8");

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const safeNumber = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const handleLoanAmountChange = (e) => {
    const parsedAmount = safeNumber(e.target.value, loanAmount);
    const validatedAmount = clamp(parsedAmount, 100000, 50000000);
    setLoanAmount(validatedAmount);
  };

  const handleDepositChange = (e) => {
    const rawValue = e.target.value;
    if (!/^\d*$/.test(rawValue)) return;
    setDepositInput(rawValue);
    if (rawValue === "") return;
    const parsedDeposit = safeNumber(rawValue, 0);
    setDeposit(clamp(parsedDeposit, 0, 99));
  };

  const handleInterestChange = (e) => {
    const rawValue = e.target.value;
    if (!/^\d*\.?\d*$/.test(rawValue)) return;
    setInterestInput(rawValue);
    if (rawValue === "" || rawValue === ".") return;
    const parsedInterest = safeNumber(rawValue, 5);
    setInterest(clamp(parsedInterest, 0, 40));
  };

  const handleDepositBlur = () => {
    const normalized = clamp(safeNumber(depositInput, deposit), 0, 99);
    setDeposit(normalized);
    setDepositInput(String(normalized));
  };

  const handleInterestBlur = () => {
    const normalized = clamp(safeNumber(interestInput, interest), 0, 40);
    setInterest(normalized);
    setInterestInput(String(normalized));
  };

  // Calculate principal after deposit
  const downPayment = loanAmount * (deposit / 100);
  const principal = loanAmount * (1 - deposit / 100);
  const emi = calculateEMI(principal, interest, loanType);
  const totalMonths = loanType * 12;
  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(totalPayment - principal, 0);
  const monthlyRate = interest / 12;

  return (
    <div id="calculator" className="hlc-wrapper calculator section">
      <div className="container pb-5">
        <div className="row">
          <div className="col-12 col-lg-12 text-center pb-5 pt-5 section__header">
            <span className="section__header-sub-title headingFour wow fadeInDown">Home Loan
              Calculators</span>
            <h2 className="section__content-title wow fadeInUp" data-wow-duration="0.8s">Empower Yourself with
              Accurate Loan Estimates</h2>
          </div>
        </div>
        <div className="hlc-layout">
          <div className="hlc-filters">
            <div className="hlc-filter-group">
              <label>Loan amount (INR)</label>
              <span className="hlc-slider-value">{formatINR(loanAmount)}</span>
              <input
                type="range"
                inputMode="numeric"
                min={100000}
                max={50000000}
                step={50000}
                value={loanAmount}
                onChange={handleLoanAmountChange}
              />
            </div>
            <div className="hlc-filter-group">
              <label>Minimum deposit (%)</label>
              <input
                type="text"
                inputMode="numeric"
                value={depositInput}
                min={0}
                max={99}
                step={1}
                onChange={handleDepositChange}
                onBlur={handleDepositBlur}
              />
            </div>
            <div className="hlc-filter-group">
              <label>Loan term (years)</label>
              <span className="hlc-slider-value">{loanType} years</span>
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={loanType}
                onChange={(e) => setLoanType(Number(e.target.value))}
              />
            </div>
            <div className="hlc-filter-group">
              <label>Interest Rate (%)</label>
              <input
                type="text"
                inputMode="decimal"
                value={interestInput}
                min={5}
                max={40}
                step={0.01}
                onChange={handleInterestChange}
                onBlur={handleInterestBlur}
              />
            </div>
          </div>

          <div className="hlc-results">
            <div className="hlc-result-card">
              <div className="hlc-result-main">
                <div className="hlc-result-row">
                  <span className="hlc-result-label">Estimated EMI</span>
                </div>
                <span className="hlc-result-value hlc-result-big">{formatINR(emi)}</span>
                <div className="hlc-result-example">
                  <p>Principal after deposit: {formatINR(principal)}</p>
                  <p>Tenure: {loanType} years</p>
                  <p>Interest Rate: {interest}%</p>
                </div>
                <div className="hlc-result-breakdown">
                  <div className="hlc-breakdown-item">
                    <span className="hlc-breakdown-label">Property Cost</span>
                    <span className="hlc-breakdown-value">{formatINR(loanAmount)}</span>
                  </div>
                  <div className="hlc-breakdown-item">
                    <span className="hlc-breakdown-label">Down Payment</span>
                    <span className="hlc-breakdown-value">{formatINR(downPayment)}</span>
                  </div>
                  <div className="hlc-breakdown-item">
                    <span className="hlc-breakdown-label">Loan Amount</span>
                    <span className="hlc-breakdown-value">{formatINR(principal)}</span>
                  </div>
                  <div className="hlc-breakdown-item">
                    <span className="hlc-breakdown-label">Total Interest</span>
                    <span className="hlc-breakdown-value">{formatINR(totalInterest)}</span>
                  </div>
                  <div className="hlc-breakdown-item">
                    <span className="hlc-breakdown-label">Total Payment</span>
                    <span className="hlc-breakdown-value">{formatINR(totalPayment)}</span>
                  </div>
                  <div className="hlc-breakdown-item">
                    <span className="hlc-breakdown-label">Monthly Interest Rate</span>
                    <span className="hlc-breakdown-value">{monthlyRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanCalculator;
