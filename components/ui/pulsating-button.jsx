/** @format */

"use client";
import React from "react";

import { cn } from "@/lib/utils";

export default function PulsatingButton({
  className,
  children,
  pulseColor = "#cfc400",
  duration = "1.5s",
  ...props
}) {
  return (
    <button
      className={cn(
        "relative w-full h-full text-center cursor-pointer flex px-8 items-center rounded-[20px] text-white dark:text-black bg-yellow-500 dark:bg-blue-500 py-2",
        className
      )}
      style={{
        "--pulse-color": pulseColor,
        "--duration": duration,
      }}
      {...props}>
      <div className="relative z-10">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-[20px] bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
}
