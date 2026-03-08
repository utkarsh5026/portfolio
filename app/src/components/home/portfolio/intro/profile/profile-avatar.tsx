import React, { useEffect, useState } from "react";

import { useGitComponent } from "@/hooks/use-git-component";

const ProfileAvatar: React.FC = () => {
  const ref = useGitComponent(ProfileAvatar);
  const [highResLoaded, setHighResLoaded] = useState(false);

  useEffect(() => {
    const highQualityImage = new Image();
    highQualityImage.src = "./personal.webp";

    highQualityImage.onload = () => {
      setHighResLoaded(true);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="group relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 transition-all duration-500 hover:scale-[1.03] cursor-pointer"
    >
      <div
        className="absolute inset-[-4px] border-2 -rotate-3 transition-all duration-500 group-hover:rotate-0"
        style={{
          borderColor:
            "color-mix(in srgb, rgb(var(--ctp-mauve)) 80%, transparent)",
          borderRadius: "45% 55% 40% 60% / 60% 40% 55% 45%",
        }}
      />
      <div
        className="absolute inset-[-8px] border-[3px] rotate-6 transition-all duration-500 group-hover:rotate-[2deg]"
        style={{
          borderColor:
            "color-mix(in srgb, rgb(var(--ctp-pink)) 60%, transparent)",
          borderRadius: "50% 40% 60% 45% / 45% 60% 40% 55%",
        }}
      />
      <div
        className="absolute inset-[-1px] border-2 rotate-1 transition-all duration-500 group-hover:-rotate-1"
        style={{
          borderColor:
            "color-mix(in srgb, rgb(var(--ctp-lavender)) 90%, transparent)",
          borderRadius: "48% 52% 45% 55% / 55% 45% 50% 48%",
        }}
      />

      <div
        className="absolute inset-[2px] bg-ctp-base p-[2px] transition-colors duration-500 group-hover:bg-ctp-mantle overflow-hidden z-10"
        style={{ borderRadius: "48% 49% 51% 47% / 49% 50% 48% 52%" }}
      >
        <div
          className="h-full w-full overflow-hidden relative"
          style={{ borderRadius: "48% 49% 51% 47% / 49% 50% 48% 52%" }}
        >
          <div className="h-full w-full absolute inset-0 bg-ctp-crust flex flex-col items-center justify-center text-center p-4">
            <span className="text-ctp-text text-sm sm:text-base font-medium font-source animate-pulse">
              Wait I am coming
              <br className="sm:hidden" /> 🏃‍♂️💨
            </span>
          </div>

          {/* High Res WebP Image */}
          <img
            className={`h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105 absolute inset-0 z-10 ${highResLoaded ? "opacity-100" : "opacity-0"}`}
            src={highResLoaded ? "./personal.webp" : undefined}
            alt="Utkarsh Priyadarshi"
          />

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
            style={{
              backgroundColor:
                "color-mix(in srgb, rgb(var(--ctp-mantle)) 10%, transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatar;
