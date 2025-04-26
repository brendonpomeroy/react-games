import React from "react";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "gold" | "red" | "blue";
  onClick?: () => void;
  className?: string;
};

export const Button = ({
  children,
  variant = "gold",
  onClick,
  className,
}: ButtonProps) => {
  const base = classNames(
    "relative inline-flex items-center justify-center",
    "px-6 py-2 text-lg uppercase tracking-wide rounded-full",
    "font-serif shadow-[0_4px_12px_rgba(0,0,0,0.4)] ring-2 ring-inset transition-all duration-200",
    "hover:brightness-110 hover:scale-[1.04]",
    "before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:opacity-0 hover:before:opacity-10 before:transition-all before:duration-300",
    "embossed-text", // Applies to all buttons
    className
  );

  const variants = {
    gold: classNames(
      "bg-gradient-to-br from-[#ffe680] to-[#ffcc00]",
      "text-[#2c2c1e]",
      "ring-[#c9a100]",
      "shadow-inner"
    ),

    red: classNames(
      "bg-gradient-to-br from-[#8b0000] to-[#5a0000]",
      "text-[#f5cccc]",
      "ring-[#4d0000]",
      "shadow-inner"
    ),

    blue: classNames(
      "bg-gradient-to-br from-[#547dbf] to-[#1d3557]",
      "text-[#dceaff]",
      "ring-[#1a2a47]",
      "shadow-inner"
    ),
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {children}
    </button>
  );
};
