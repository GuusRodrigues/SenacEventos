"use client";

import React, { useEffect, useState } from "react";

export default function PostSkeleton() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const animateOpacity = () => {
      setInterval(() => {
        setOpacity((prevOpacity) => (prevOpacity === 1 ? 0.5 : 1));
      }, 800);
    };

    animateOpacity();
  }, []);

  return (
    <div className="p-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg shadow-md mb-5 overflow-hidden"
          style={{ opacity }}
        >
          <div className="w-full h-52 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}