import React, { useEffect, useRef, useState } from "react";
import { Collapse } from "bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

const navLinkClass = ({ isActive }) =>
  `nav-link${isActive ? " active" : ""}`;

const Header = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const headerRef = useRef(null);
  const collapseRef = useRef(null);
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 0) {
          headerRef.current.classList.add("sticky");
        } else {
          headerRef.current.classList.remove("sticky");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    const el = collapseRef.current;
    if (!el?.classList.contains("show")) return;
    if (window.matchMedia("(min-width: 1200px)").matches) return;
    const instance = Collapse.getInstance(el);
    instance?.hide();
  }, [pathname]);

  useEffect(() => {
    const el = collapseRef.current;
    if (!el) return;
    const isMobileNav = () => window.matchMedia("(max-width: 1199.98px)").matches;
    const lockScroll = () => {
      if (isMobileNav()) document.body.style.overflow = "hidden";
    };
    const unlockScroll = () => {
      document.body.style.overflow = "";
    };
    const onShown = () => {
      setNavOpen(true);
      lockScroll();
    };
    const onHidden = () => {
      setNavOpen(false);
      setDropdownOpen(false);
      unlockScroll();
    };
    el.addEventListener("shown.bs.collapse", onShown);
    el.addEventListener("hidden.bs.collapse", onHidden);
    return () => {
      el.removeEventListener("shown.bs.collapse", onShown);
      el.removeEventListener("hidden.bs.collapse", onHidden);
      unlockScroll();
    };
  }, []);

  const handleNavToggle = () => {
    if (window.matchMedia("(min-width: 1200px)").matches) return;
    const el = collapseRef.current;
    if (!el) return;
    Collapse.getOrCreateInstance(el).toggle();
  };

  const handleDropdownToggle = (e) => {
    e.preventDefault();
    if (window.matchMedia("(max-width: 1199.98px)").matches) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  return (
    <header
      className={`header-section${isHome ? " index" : " header-inner"}`}
      ref={headerRef}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav
              className="navbar navbar-expand-xl nav-shadow navbar-mobile-toggle"
              id="navbar"
            >

              {/* Logo */}
              <Link className="navbar-brand" to="/">
                <img
                  src={Logo}
                  alt="logo"
                />
              </Link>

              {/* Toggle Button */}
              <button
                type="button"
                className="navbar-toggler"
                aria-controls="navbar-content"
                aria-expanded={navOpen}
                aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={handleNavToggle}
              >
                <i className={navOpen ? "bi bi-x-lg" : "bi bi-list"} />
              </button>

              {/* Menu */}
              <div
                ref={collapseRef}
                className="collapse navbar-collapse ms-auto"
                id="navbar-content"
              >
                <div className="main-menu index-page">
                  <ul className="navbar-nav mb-lg-0 mx-auto">

                    <li className="nav-item">
                      <NavLink className={navLinkClass} end to="/">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={navLinkClass} end to="/roi">
                        ROI
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={navLinkClass} end to="/bank-documents">
                        Bank Documents
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className={navLinkClass} end to="/cibil">
                        CIBIL Score
                      </NavLink>
                    </li>

                    {/* Dropdown */}
                    <li className={`nav-item dropdown${dropdownOpen ? " show" : ""}`}>
                      <a
                        className={`nav-link dropdown-toggle${dropdownOpen ? " show" : ""}`}
                        href="#"
                        role="button"
                        aria-expanded={dropdownOpen}
                        onClick={handleDropdownToggle}
                      >
                        Join Us
                      </a>
                      <ul className={`dropdown-menu${dropdownOpen ? " show" : ""}`}>
                        <li>
                          <NavLink className="dropdown-item" to="/join-employee">
                            Join as a Employee
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="dropdown-item" to="/join-channel-partner">
                            Join as a Channel Partner
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <NavLink className={navLinkClass} to="/about">
                        About us
                      </NavLink>
                    </li>



                    <li className="nav-item">
                      <NavLink className={navLinkClass} to="/contact">
                        Contact us
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="https://g.page/r/CbKgcxUhWz9WEAI/review"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Feedback
                      </a>
                    </li>
                  </ul>

                </div>
              </div>

            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;