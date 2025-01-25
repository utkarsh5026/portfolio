import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileAvatar: React.FC = () => {
  const [imageSrc, setImageSrc] = useState("./personal-min.jpg");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const highQualityImage = new Image();
    highQualityImage.src = "./personal.jpg";

    highQualityImage.onload = () => {
      setImageSrc("./personal.jpg");
      setIsLoading(false);
    };
  }, []);

  return (
    <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64">
      <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
      <div className="absolute inset-[3px] rounded-full bg-slate-950">
        <div className="h-full w-full rounded-full overflow-hidden relative">
          <Skeleton
            className="h-full w-full rounded-full absolute inset-0 transition-opacity duration-300 ease-in-out"
            style={{ opacity: isLoading ? 1 : 0 }}
          />
          <img
            className="h-full w-full object-cover transition-opacity duration-300 ease-in-out"
            style={{ opacity: isLoading ? 0 : 1 }}
            src={imageSrc}
            alt="Utkarsh Priyadarshi"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatar;
