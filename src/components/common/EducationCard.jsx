import React from "react";
import { GraduationCap } from "lucide-react"; // Using Lucide icons for better SVG support

const EducationCard = ({ institution, degree, grade, period, location }) => {
  return (
    <div className="relative bg-[var(--button-bg)] p-6 rounded-xl shadow-lg border-l-4 border-[var(--accent-primary)] overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:scale-[1.02]">
      {/* SVG Background Accent */}
      <svg
        className="absolute top-0 right-0 w-32 h-32 text-black opacity-10" // Changed color to black
        fill="none"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 10c30 40 60 40 90 0s60-40 90 0v180H50V10z"
          fill="currentColor"
        />
      </svg>

      {/* Header Section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-[var(--accent-primary)] bg-opacity-10 rounded-full flex items-center justify-center"> {/* Centered the icon */}
          <GraduationCap className="w-8 h-8 text-black" /> {/* Changed color to black */}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[var(--text-heading)]">{institution}</h3>
          <p className="text-lg text-[var(--text-primary)]">{degree}</p>
        </div>
      </div>

      {/* Details */}
      <div className="text-[var(--text-primary)] space-y-2">
        <p>
          <span className="font-medium text-[var(--accent-primary)]">Grade:</span> {grade}
        </p>
        <p>
          <span className="font-medium text-[var(--accent-primary)]">Period:</span> {period}
        </p>
        <p>
          <span className="font-medium text-[var(--accent-primary)]">Location:</span> {location}
        </p>
      </div>
    </div>
  );
};

export default EducationCard;