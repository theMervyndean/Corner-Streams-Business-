import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const sizeClasses = {
    sm: { svg: "h-12 w-12", title: "text-base", subtitle: "text-xs" },
    md: { svg: "h-24 w-24", title: "text-xl", subtitle: "text-sm" },
    lg: { svg: "h-36 w-36", title: "text-2xl", subtitle: "text-base" },
  };

  const selectedSize = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Visual Logo Icon */}
      <svg
        className={selectedSize.svg}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Corner/L-Shape Border - Black/Deep Navy (#0A2540) */}
        <path
          d="M60 40 V135 C60 143.28 66.72 150 75 150 H160"
          stroke="#0A2540"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Corner Outer/Shadow L-shape */}
        <path
          d="M50 40 V145 C50 153.28 56.72 160 65 160 H160"
          stroke="#0A2540"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Rising Bar Chart Elements at the Bottom - Blue (#0052CC) */}
        <rect x="105" y="115" width="10" height="25" rx="2" fill="#0052CC" />
        <rect x="123" y="100" width="10" height="40" rx="2" fill="#0052CC" />
        <rect x="141" y="90" width="10" height="50" rx="2" fill="#0052CC" />

        {/* Canopy / Awning Outline - Black/Deep Navy (#0A2540) */}
        <path
          d="M136 60 C136 50 143 45 150 45 C157 45 164 50 164 60 C164 55 171 48 178 48 C185 48 191 55 191 65 C191 75 180 85 170 90 L166 92"
          stroke="#0A2540"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Shop canopy front curves */}
        <path
          d="M140 75 C140 85 147 90 155 90 C163 90 170 85 170 75 C170 85 177 90 185 90 C193 90 200 85 200 75"
          stroke="#0A2540"
          strokeWidth="6"
          strokeLinecap="round"
          fill="white"
        />
        
        {/* Flowing blue streams/curves going up & out (#0052CC & #00875A & lighter blue) */}
        {/* Stream 1 */}
        <path
          d="M68 135 C75 110 95 80 120 70 C140 62 170 50 175 25"
          stroke="#0052CC"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Stream 2 */}
        <path
          d="M78 135 C85 118 100 95 118 88 C135 81 155 75 160 55"
          stroke="#00875A"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Stream 3 */}
        <path
          d="M88 135 C93 125 105 110 120 105 C132 100 145 95 150 78"
          stroke="#0052CC"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Scattered digital pixel/data blocks floating with stream */}
        <rect x="80" y="70" width="8" height="8" fill="#0052CC" />
        <rect x="92" y="85" width="6" height="6" fill="#0052CC" />
        <rect x="110" y="55" width="8" height="8" rx="1" fill="#0052CC" />
        <rect x="125" y="45" width="5" height="5" fill="#00875A" />
        <rect x="145" y="32" width="7" height="7" fill="#0052CC" />
      </svg>

      {/* Corporate Branding Text */}
      {showText && (
        <div className="mt-2 select-none">
          <h1 className="font-display font-bold tracking-tight text-navy leading-tight flex items-center justify-center gap-1">
            <span className="text-navy text-[22px] md:text-2xl">Corner</span>
            <span className="text-royal text-[22px] md:text-2xl">Streams</span>
          </h1>
          <h2 className="font-display font-semibold uppercase tracking-[0.16em] text-green text-[13px] md:text-[15px] mt-0.5">
            Business
          </h2>
        </div>
      )}
    </div>
  );
}
