import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-foreground text-background hover:opacity-90 transition-colors",
  outline:
    "border border-black/10 dark:border-white/20 bg-transparent hover:bg-black/[.05] dark:hover:bg-white/[.06]",
  secondary:
    "bg-black/[.05] dark:bg-white/[.06] text-foreground hover:opacity-90",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-3 text-sm rounded-md",
  md: "h-10 px-4 text-sm rounded-md",
  lg: "h-12 px-6 text-base rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const cls = `${sizeClasses[size]} ${variantClasses[variant]} ${
      className ?? ""
    }`;
    return <button ref={ref} className={cls} {...props} />;
  }
);

Button.displayName = "Button";

export default Button;