// SectionHeading.jsx
import React from 'react';

const SectionHeading = ({ title }) => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-heading)]">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;