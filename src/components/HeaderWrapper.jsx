"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import TitleBar from "@/components/TitleBar";

export default function HeaderWrapper() {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* FIXED HEADER STACK */}
      <div
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white"
      >
        <Header />
        <Navbar />
        <TitleBar />
      </div>

      {/* SPACER TO PUSH CONTENT DOWN */}
      <div style={{ height: headerHeight }} />
    </>
  );
}
