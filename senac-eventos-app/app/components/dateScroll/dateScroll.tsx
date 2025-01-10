import React, { useRef } from "react";


type Date = {
  displayDate: string;
  day: string;
  value: string;
};

interface DateScrollProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

const data: Date[] = [
  { displayDate: "11 Jan", day: "Sáb", value: "01-11" },
  { displayDate: "12 Jan", day: "Dom", value: "01-12" },
  { displayDate: "13 Jan", day: "Seg", value: "01-13" },
  { displayDate: "14 Jan", day: "Ter", value: "01-14" },
  { displayDate: "15 Jan", day: "Qua", value: "01-15" },
  { displayDate: "16 Jan", day: "Qui", value: "01-16" },
];
export default function DateScroll({ selectedDate, setSelectedDate }: DateScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging = true;
    startX = e.pageX - (containerRef.current?.offsetLeft || 0);
    scrollLeft = containerRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = x - startX;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDragging = false;
  };

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-scroll scrollbar-hide bg-[#002F6C] py-2 px-4"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {data.map((item) => (
        <button
          key={item.value}
          className={`flex flex-col items-center justify-center mx-2 rounded-lg w-32 h-20 ${
            selectedDate === item.value ? "bg-[#0056D6]" : "bg-transparent"
          }`}
          onClick={() => setSelectedDate(selectedDate === item.value ? "" : item.value)}
        >
          <span
            className={`text-sm font-bold ${
              selectedDate === item.value ? "text-white" : "text-[#6e99df]"

            }`}
          >
            {item.displayDate}
          </span>
          <span
            className={`text-xs mt-1 ${
              selectedDate === item.value ? "text-white" : "text-[#6e99df]"
            }`}
          >
            {item.day}
          </span>
        </button>
      ))}
    </div>
  );
}
