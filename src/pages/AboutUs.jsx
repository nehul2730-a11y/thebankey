import PageBanner from "../component/shared/PageBanner";
import AnimateOnScroll from "../component/shared/AnimateOnScroll";
import AboutIntro from "../component/about/AboutIntro";
import AboutCompanyDetails from "../component/about/AboutCompanyDetails";
import Feature from "../component/Features";
import WorkingProcess from "../component/WorkingProcess";
import OurTeam from "../component/OurTeam";
import AboutCta from "../component/about/AboutCta";

const aboutPillars = [
  {
    title: "Home loan focus",
    desc: "We are exclusively focused on home loans for private sector, government, and self-employed customers who expect professional service.",
  },
  {
    title: "Advantage for All",
    desc: "Our motto is customer delight—so clients stay with us and refer others based on the service they receive.",
  },
  {
    title: "Client & bank relationships",
    desc: "Structured processes and transparent communication between borrowers and partner banks, end to end.",
  },
];

const AboutUs = () => {
  return (
    <>
      <PageBanner title="About Us" activeLabel="About us" />

      <AnimateOnScroll animation="animate__fadeInUp">
        <AboutIntro />
      </AnimateOnScroll>


      <AnimateOnScroll animation="animate__fadeInUp">
        <WorkingProcess />
      </AnimateOnScroll>

      <AnimateOnScroll animation="animate__fadeInUp">
        <OurTeam
          sectionSubtitle="Leadership"
          sectionTitle="Meet the people guiding TheBankey"
          sectionIntro="Seasoned professionals across sales, credit, and operations—aligned on one goal: helping you finance your home with confidence."
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="animate__fadeInUp">
        <AboutCta />
      </AnimateOnScroll>
    </>
  );
};

export default AboutUs;
