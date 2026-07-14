const corporates = [
  "Nestle – Gurgaon",
  "Cairn India – Gurgaon",
  "Federal Mudgal – Gurgaon",
];

const AboutCompanyDetails = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center section">
          <div className="col-12 col-lg-10 col-xxl-9">
            <div className="section__header text-center mb-5">
              <span className="section__header-sub-title headingFour">
                Products &amp; services
              </span>
              <h2 className="section__header-title">
                Home loans, tailored to salaried and self-employed borrowers
              </h2>
            </div>

            <div className="section__content">
              <p className="section__content-text">
                Finwin Digital Solutions (OPC) Pvt. Ltd. is exclusively involved
                in providing Home Loans to their extremely respectful &amp;
                esteemed customers.
              </p>
              <p className="section__content-text">
                We as team cater our clients employed in Private, Government
                Sector &amp; Self-Employed customers, seeking professional
                services for Home Loan.
              </p>
            </div>
          </div>
        </div>

        <div className="row justify-content-center section pt-0">
          <div className="col-12 col-lg-10 col-xxl-9">
            <div className="card card--custom about-corporates-card">
              <div className="card__content">
                <span className="section__content-sub-title headingFour d-block mb-3">
                  Corporates
                </span>
                <p className="section__content-text mb-4">
                  We are proud to support professionals from leading
                  organisations, including:
                </p>
                <ul className="about-corporates-list">
                  {corporates.map((name) => (
                    <li key={name}>
                      <i className="bi bi-building-fill" aria-hidden />
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center section pt-0">
          <div className="col-12 col-lg-10 col-xxl-9">
            <div className="about-aim-block">
              <span className="section__header-sub-title headingFour">
                Long-term aim / objective
              </span>
              <p className="about-motto">Advantage for All</p>
              <p className="section__content-text mb-0">
                We work with the Motto of &quot;Advantage for All&quot;, our core
                Aim is to achieve Customer Delight which in turn would help us
                to retain that customer on our base &amp; shall provide
                references on the basis of services rendered to him/her.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompanyDetails;
