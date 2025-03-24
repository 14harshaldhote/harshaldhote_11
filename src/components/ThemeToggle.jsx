import { useState, useEffect } from 'react';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize theme based on system preference or stored preference
  useEffect(() => {
    // Check if user has a stored preference
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme) {
      // Use stored preference
      setIsDarkMode(storedTheme === 'dark');
      applyTheme(storedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      applyTheme(prefersDark);
    }
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
        applyTheme(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const applyTheme = (isDark) => {
    document.documentElement.classList.toggle('dark-theme', isDark);
    document.documentElement.classList.toggle('light-theme', !isDark);
    
    // You can also set CSS variables for more flexible theming
    document.documentElement.style.setProperty('--bg-color', isDark ? '#121212' : '#ffffff');
    document.documentElement.style.setProperty('--text-color', isDark ? '#ffffff' : '#121212');
  };

  const toggleTheme = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    // Apply theme
    applyTheme(newTheme);
    
    // Store user preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className="relative p-1 rounded-full w-14 h-7 flex items-center justify-between transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        style={{
          backgroundColor: isDarkMode ? '#1a1a1a' : '#f0f0f0',
          border: `1px solid ${isDarkMode ? '#444444' : '#dddddd'}`
        }}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        disabled={isAnimating}
      >
        {/* Moon icon (dark mode) - positioned at the start */}
        <div className="flex items-center justify-center h-full pl-1.5 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 transition-opacity duration-300"
            style={{
              opacity: isDarkMode ? 1 : 0,
              color: '#f0c420'
            }}
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </div>
        
        {/* Toggle knob with correct positioning */}
        <span
          className="absolute rounded-full w-5 h-5 shadow-md transition-transform duration-300 ease-in-out"
          style={{
            backgroundColor: isDarkMode ? '#ffffff' : '#121212',
            transform: isDarkMode ? 'translateX(0)' : 'translateX(7px)',
            left: isDarkMode ? '3px' : '50%',
          }}
        />
        
        {/* Sun icon (light mode) - positioned at the end */}
        <div className="flex items-center justify-center h-full pr-1.5 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 transition-opacity duration-300"
            style={{
              opacity: isDarkMode ? 0 : 1,
              color: '#f0c420'
            }}
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </div>
      </button>
    </div>
  );
}

export default ThemeToggle;