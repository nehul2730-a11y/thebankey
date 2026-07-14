import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { testimonialData } from "../constants/testimonials";

import { Pagination, Autoplay } from "swiper/modules";
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
                            <p className="section__header-content wow fadeInDown" data-wow-duration="0.8s" style={{ visibility: 'visible', animationDuration: '0.8s', animationName: 'fadeInDown' }}>Feel free to
                                customize the text with actual client testimonials, ensuring you have their permission to
                                use their names and occupations</p>
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
                                        <div className="card card--custom ">
                                            <div className="testimonials__author-review">
                                                <div className="star_review mb-3">
                                                    <i className="bi bi-star-fill star-active"></i>
                                                    <i className="bi bi-star-fill star-active"></i>
                                                    <i className="bi bi-star-fill star-active"></i>
                                                    <i className="bi bi-star-fill star-active"></i>
                                                    <i className="bi bi-star-half star-active"></i>
                                                </div>
                                                <p className="text-start">{testimonial.review}</p>
                                            </div>
                                            <div className="testimonials__author">

                                                <div className="author__content">
                                                    <h5 className="author__title">{testimonial.name}</h5>
                                                    <p className="author__desi">{testimonial.designation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    <div className="col-12">

                        <div className="slider-navigation wow fadeInRight" data-wow-duration="1.2s" style={{ visibility: 'visible', animationDuration: '1.2s', animationName: 'fadeInRight' }}>
                            <button className="prev-testimonials pagination-button">
                                <i className="bi bi-chevron-left"></i>
                            </button>

                            <button className="next-testimonials pagination-button">
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
}
export default ClientTestimonial;