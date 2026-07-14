import { Link } from "react-router-dom";

const PageBanner = ({ title, activeLabel }) => {
  return (
    <section className="banner">
      <div className="container">
        <div className="banner__content wow fadeInDown">
          <h1 className="banner__content-title display-3 text-white">{title}</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {activeLabel}
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
