import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-[rgba(201,163,93,0.22)] bg-white/70 backdrop-blur-md px-3 py-2 text-base text-[#111111] placeholder:text-[#5E5E5E]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A35D] focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
