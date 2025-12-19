import { ButtonHTMLAttributes, ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  asChild = false,
  className = "",
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  const baseClasses =
    "font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantClasses = {
  primary: "bg-white text-black hover:bg-gray-100 focus:ring-black",
  outline: "bg-black text-white hover:bg-gray-900 focus:ring-white",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};


  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <Comp
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
};
