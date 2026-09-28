import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-(--container-max-width)",
        "px-5 sm:px-6 lg:px-8 xl:px-12",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}