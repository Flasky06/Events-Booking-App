import React, { useState, useEffect } from "react";
import HeaderNavComponent from "./HeaderNavComponent";
import MobileNavComponent from "./MobileNavComponent";

const HeaderComponent = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full">
      {isMobile ? <MobileNavComponent /> : <HeaderNavComponent />}
    </div>
  );
};

export default HeaderComponent;
