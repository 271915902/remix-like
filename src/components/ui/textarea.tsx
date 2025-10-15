import * as React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`flex min-h-24 w-full rounded-md border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 text-sm placeholder:text-black/50 dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40 ${
          className ?? ""
        }`}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;