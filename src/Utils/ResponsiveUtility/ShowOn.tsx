import { useResponsive } from "./useResponsive";

export const ShowOn = ({
  mobile,
  tablet,
  desktop,
  children,
}: any) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  if (
    (mobile && isMobile) ||
    (tablet && isTablet) ||
    (desktop && isDesktop)
  ) {
    return children;
  }

  return null;
};
