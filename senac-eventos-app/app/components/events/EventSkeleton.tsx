import React from "react";

export default function EventSkeleton() {
  return (
    <div className="p-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg p-4 shadow-sm my-2 animate-pulse"
        >
          <div className="flex justify-between items-center mb-3">
            <div className="bg-gray-300 h-4 w-3/5 rounded-md"></div>
            <div className="bg-gray-300 h-4 w-10 rounded-md"></div>
          </div>
          <div className="flex items-center mb-3">
            <div className="bg-gray-300 h-4 w-24 rounded-md mr-4"></div>
            <div className="bg-gray-300 h-4 w-16 rounded-md"></div>
          </div>
          <div className="bg-gray-300 h-6 w-1/2 rounded-md mb-2"></div>
          <div className="bg-gray-300 h-4 w-full rounded-md mb-3"></div>
          <div className="bg-gray-300 h-4 w-4/5 rounded-md mb-3"></div>
          <div className="bg-gray-300 h-4 w-32 rounded-md"></div>
        </div>
      ))}
    </div>
  );
}