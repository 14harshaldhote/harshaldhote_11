// ExperienceCard.jsx
import React, { useState } from 'react';

const ExperienceCard = ({ title, company, location, period, responsibilities }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`bg-[var(--button-bg)] p-4 sm:p-6 rounded-xl shadow-lg border-l-4 border-[var(--accent-primary)] 
        transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl w-full
        ${isHovered ? 'bg-opacity-95' : ''} max-h-[300px] sm:max-h-[400px] overflow-y-auto`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-heading)]">{title}</h3>
            <div className="h-2 w-2 rounded-full bg-[var(--accent-primary)] animate-pulse"></div>
          </div>
          <p className="text-base sm:text-lg text-[var(--text-primary)] opacity-90 hover:opacity-100 transition-opacity">
            {company}
          </p>
        </div>
        
        <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2">
          <span className="px-2 sm:px-3 py-0.5 rounded-full bg-[var(--accent-primary)] text-[var(--bg-primary)] font-medium text-xs sm:text-sm">
            {period}
          </span>
          <span className="flex items-center text-[var(--text-primary)] text-xs sm:text-sm">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {location}
          </span>
        </div>
      </div>

      <div className="mt-4 pl-2 sm:pl-3 border-l-2 border-[var(--accent-primary)] border-opacity-30">
        <ul className="space-y-2 text-[var(--text-primary)] text-xs sm:text-sm text-left">
          {responsibilities.map((responsibility, index) => (
            <li 
              key={index}
              className="flex items-start group"
            >
              <span className="inline-block w-1.5 h-1.5 mt-1.5 mr-2 bg-[var(--accent-primary)] rounded-full group-hover:scale-125 transition-transform"></span>
              <span className="flex-1 group-hover:translate-x-1 transition-transform text-left">
                {responsibility}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;