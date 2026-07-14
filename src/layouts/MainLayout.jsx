import { Outlet } from "react-router-dom";
import Header from "../component/shared/header";
import Footer from "../component/shared/Footer";
import ScrollToTop from "../component/shared/ScrollToTop";

const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
