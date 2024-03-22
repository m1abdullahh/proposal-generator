"use client";
import { useState } from "react";
import React from "react";

export const Tooltip = ({
  children,
  tooltipText,
}: {
  children: React.ReactNode;
  tooltipText: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      {showTooltip && (
        <div className="absolute z-10 bg-formGray text-black text-sm rounded-md shadow-md whitespace-nowrap px-[6px] py-[3px]">
          {tooltipText}
        </div>
      )}
    </div>
  );
};
