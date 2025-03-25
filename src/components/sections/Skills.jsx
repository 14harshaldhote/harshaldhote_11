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
      
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {category.skills.map((skill, i) => (
          <SkillBadge 
            key={i} 
            name={skill.name} 
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
        { name: "Java" },
        { name: "Python" },
        { name: "SQL" },
        { name: "Javascript" }
      ]
    },
    {
      category: "Frameworks",
      icon: "🏗️", 
      description: "Frameworks I've implemented in production environments to build scalable and maintainable applications",
      skills: [
        { name: "SpringBoot" },
        { name: "Django" }
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