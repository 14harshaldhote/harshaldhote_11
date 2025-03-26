import React from 'react';

const SkillBadge = ({ 
  name, 
  icon, 
  isVisible = true, 
  style = {}, 
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  // Variant-based background and text styles
  const variantStyles = {
    default: 'bg-[var(--button-bg)] border-[var(--accent-primary)] text-[var(--text-primary)]',
    outlined: 'bg-transparent border-[var(--accent-primary)] text-[var(--accent-primary)]',
    soft: 'bg-[var(--accent-primary)] bg-opacity-10 text-[var(--accent-primary)]'
  };

  // Size-based padding and text styles
  const sizeStyles = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3.5 py-2 text-base',
    lg: 'px-4.5 py-2.5 text-lg'
  };

  return (
    <div
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(1rem)'
      }}
      className={`
        rounded-full 
        shadow-md
        border border-opacity-10
        transition-all 
        duration-300
        hover:shadow-lg 
        hover:-translate-y-1 
        hover:border-opacity-30
        text-center
        w-auto
        min-w-fit
        flex 
        items-center 
        justify-center 
        gap-2.5
        m-1
        ${variantStyles[variant] || variantStyles.default}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      {icon && (
        <span className="flex-shrink-0 mx-0.5">
          {icon}
        </span>
      )}
      <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis px-0.5">
        {name}
      </span>
    </div>
  );
};

export default SkillBadge;