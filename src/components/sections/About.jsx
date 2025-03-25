// About.jsx
import React from 'react';
import SectionHeading from '../common/SectionHeading';

const About = () => {
  return (
    <section id="about" className="min-h-screen py-12 sm:py-16 md:py-20 flex flex-col items-center">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Me" />
        
        <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left Column - About Text */}
          <div className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert">
            <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 transition-all duration-300 hover:scale-[1.02]">
              I'm a passionate Full-Stack Developer with expertise in building user-friendly interfaces and scalable systems.
              My journey in software development started with a strong foundation in computer science and has evolved through
              hands-on experience with a wide range of technologies.
            </p>
            <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 md:mb-8 transition-all duration-300 hover:scale-[1.02]">
              I specialize in optimizing web applications and streamlining development processes, always focusing on efficient,
              maintainable code. My problem-solving skills allow me to tackle complex challenges and deliver high-quality solutions.
            </p>
            <p className="text-base sm:text-lg leading-relaxed transition-all duration-300 hover:scale-[1.02]">
              I'm also deeply interested in artificial intelligence and its applications, exploring machine learning models and NLP to create intelligent web experiences. When not coding, I explore new technologies, contribute to open-source projects, and continuously expand my knowledge. I'm always ready for new challenges and innovative collaborations.
            </p>
          </div>
          
          {/* Right Column - Info Cards */}
          <div className="space-y-6 sm:space-y-8">
            {/* Languages Card */}
            <div className="bg-[var(--button-bg)] p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[var(--text-heading)]">Languages</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-sm sm:text-base">English</span>
                  <span className="text-xs sm:text-sm text-[var(--accent-primary)]">Professional</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm sm:text-base">Hindi</span>
                  <span className="text-xs sm:text-sm text-[var(--accent-primary)]">Native</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm sm:text-base">Marathi</span>
                  <span className="text-xs sm:text-sm text-[var(--accent-primary)]">Native</span>
                </li>
              </ul>
            </div>
            
            {/* Interests Card */}
            <div className="bg-[var(--button-bg)] p-4 sm:p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[var(--text-heading)]">Interests</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-opacity-90 rounded-full text-xs sm:text-sm border border-[var(--accent-primary)] text-[var(--text-primary)] hover:scale-105 transition-transform cursor-default">
                  Web Development
                </span>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-opacity-20 rounded-full text-xs sm:text-sm border border-[var(--accent-primary)] text-[var(--text-primary)] hover:scale-105 transition-transform cursor-default">
                  Cloud Computing
                </span>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-opacity-20 rounded-full text-xs sm:text-sm border border-[var(--accent-primary)] text-[var(--text-primary)] hover:scale-105 transition-transform cursor-default">
                  AI & Machine Learning
                </span>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-opacity-20 rounded-full text-xs sm:text-sm border border-[var(--accent-primary)] text-[var(--text-primary)] hover:scale-105 transition-transform cursor-default">
                  Open Source
                </span>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-opacity-20 rounded-full text-xs sm:text-sm border border-[var(--accent-primary)] text-[var(--text-primary)] hover:scale-105 transition-transform cursor-default">
                  Internet Of Things
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;