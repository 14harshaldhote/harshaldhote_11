// SectionHeading.jsx
import React from 'react';

const SectionHeading = ({ title }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-4xl sm:text-4xl inline-block relative">
        {title}
        <span className="absolute bottom-0 left-0 w-full h-1transform -translate-y-2"></span>
      </h2>
    </div>
  );
};

export default SectionHeading;