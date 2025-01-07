import React from 'react';

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
  { displayDate: '09 Jan', day: 'Quinta', value: '01-09' },
  { displayDate: '10 Jan', day: 'Sexta', value: '01-10' },
  { displayDate: '11 Jan', day: 'Sábado', value: '01-11' },
  { displayDate: '12 Jan', day: 'Domingo', value: '01-12' },
  { displayDate: '13 Jan', day: 'Segunda', value: '01-13' },
  { displayDate: '14 Jan', day: 'Terça', value: '01-14' },
];

export default function DateScroll({ selectedDate, setSelectedDate }: DateScrollProps) {
  return (
    <div className="flex overflow-x-auto bg-[#002F6C] py-2 px-4">
      {data.map((item) => (
        <button
          key={item.value}
          className={`flex flex-col items-center mx-2 py-2 px-3 rounded-lg ${
            selectedDate === item.value ? 'bg-[#0056D6]' : ''
          }`}
          onClick={() => setSelectedDate(selectedDate === item.value ? '' : item.value)}
        >
          <span
            className={`text-sm font-bold ${
              selectedDate === item.value ? 'text-white' : 'text-[#6e99df]'
            }`}
          >
            {item.displayDate}
          </span>
          <span
            className={`text-xs mt-1 ${
              selectedDate === item.value ? 'text-white' : 'text-[#6e99df]'
            }`}
          >
            {item.day}
          </span>
        </button>
      ))}
    </div>
  );
}

