import React, { useState } from 'react';

const ProjectCard = ({ title, period, technologies, description, imageUrl, hasImage = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`group relative bg-[var(--button-bg)] rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl transform hover:scale-[1.02] ${!hasImage ? 'pt-6' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay and image only shown if hasImage is true */}
      {hasImage && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--button-bg)] opacity-80 z-10"></div>
          
          <div className="h-64 overflow-hidden">
            <img 
              src={imageUrl || "/assets/images/project-placeholder.jpg"} 
              alt={title} 
              className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
          </div>
        </>
      )}
      
      {/* Content container */}
      <div className={`relative z-20 p-6 ${hasImage ? '-mt-16' : ''}`}>
        {/* Title and period with animated underline */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-[var(--text-heading)] relative">
            {title}
            <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--accent-primary)] transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}></span>
          </h3>
          <span className="text-sm font-medium px-3 py-1 rounded-full border border-[var(--accent-primary)] text-[var(--accent-primary)]">
            {period}
          </span>
        </div>
        
        {/* Technologies with animated hover */}
        <div className="mb-5 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="text-sm font-medium px-3 py-1 rounded-full border border-[var(--accent-primary)] text-[var(--accent-primary)]">
         
              {tech}
            </span>
          ))}
        </div>
        
        {/* Description with custom styled list */}
        <div className="text-sm text-[var(--text-primary)] space-y-2">
          {description.map((item, index) => (
            <div key={index} className="flex items-start">
              <span className="text-[var(--accent-primary)] mr-2 mt-1">▹</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
