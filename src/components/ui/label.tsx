import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  return (
    <label
      className={`text-sm font-medium text-foreground/80 ${className ?? ""}`}
      {...props}
    />
  );
};

export default Label;