import React from "react";
import { cn } from "../../lib/utils";

const Spinner = ({ className, ...props }) => (
  <div
    className={cn(
      "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
      className
    )}
    {...props}
  />
);

export { Spinner };
