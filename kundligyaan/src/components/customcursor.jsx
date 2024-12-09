import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e) => {
      if (!isLargeScreen) return;

      // Cursor follows the mouse directly
      gsap.to(cursor, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
      });

      // Follower lags behind the cursor slightly
      gsap.to(follower, {
        duration: 0.6,
        x: e.clientX,
        y: e.clientY,
      });
    };

    const onResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, [isLargeScreen]);

  // Disable cursor on small screens
  if (!isLargeScreen) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="cursor w-2 h-2 bg-blue-500 rounded-full fixed pointer-events-none z-50"
        style={{ transform: "translate(-50%, -50%)", position: "absolute" }}
      ></div>

      {/* Follower cursor */}
      <div
        ref={followerRef}
        className="cursor-follower w-8 h-8 border-2 border-blue-500 rounded-full fixed pointer-events-none z-50"
        style={{ transform: "translate(-50%, -50%)", position: "absolute" }}
      ></div>
    </>
  );
};

export default Cursor;
