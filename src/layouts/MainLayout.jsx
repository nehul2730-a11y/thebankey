import { Outlet } from "react-router-dom";
import Header from "../component/shared/header";
import Footer from "../component/shared/Footer";
import ScrollToTop from "../component/shared/ScrollToTop";
import TitleUpdater from "../component/shared/TitleUpdater";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <TitleUpdater />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

