import * as React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ButtonAppearance {
  variant?: "solid" | "ghost";
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  iconSize?: number;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonAppearance {}
type ButtonLinkProps = React.ComponentPropsWithoutRef<typeof Link> & ButtonAppearance;

export function buttonClassName({ className = "", variant = "solid" }: { className?: string; variant?: "solid" | "ghost" } = {}) {
  const baseStyles = "cursor-pointer inline-flex items-center justify-center font-plus font-medium rounded-[8px] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-[10px] px-[20px] py-[10px] text-[16px] leading-none";
  const variants = {
    solid: "bg-primary text-white hover:bg-primary/90 focus:ring-primary",
    ghost: "bg-white text-primary border border-primary/20 hover:bg-gray-50 focus:ring-gray-200",
  };
  return `${baseStyles} ${variants[variant]} ${className}`;
}

/** Navigation CTAs are one focusable link, never a button nested in a link. */
export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, iconLeft: IconLeft, iconRight: IconRight, iconSize = 20, children, ...props }, ref) => (
    <Link ref={ref} className={buttonClassName({ className, variant })} {...props}>
      {IconLeft && <IconLeft size={iconSize} aria-hidden="true" />}
      {children && <span>{children}</span>}
      {IconRight && <IconRight size={iconSize} aria-hidden="true" />}
    </Link>
  ),
);
ButtonLink.displayName = "ButtonLink";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "solid", iconLeft: IconLeft, iconRight: IconRight, iconSize = 20, children, ...props }, ref) => {
    const combinedClassName = buttonClassName({ className, variant });

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {IconLeft && <IconLeft size={iconSize} aria-hidden="true" />}
        {children && <span>{children}</span>}
        {IconRight && <IconRight size={iconSize} aria-hidden="true" />}
      </button>
    );
  }
);

Button.displayName = "Button";
