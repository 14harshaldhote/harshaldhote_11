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
    // Clean up previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Initialize observer with options
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };
    
    const observer = new IntersectionObserver((entries) => {
      // Don't update active section while manually scrolling
      if (!isScrolling) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }
    }, options);
    
    // Observe all sections
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    
    // Store observer for cleanup
    observerRef.current = observer;
    
    // Add scroll event listener for smoother transitions
    const handleScroll = () => {
      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      setIsScrolling(true);
      
      // Set a timeout to mark scrolling as finished
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 100); // Adjust this value if needed
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up on unmount
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
    
    // Get the target element
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;
    
    // Get the current scroll position
    const startPosition = window.pageYOffset;
    // Get the target position (with a slight offset for better visibility)
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
    // Calculate distance
    const distance = targetPosition - startPosition;
    
    // Implement custom smooth scroll with easing
    let start = null;
    const duration = 300; // Longer duration for smoother scroll
    
    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function (easeInOutCubic for smoother motion)
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        // Scrolling finished
        setTimeout(() => {
          setIsScrolling(false);
        }, 100);
      }
    }
    
    requestAnimationFrame(animation);
  };
  
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 h-96 flex items-center">
      <div className="relative h-full flex flex-col items-center">
        {/* Vertical line with gradient effect - centered precisely */}
        <div className="absolute h-full w-0.5 left-1/2 -translate-x-1/2 bg-gradient-to-b from-transparent via-gray-600 to-transparent dark:from-transparent dark:via-gray-400 dark:to-transparent"></div>
        
        {/* Active section indicator - properly aligned with the dots */}
        <div 
          className="absolute w-1 rounded-full transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2"
          style={{
            height: '40px',
            top: `calc(${sections.findIndex(s => s.id === activeSection) * 20}% - 20px)`,
            backgroundColor: 'var(--accent-primary)',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2)'
          }}
        ></div>
        
        {/* Section dots - evenly distributed */}
        <div className="h-full w-full flex flex-col justify-between relative z-10">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className="flex items-center group"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              style={{ transition: 'all 0.5s ease-in-out' }}
            >
              {/* Dot - centered exactly */}
              <button
                onClick={() => handleDotClick(section.id)}
                className="w-4 h-4 rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden mx-auto"
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
              
              {/* Label only shows on hover or active state */}
              <div className="overflow-hidden absolute left-6">
                <span 
                  className="ml-3 inline-block transition-all duration-100 whitespace-nowrap"
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
                    pointerEvents: 'none' // Prevents the label from interfering with hover states
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