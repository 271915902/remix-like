import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={`rounded-lg border border-black/10 dark:border-white/20 bg-white/70 dark:bg-black/20 p-4 ${
        className ?? ""
      }`}
      {...props}
    />
  );
};

export default Card;