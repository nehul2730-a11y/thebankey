import React, { useState } from "react";
import PageBanner from "../component/shared/PageBanner";
import AnimateOnScroll from "../component/shared/AnimateOnScroll";
import "./BankDocuments.css";

const BankDocuments = () => {
  const [activeCategory, setActiveCategory] = useState("salaried");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "salaried", label: "Salaried Individuals", icon: "bi-person-badge" },
    { id: "self-employed", label: "Self-Employed / Business", icon: "bi-briefcase" },
    { id: "nri", label: "NRI Applicants", icon: "bi-globe" },
    { id: "property", label: "Property Documents", icon: "bi-house-gear" },
  ];

  const documentChecklist = {
    salaried: [
      {
        title: "KYC & Identity Proof (All Applicants)",
        icon: "bi-shield-check",
        docs: [
          { name: "PAN Card", desc: "Mandatory for tax registration and credit checks." },
          { name: "Aadhaar Card", desc: "For e-KYC and identity verification." },
          { name: "Passport / Voter ID / Driving License", desc: "As alternative photo ID and signature proof." },
          { name: "Recent Passport Size Photographs", desc: "Usually 3 copies of each applicant/co-applicant." },
          { name: "Current Address Proof", desc: "Utility bills, lease agreement, or credit card statement if different from Aadhaar address." }
        ]
      },
      {
        title: "Income & Financial Statements",
        icon: "bi-cash-coin",
        docs: [
          { name: "Salary Slips", desc: "Pay slips for the last 3 consecutive months." },
          { name: "Form 16 & ITR", desc: "Form 16 and Income Tax Returns for the last 2 assessment years." },
          { name: "Salary Bank Account Statements", desc: "Bank statements showing salary credits for the last 6 months." },
          { name: "Existing Loan Details", desc: "Sanction letters and recent track record statements for active loans, if any." }
        ]
      }
    ],
    "self-employed": [
      {
        title: "KYC & Business Proof",
        icon: "bi-shield-check",
        docs: [
          { name: "PAN Card (Personal & Business)", desc: "Mandatory for tax and corporate identification verification." },
          { name: "Aadhaar Card of Promoters", desc: "Required for individual verification of all co-borrowers." },
          { name: "Business Address Proof", desc: "Utility bills, GST certificate, lease deed, or registry papers for the workplace." },
          { name: "GST Registration Certificate", desc: "Required to verify business activity and turnover compliance." },
          { name: "Partnership Deed / MoA & AoA", desc: "Legal constitution documents of the firm or private limited company." }
        ]
      },
      {
        title: "Income & Tax Verification",
        icon: "bi-graph-up-arrow",
        docs: [
          { name: "Income Tax Returns (ITR)", desc: "ITR submissions for the last 3 financial years with detailed Computation of Income." },
          { name: "Audited Financial Reports", desc: "Balance sheet, Profit & Loss account statement certified by a Chartered Accountant for the last 3 years." },
          { name: "Business Account Bank Statement", desc: "Primary current account statements of the business for the last 12 months." },
          { name: "Personal Bank Statement", desc: "Savings account statements of directors/partners for the last 12 months." }
        ]
      }
    ],
    nri: [
      {
        title: "KYC, Passport & Visa Validation",
        icon: "bi-passport",
        docs: [
          { name: "Valid Indian Passport", desc: "With visa stamp page and address pages." },
          { name: "Work Permit / Resident Permit Card", desc: "Mandatory proof of lawful employment status in the foreign country." },
          { name: "Aadhaar Card / PAN Card", desc: "For domestic validation and tax compliance tracking." },
          { name: "Overseas Address Proof", desc: "Utility bills, driving license, bank statements, or employer letters showing foreign residency." }
        ]
      },
      {
        title: "Overseas Income & Banking",
        icon: "bi-currency-exchange",
        docs: [
          { name: "Employment Contract", desc: "Copy of current employment agreement detailing salary, tenure, and role." },
          { name: "Salary Slips", desc: "Pay slips for the last 3 to 6 months in foreign currency." },
          { name: "Overseas Bank Statements", desc: "Statements showing salary credits for the last 6 months." },
          { name: "NRE & NRO Account Statements", desc: "Domestic Indian bank account records tracking remittance and savings for the last 6 months." },
          { name: "Credit Report", desc: "Credit score records from country of residence (e.g. Equifax, Experian, TransUnion)." }
        ]
      }
    ],
    property: [
      {
        title: "Property Registry & Ownership Papers",
        icon: "bi-file-earmark-ruled",
        docs: [
          { name: "Sale Deed / Mother Deed", desc: "Original title deeds tracing chain of ownership for the last 13 to 30 years." },
          { name: "Allotment Letter / Agreement to Sell", desc: "Duly signed agreement between builder/owner and buyer." },
          { name: "Building Plan Sanction Copy", desc: "Authorized blueprints from Municipal Corporation or Local Panchayat." },
          { name: "Encumbrance Certificate (EC)", desc: "Clear record of nil liabilities or mortgages against the property for the last 13-30 years." },
          { name: "Land Tax Receipt & Possession Certificate", desc: "Up-to-date tax clearances from local revenue/village authorities." },
          { name: "No Objection Certificate (NOC)", desc: "From builder, developmental authority, or cooperative society." }
        ]
      }
    ]
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter documents based on query
  const getFilteredGroups = (category) => {
    const groups = documentChecklist[category] || [];
    if (!searchQuery) return groups;

    const query = searchQuery.toLowerCase();
    return groups
      .map((group) => {
        const filteredDocs = group.docs.filter(
          (doc) =>
            doc.name.toLowerCase().includes(query) ||
            doc.desc.toLowerCase().includes(query)
        );
        return { ...group, docs: filteredDocs };
      })
      .filter((group) => group.docs.length > 0);
  };

  const activeGroups = getFilteredGroups(activeCategory);

  return (
    <>
      <PageBanner title="Required Bank Documents" activeLabel="Bank Documents" />

      <section className="bank-docs-wrapper">
        <div className="container">
          
          {/* Header Description */}
          <div className="row mb-5">
            <div className="col-lg-8 mx-auto text-center">
              <AnimateOnScroll animation="animate__fadeInUp">
                <h2 className="section__content-title mb-3">Home Loan Document Checklists</h2>
                <p className="section__content-text">
                  Preparing your documents in advance speeds up the sanction process. 
                  Select your profile category below to view and print the checklist of documents 
                  required by our banking partners.
                </p>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Search bar */}
          <div className="row mb-2">
            <div className="col-12">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="bank-docs-search-container">
                  <i className="bi bi-search bank-docs-search-icon"></i>
                  <input
                    type="text"
                    className="bank-docs-search-input"
                    placeholder="Search documents (e.g. PAN, Salary, Tax, Deed...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Categories Tab selectors */}
          <div className="row mb-2">
            <div className="col-12">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="bank-docs-tabs">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      className={`bank-docs-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setSearchQuery(""); // Reset search on tab switch
                      }}
                    >
                      <i className={`bi ${cat.icon}`}></i>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Info callout depending on selection */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <AnimateOnScroll animation="animate__fadeInUp">
                {activeCategory === "salaried" && (
                  <div className="bank-docs-info-box">
                    <i className="bi bi-info-circle-fill"></i>
                    <div>
                      <h5>Salaried Profile Note</h5>
                      Applications are processed fastest for salaried individuals. Having a co-applicant (preferably a working spouse) is highly beneficial and often leads to higher loan eligibility and better interest rate rates.
                    </div>
                  </div>
                )}
                {activeCategory === "self-employed" && (
                  <div className="bank-docs-info-box">
                    <i className="bi bi-info-circle-fill"></i>
                    <div>
                      <h5>Self-Employed Profile Note</h5>
                      For self-employed profiles, financial consistency and business age (minimum 3 years in operation) are critical. Ensure your CA-certified Balance Sheets and ITR match details on your tax portal receipts.
                    </div>
                  </div>
                )}
                {activeCategory === "nri" && (
                  <div className="bank-docs-info-box">
                    <i className="bi bi-info-circle-fill"></i>
                    <div>
                      <h5>NRI Profile Note</h5>
                      Most banks require an overseas credit rating report and a local Power of Attorney (PoA) residing in India to represent you during the property registry and stamp duty procedures.
                    </div>
                  </div>
                )}
                {activeCategory === "property" && (
                  <div className="bank-docs-info-box">
                    <i className="bi bi-info-circle-fill"></i>
                    <div>
                      <h5>Property Clearance Note</h5>
                      Ensure the property has clear legal approvals and a clear line of previous title transfers. Banks will run independent legal and technical surveys on the property before issuing the final disbursement.
                    </div>
                  </div>
                )}
              </AnimateOnScroll>
            </div>
          </div>

          {/* Documents Lists Grid */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {activeGroups.length > 0 ? (
                activeGroups.map((group, index) => (
                  <AnimateOnScroll key={index} animation="animate__fadeInUp">
                    <div className="bank-docs-card">
                      <h4 className="bank-docs-card-title">
                        <i className={`bi ${group.icon}`}></i> {group.title}
                      </h4>
                      <ul className="bank-docs-list">
                        {group.docs.map((doc, docIdx) => (
                          <li key={docIdx} className="bank-docs-item">
                            <i className="bi bi-check2-square bank-docs-item-check"></i>
                            <div className="bank-docs-item-content">
                              <span className="bank-docs-item-name">{doc.name}</span>
                              <span className="bank-docs-item-desc">{doc.desc}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimateOnScroll>
                ))
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-clipboard-x display-4 text-muted"></i>
                  <p className="mt-3 text-muted">No documents found matching "{searchQuery}". Try a different keyword.</p>
                </div>
              )}
            </div>
          </div>

          {/* Print checklist call to action */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="bank-docs-action-panel">
                  <div className="bank-docs-action-title">Need a physical copy?</div>
                  <p className="bank-docs-action-text">
                    You can print this document checklist for reference, or save it as a PDF on your device.
                  </p>
                  <div className="bank-docs-action-buttons">
                    <button 
                      onClick={handlePrint} 
                      className="btn_theme btn_theme_active px-4 py-2"
                    >
                      Print Checklist
                      <i className="bi bi-printer-fill"></i>
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

          {/* Need help widget */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <AnimateOnScroll animation="animate__fadeInUp">
                <div className="bank-docs-help-card">
                  <h3>Still Unsure About the Process?</h3>
                  <p>
                    Our experienced advisors can help you verify your documents and handle 
                    the paperwork directly with our partner banks for free.
                  </p>
                  <a href="/contact" className="btn_theme px-4 py-2 text-white border-white">
                    Speak to our Expert
                    <i className="bi bi-arrow-up-right"></i>
                  </a>
                </div>
              </AnimateOnScroll>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default BankDocuments;
