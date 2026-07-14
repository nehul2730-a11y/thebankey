import React from "react";
import heroArrow from "../assets/images/hero_vector_arrow.png";
import chooseVector from "../assets/images/choose_vector.png";
import chooseUs from "../assets/images/choose_us.png";
import titleVector from "../assets/images/title_vector.png";
import loanReviewsLogo3 from "../assets/images/loan_reviews_logo3.png";
import loanReviewsLogo4 from "../assets/images/loan_reviews_logo4.png";
const ChooseUs = () => {
    return (
        <section className="choose-us">

            {/* Animation */}
            <div className="animation">
                <img src={heroArrow} alt="img" />
                <img src={chooseVector} alt="img" />
            </div>

            <div className="container">
                <div className="row align-items-center justify-content-between section">

                    {/* Image */}
                    <div className="col-12 col-md-8 col-lg-5 mx-auto mx-lg-0 order-1 order-lg-0">
                        <div className="choose-us__thumb me-xl-4 me-xxl-0 wow fadeInUp">
                            <img src={chooseUs} alt="choose us" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-12 col-lg-7 col-xxl-6">
                        <div className="section__content ms-lg-4 ms-xl-0">

                            <span className="section__content-sub-title headingFour wow fadeInDown">
                                About Us
                            </span>

                            <h2 className="section__content-title wow fadeInUp">
                                TheBankey is the Brand Name of Finwin Digital Solutions (OPC) Pvt. Ltd. As the brand name suggest we are providing key to Banking Solutions.
                            </h2>

                            <p className="section__content-text wow fadeInUp">
                                The management of “Finwin Digital Solutions (OPC) Pvt. Ltd” comprises of highly efficient & self-motivated Team  who works in Delhi/NCR .
                            </p>
                            <p className="section__content-text wow fadeInUp">
                                Finwin Digital Solutions (OPC) Pvt. Ltd was founded on June 2024 by Rahul Arora who has a clear vision to run home loan business in a structured manner and to establish a healthy relationship between client and bank.
                            </p>
                            <div className="section__content-inner wow fadeInUp">
                                <ul>
                                    <li><i className="bi bi-check2-circle"></i> Highly Experienced team in the field of Home Loans</li>
                                    <li><i className="bi bi-check2-circle"></i> Human touch, Customer centric & Professional Staff</li>
                                    <li><i className="bi bi-check2-circle"></i> Tie-up’s with all Leading banks providing Home Loans Facility.</li>
                                    <li><i className="bi bi-check2-circle"></i> Timely Service</li>
                                </ul>
                            </div>


                            <a href="/service-details" className="btn_theme btn_theme_active mt_40">
                                Read More <i className="bi bi-arrow-up-right"></i>
                            </a>

                        </div>
                    </div>

                </div>
                <div className="row justify-content-center section bg">
                    <div className="col-12 col-xl-10 col-xxl-9">
                        <div className="loan-reviews loan-reviews--secondary">
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-10 col-xxl-9">
                                    <div className="section__header">
                                        <span className="section__header-sub-title headingFour wow fadeInDown" data-wow-duration="0.8s" >Loan Reviews</span>
                                        <h2 className="section__header-title wow fadeInUp" data-wow-duration="0.8s" >In-depth
                                            Analysis for Informed Borrowing Decisions</h2>
                                        <p className="section__header-content wow fadeInDown" data-wow-duration="0.8s" >Welcome
                                            to our comprehensive loan reviews section, where we provide you with detailed
                                            and unbiased analyses of various loan options.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="d-flex flex-column gap-4">


                                        <div className="loan-reviews_card card wow fadeInUp" data-wow-duration="0.8s">
                                            <div className="loan-reviews__part-one">
                                                <div className="loan-reviews__thumb">
                                                    <img src={loanReviewsLogo3} alt="image" />
                                                </div>
                                                <div className="loan-reviews__review">
                                                    <p className="rating"> 4.9</p>
                                                    <div className="d-flex gap-2 flex-column">
                                                        <div className="star_review">
                                                            <i className="bi bi-star-fill star-active"></i>
                                                            <i className="bi bi-star-fill star-active"></i>
                                                            <i className="bi bi-star-fill star-active"></i>
                                                            <i className="bi bi-star-fill star-active"></i>
                                                            <i className="bi bi-star-half star-active"></i>
                                                        </div>
                                                        <p className="fs-small">Average Review</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="loan-reviews__part-two">
                                                <div className="reviews-heading">
                                                    <h4 className="reviews-heading__title">Business Loans</h4>
                                                    <p className="reviews-heading__content">Indian Largest online mortgage
                                                        lender</p>
                                                </div>
                                                <div className="reviews-inner">
                                                    <ul>
                                                        <li><i className="bi bi-check2-circle"></i> Certified pre-approval
                                                            Process</li>
                                                        <li><i className="bi bi-check2-circle"></i> Online Application Available
                                                            24/7</li>
                                                        <li><i className="bi bi-check2-circle"></i>Find a Quote Easily</li>
                                                        <li><i className="bi bi-check2-circle"></i>100% Online Refinance</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="section__cta wow fadeInUp" data-wow-duration="0.8s">
                                        <a href="/loan-comparison" className="btn_theme btn_theme_active">See All Review Loan<i className="bi bi-arrow-up-right"></i><span style={{ top: "53.7969px", left: "42.5px" }}></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};




export default ChooseUs;