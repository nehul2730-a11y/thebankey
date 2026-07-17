import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Map routes to descriptive, SEO-friendly page titles
const titleMap = {
  "/": "TheBankey - Compare & Apply for Loans Online",
  "/about": "About Us | TheBankey",
  "/contact": "Contact Us | TheBankey",
  "/join-employee": "Join as Employee | Careers | TheBankey",
  "/join-channel-partner": "Join as Channel Partner | Partner Program | TheBankey",
  "/loan-comparison": "Loan Comparison | Compare Home & Personal Loans | TheBankey",
  "/eligibility-calculator": "Eligibility & LTV Calculator | Calculate Loan Eligibility | TheBankey",
  "/bank-documents": "Required Documents for Loan | Checklist | TheBankey",
  "/roi": "Latest Loan Interest Rates (ROI) | TheBankey",
  "/cibil": "Check CIBIL Score Online | Free Credit Score | TheBankey",
};

const TitleUpdater = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Normalize path by removing trailing slash if not root
    const cleanPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
    
    // Fallback to "TheBankey" if path is not matched
    const title = titleMap[cleanPath] || "TheBankey";
    
    document.title = title;
  }, [pathname]);

  return null;
};

export default TitleUpdater;
