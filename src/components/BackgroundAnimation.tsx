
import React from "react";

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-medicine-background opacity-80"></div>
      <div className="absolute -inset-[10%] blur-3xl opacity-20">
        {/* Floating bubbles with relaxing animation */}
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-medicine-primary to-medicine-accent/70 animate-pulse-subtle"></div>
        <div className="absolute top-[10%] right-[20%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-medicine-accent to-medicine-primary/70 animate-pulse-subtle" style={{ animationDelay: "1.5s" }}></div>
        <div className="absolute bottom-[20%] left-[30%] w-[35%] h-[35%] rounded-full bg-gradient-to-br from-medicine-secondary to-medicine-primary/70 animate-pulse-subtle" style={{ animationDelay: "3s" }}></div>
        <div className="absolute bottom-[15%] right-[25%] w-[25%] h-[25%] rounded-full bg-gradient-to-br from-medicine-primary/80 to-medicine-secondary/70 animate-pulse-subtle" style={{ animationDelay: "2.2s" }}></div>
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] rounded-full bg-gradient-to-br from-medicine-accent/90 to-medicine-secondary/70 animate-pulse-subtle" style={{ animationDelay: "4s" }}></div>
      </div>
    </div>
  );
};

export default BackgroundAnimation;
