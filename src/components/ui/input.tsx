import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-10 w-full rounded-md border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 text-sm placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 ${
          className ?? ""
        }`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;