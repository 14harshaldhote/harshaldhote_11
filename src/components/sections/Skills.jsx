// Skills.jsx
import React, { useState, useRef, useEffect } from 'react';
import SectionHeading from '../common/SectionHeading';
import SkillBadge from '../common/SkillBadge';

// Category Card with animated reveal
const CategoryCard = ({ category, isActive, isVisible }) => {
  return (
    <div className={`p-4 sm:p-6 md:p-8 transition-all duration-500 ${isActive ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'}`}>
      <div className="mb-4 sm:mb-6 md:mb-8 flex flex-col sm:flex-row items-center sm:items-start">
        <div className={`text-4xl sm:text-5xl mb-3 sm:mb-0 sm:mr-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          {category.icon}
        </div>
        <div className={`text-center sm:text-left transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)]">{category.category}</h3>
          <p className="text-sm sm:text-base text-[var(--text-primary)] opacity-80 mt-1 max-w-2xl">{category.description}</p>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
        {category.skills.map((skill, i) => (
          <SkillBadge 
            key={i} 
            name={skill.name}
            icon={skill.icon}
            isVisible={isVisible}
            style={{ transitionDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  const skillCategories = [
    {
      category: "Languages",
      icon: "💻",
      description: "Programming languages I've extensively worked with across various professional projects and applications",
      skills: [
        { 
          name: "Java",
          icon: <svg className="w-6 h-6 text-[var(--text-primary)]" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573" />
            <path fill="currentColor" d="M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" />
          </svg>
        },
        { 
          name: "Python",
          icon: <svg className="w-6 h-6 text-[var(--text-primary)]" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 4.983 7.647 4.983l.006 2.055h4.363v.619H5.92s-2.927-.332-2.927 4.282c0 4.613 2.554 4.45 2.554 4.45h1.524v-2.149s-.13-2.554 2.513-2.554z"/>
            <path fill="currentColor" d="M9.794 4.55a.786.786 0 1 0 .001 1.573.786.786 0 0 0-.001-1.573zM14.415 12.308h-4.328s-2.432-.039-2.432 2.35v3.951S7.286 21 12.064 21c4.574 0 4.289-1.983 4.289-1.983l-.006-2.055h-4.363v-.619h6.097s2.927.332 2.927-4.282c0-4.613-2.554-4.45-2.554-4.45h-1.524v2.149s.13 2.554-2.513 2.554z"/>
            <path fill="currentColor" d="M14.207 19.45a.786.786 0 1 0-.002-1.573.786.786 0 0 0 .002 1.573z"/>
          </svg>
          },
        { 
          name: "SQL",
          icon: <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-6 h-6 text-[var(--text-primary)]" 
          viewBox="0 0 24 24"
        >
          <path 
            fill="currentColor" 
            d="M12 0C5.374 0 0 2.69 0 6v12c0 3.31 5.374 6 12 6s12-2.69 12-6V6c0-3.31-5.374-6-12-6zm0 3c5.466 0 9 1.978 9 3s-3.534 3-9 3-9-1.978-9-3 3.534-3 9-3zm0 15c-5.466 0-9-1.978-9-3v3c0 1.022 3.534 3 9 3s9-1.978 9-3v-3c0 1.022-3.534 3-9 3zm0-6c5.466 0 9-1.978 9-3V6c0 1.022-3.534 3-9 3S3 7.022 3 6v3c0 1.022 3.534 3 9 3z"
          />
        </svg>
        },
        { 
          name: "Javascript",
          icon: <svg className="w-6 h-6 text-[var(--text-primary)]" viewBox="0 0 24 24">
            <path fill="currentColor" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
          </svg>
        }
      ]
    },
    {
      category: "Frameworks",
      icon: "🏗️", 
      description: "Frameworks I've implemented in production environments to build scalable and maintainable applications",
      skills: [
        { 
          name: "SpringBoot",
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[var(--text-primary)]" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 2.5c-5.24 0-9.5 4.26-9.5 9.5s4.26 9.5 9.5 9.5 9.5-4.26 9.5-9.5-4.26-9.5-9.5-9.5zm4.86 10.33c-.29.73-.72 1.4-1.28 1.97a6.5 6.5 0 0 1-4.58 1.87 6.47 6.47 0 0 1-4.58-1.87 6.24 6.24 0 0 1-1.28-1.97c-.36-.91-.36-1.92 0-2.83.29-.73.72-1.4 1.28-1.97a6.5 6.5 0 0 1 4.58-1.87 6.47 6.47 0 0 1 4.58 1.87 6.24 6.24 0 0 1 1.28 1.97c.36.91.36 1.92 0 2.83z"/>
          <path fill="currentColor" d="M12 7.03c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          <path fill="currentColor" d="M12 5.03c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 9c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        </svg>
        },
        { 
          name: "Django",
          icon: <svg className="w-6 h-6 text-[var(--text-primary)]" viewBox="0 0 24 24">
            <path fill="currentColor" d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.53 3.109-2.625.561-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z"/>
          </svg>
        }
      ]
    },
    {
      category: "Libraries & Technologies",
      icon: "⚙️",
      description: "Tools and technologies I've utilized to enhance development workflows and deliver robust solutions",
      skills: [
        { name: "React.js" },
        { name: "Flask" },
        { name: "Docker" },
        { name: "Kubernetes" },
        { name: "AWS" },
        { name: "Git" },
        { name: "Celery" },
        { name: "Tesseract" },
        { name: "JWT" },
        { name: "OpenCV" }
      ]
    }
  ];

  const allCategories = ["All", ...skillCategories.map(cat => cat.category)];

  const displayedSkills = activeCategory === "All" 
    ? skillCategories 
    : skillCategories.filter(cat => cat.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="skill" 
      className="min-h-screen py-12 sm:py-16 md:py-20 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-[var(--accent-primary)] blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[var(--accent-primary)] blur-3xl opacity-10"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SectionHeading title="Technical Skills" />
          
          <p className="text-center text-[var(--text-primary)] text-base sm:text-lg max-w-3xl mx-auto mt-4 sm:mt-6 opacity-80">
            A showcase of technologies I've worked with throughout my professional journey, building real-world applications and solving complex problems.
            <span className="block text-xs sm:text-sm mt-2">Explore each category to see my technical experience</span>
          </p>
        </div>
        
        {/* Category Filter Tabs */}
        <div className={`mt-8 sm:mt-12 flex justify-center transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex flex-wrap justify-center gap-2 p-2 rounded-xl border border-[var(--accent-primary)] border-opacity-10 backdrop-blur-sm">
            {allCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)] shadow-md transform scale-105' 
                    : 'text-[var(--text-primary)] hover:text-[var(--text-heading)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Skills Display */}
        <div className="mt-8 sm:mt-16 space-y-8 sm:space-y-12">
          {/* Languages and Frameworks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {displayedSkills
              .filter(cat => cat.category === "Languages" || cat.category === "Frameworks")
              .map((category, index) => (
                <CategoryCard 
                  key={index}
                  category={category}
                  isActive={true}
                  isVisible={isInView}
                />
            ))}
          </div>
          
          {/* Libraries & Technologies */}
          {displayedSkills
            .filter(cat => cat.category === "Libraries & Technologies")
            .map((category, index) => (
              <CategoryCard 
                key={index}
                category={category}
                isActive={true}
                isVisible={isInView}
              />
          ))}
        </div>
        
        {/* Call to Action */}
        <div className={`mt-12 sm:mt-24 text-center transition-all duration-1000 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-[var(--accent-primary)] blur-md rounded-lg opacity-30 group-hover:opacity-50 transition-all duration-300 -z-10 transform group-hover:scale-105"></div>
            <p className="text-[var(--text-heading)] text-base sm:text-lg font-medium mb-3 sm:mb-4 p-3 sm:p-4">Interested in how I can apply these skills to your project?</p>
            <a 
              href="mailto:dhoteharshal16@gmail.com"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-[var(--accent-primary)] text-[var(--bg-primary)] rounded-lg font-medium text-sm sm:text-base shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-transparent hover:border-[var(--button-border-hover)]"
            >
              Let's Build Something Amazing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;