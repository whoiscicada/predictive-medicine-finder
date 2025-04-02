
import React from "react";

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-medicine-background opacity-80"></div>
      <div className="absolute -inset-[10%] blur-3xl opacity-20">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-medicine-primary animate-pulse-subtle"></div>
        <div className="absolute top-[10%] right-[20%] w-[30%] h-[30%] rounded-full bg-medicine-accent animate-pulse-subtle" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute bottom-[20%] left-[30%] w-[35%] h-[35%] rounded-full bg-medicine-secondary animate-pulse-subtle" style={{ animationDelay: "1s" }}></div>
      </div>
    </div>
  );
};

export default BackgroundAnimation;
