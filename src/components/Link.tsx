import { Link as RouterLink, type LinkProps } from "react-router";

export const Link = ({ className, children, ...props }: LinkProps) => {
  return <RouterLink {...props}>{children}</RouterLink>;
};
