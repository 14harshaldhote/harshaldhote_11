import { useState, useEffect, useRef } from 'react';

export default function VerticalNavigation() {
  const [activeSection, setActiveSection] = useState('me');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const observerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  
  const sections = [
    { id: 'me', label: 'ME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'work', label: 'WORK' },
    { id: 'skill', label: 'SKILL' },
    { id: 'project', label: 'PROJECT' },
    { id: 'education', label: 'EDUCATION' },
  ];
  
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (!isScrolling) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }
    }, options);
    
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    
    observerRef.current = observer;
    
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      setIsScrolling(true);
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      
      window.removeEventListener('scroll', handleScroll);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);
  
  const handleDotClick = (sectionId) => {
    setIsScrolling(true);
    setActiveSection(sectionId);
    
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;
    
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
    const distance = targetPosition - startPosition;
    
    let start = null;
    const duration = 300;
    
    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        setTimeout(() => {
          setIsScrolling(false);
        }, 100);
      }
    }
    
    requestAnimationFrame(animation);
  };
  
  return (
    <div className="fixed left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 h-72 sm:h-80 md:h-88 lg:h-96 flex items-center z-50">
      <div className="relative h-full flex flex-col items-center">
        {/* Vertical line */}
        <div className="absolute h-full w-0.5 left-1/2 -translate-x-1/2 bg-gradient-to-b from-transparent via-gray-600 to-transparent dark:from-transparent dark:via-gray-400 dark:to-transparent"></div>
        
        {/* Active section indicator */}
        <div 
          className="absolute w-0.5 sm:w-1 rounded-full transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2"
          style={{
            height: '30px',
            top: `calc(${sections.findIndex(s => s.id === activeSection) * 20}% - 15px)`,
            backgroundColor: 'var(--accent-primary)',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2)'
          }}
        ></div>
        
        {/* Section dots */}
        <div className="h-full w-full flex flex-col justify-between relative z-10">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className="flex items-center group"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              style={{ transition: 'all 0.5s ease-in-out' }}
            >
              {/* Dot */}
              <button
                onClick={() => handleDotClick(section.id)}
                className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden mx-auto"
                style={{
                  backgroundColor: activeSection === section.id 
                    ? 'var(--accent-primary)' 
                    : 'rgb(251, 248, 248)',
                  transform: activeSection === section.id ? 'scale(1.25)' : 'scale(1)',
                  border: '2px solid var(--text-primary)'
                }}
                aria-label={`Navigate to ${section.label} section`}
              >
                {activeSection === section.id && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" 
                    style={{ backgroundColor: 'var(--accent-primary)' }}></span>
                )}
              </button>
              
              {/* Label */}
              <div className="overflow-hidden absolute left-4 sm:left-5 md:left-6">
                <span 
                  className="ml-2 sm:ml-3 text-xs sm:text-sm md:text-base inline-block transition-all duration-100 whitespace-nowrap"
                  style={{
                    color: activeSection === section.id 
                      ? 'var(--accent-primary)' 
                      : 'var(--text-primary)',
                    fontWeight: activeSection === section.id ? '600' : '400',
                    opacity: activeSection === section.id || hoveredSection === section.id ? '1' : '0',
                    transform: activeSection === section.id || hoveredSection === section.id
                      ? 'translateX(0)' 
                      : 'translateX(-10px)',
                    textShadow: activeSection === section.id 
                      ? '0 0 8px rgba(255, 255, 255, 0.4)' 
                      : 'none',
                    pointerEvents: 'none'
                  }}
                >
                  {section.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}