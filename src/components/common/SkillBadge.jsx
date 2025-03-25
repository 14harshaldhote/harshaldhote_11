// SkillBadge.jsx
import React from 'react';

const SkillBadge = ({ name, isVisible, style }) => {
  return (
    <div 
      style={style}
      className={`
        px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 
        py-1.5 xs:py-2 sm:py-2.5 md:py-3
        bg-[var(--bg-secondary)]
        rounded-full shadow-md 
        border border-[var(--accent-primary)] border-opacity-10
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
        text-center
        w-auto max-w-full
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <span className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-medium text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis block">
        {name}
      </span>
    </div>
  );
};

export default SkillBadge;