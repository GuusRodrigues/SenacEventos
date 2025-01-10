/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { countryCodes } from "../data/countryCodes";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const selectedCountry = countryCodes.find((country) => country.code === value);

  return (
    <div className="relative flex items-center">
      <select
        className="p-3 border rounded-lg text-gray-600 border-blue-300 w-full appearance-none bg-white pl-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {countryCodes.map((country) => (
          <option key={country.code + country.flag} value={country.code}>
            {country.code}
          </option>
        ))}
      </select>
      {selectedCountry && (
        <div className="absolute inset-y-0 left-2 flex items-center">
          <img
            src={selectedCountry.flag}
            alt={`${value} flag`}
            className="w-5 h-5 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default CountrySelect;