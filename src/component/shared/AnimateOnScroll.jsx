import { useEffect, useRef, useState } from "react";

const AnimateOnScroll = ({
  children,
  animation = "animate__fadeInUp",
  threshold = 0.12,
  rootMargin = "0px 0px -32px 0px",
  immediate = false,
}) => {
  const ref = useRef(null);
  const [active, setActive] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate, threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={
        active ? `home-animate-on-scroll animate__animated ${animation}` : "home-animate-prep"
      }
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
