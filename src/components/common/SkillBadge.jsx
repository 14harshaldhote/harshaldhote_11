// SkillBadge.jsx
import React from 'react';

const SkillBadge = ({ name, isVisible, style }) => {
  return (
    <div 
      style={style}
      className={`
        px-3 sm:px-4 py-2 
        bg-[var(--bg-secondary)]
        rounded-full shadow-md 
        border border-[var(--accent-primary)] border-opacity-10
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
        text-center
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <span className="text-sm sm:text-base font-medium text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
        {name}
      </span>
    </div>
  );
};

export default SkillBadge;