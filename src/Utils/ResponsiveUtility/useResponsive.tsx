import { useEffect, useState } from "react";
import { BREAKPOINTS } from "./breakpoints";

export function useResponsive() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,

    isMobile: width < BREAKPOINTS.mobile,
    isTablet:
      width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
    isDesktop: width >= BREAKPOINTS.tablet,

    down: (bp: number) => width < bp,
    up: (bp: number) => width >= bp,
  };
}
