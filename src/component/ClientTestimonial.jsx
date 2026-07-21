import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { testimonialData } from "../constants/testimonials";
import { Pagination, Autoplay } from "swiper/modules";

const TestimonialCard = ({ testimonial }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 201;
    const shouldTruncate = testimonial.review && testimonial.review.length > maxLength;

    const toggleReadMore = () => {
        setIsExpanded((prev) => !prev);
    };

    const displayText = shouldTruncate && !isExpanded
        ? `${testimonial.review.slice(0, maxLength)}...`
        : testimonial.review;

    return (
        <div className="card card--custom">
            <div className="testimonials__author-review">
                <div className="star_review mb-3">
                    <i className="bi bi-star-fill star-active"></i>
                    <i className="bi bi-star-fill star-active"></i>
                    <i className="bi bi-star-fill star-active"></i>
                    <i className="bi bi-star-fill star-active"></i>
                    <i className="bi bi-star-half star-active"></i>
                </div>
                <p className="text-start mb-1">{displayText}</p>
                {shouldTruncate && (
                    <button
                        type="button"
                        onClick={toggleReadMore}
                        className="btn btn-link p-0 text-decoration-none fw-semibold border-0 bg-transparent"
                        style={{ fontSize: "0.9rem", cursor: "pointer", color: "var(--primary-color, #0d6efd)" }}
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </button>
                )}
            </div>
            <div className="testimonials__author">
                <div className="author__content">
                    <h5 className="author__title">{testimonial.name}</h5>
                    <p className="author__desi">{testimonial.designation}</p>
                </div>
            </div>
        </div>
    );
};

const ClientTestimonial = () => {
    return (
        <section className="testimonials section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-6 col-xxl-5">
                        <div className="section__header">
                            <span className="section__header-sub-title headingFour wow fadeInDown" data-wow-duration="0.8s" style={{ visibility: 'visible', animationDuration: '0.8s', animationName: 'fadeInDown' }}>Client Testimonials</span>
                            <h2 className="section__header-title wow fadeInUp" data-wow-duration="0.8s" style={{ visibility: 'visible', animationDuration: '0.8s', animationName: 'fadeInUp' }}>Success Stories Shared
                                by Our Customers</h2>
                            <p className="section__header-content wow fadeInDown" data-wow-duration="0.8s" style={{ visibility: 'visible', animationDuration: '0.8s', animationName: 'fadeInDown' }}>
                                Hear from our happy homeowners who found the perfect loan options and competitive interest rates with our professional loan advisory services.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="testimonials-slider wow fadeInUp" data-wow-duration="0.8s">
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                breakpoints={{
                                    768: { slidesPerView: 2, spaceBetween: 20 },
                                    1200: { slidesPerView: 3, spaceBetween: 20 },
                                }}
                                // autoplay={{ delay: 3000 }}
                                pagination={{ clickable: true }}
                            >
                                {testimonialData.map((testimonial) => (
                                    <SwiperSlide key={testimonial.id}>
                                        <TestimonialCard testimonial={testimonial} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientTestimonial;