import Landing from "../component/Landing";
import Feature from "../component/Features";
import HomeLoanCalculator from "../component/HomeLoanCalculator";
import ChooseUs from "../component/WhyChooseUs";
import WorkingProcess from "../component/WorkingProcess";
import ClientTestimonial from "../component/ClientTestimonial";
import OurTeam from "../component/OurTeam";
import Faq from "../component/Faq";
import AnimateOnScroll from "../component/shared/AnimateOnScroll";

const Home = () => {
  return (
    <>
      <AnimateOnScroll immediate animation="animate__fadeIn">
        <Landing />
      </AnimateOnScroll>
      <AnimateOnScroll animation="animate__fadeInUp">
        <Feature />
      </AnimateOnScroll>
      <AnimateOnScroll animation="animate__fadeInUp">
        <HomeLoanCalculator />
      </AnimateOnScroll>
      <AnimateOnScroll animation="animate__fadeInUp">
        <ChooseUs />
      </AnimateOnScroll>
      <AnimateOnScroll animation="animate__fadeInUp">
        <WorkingProcess />
      </AnimateOnScroll>
      <AnimateOnScroll animation="animate__fadeInUp">
        <ClientTestimonial />
      </AnimateOnScroll>
      <AnimateOnScroll animation="animate__fadeInUp">
        <OurTeam />
      </AnimateOnScroll>
      <AnimateOnScroll animation="animate__fadeInUp">
        <Faq />
      </AnimateOnScroll>
    </>
  );
};

export default Home;
