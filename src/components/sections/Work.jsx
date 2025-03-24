// Work.jsx
import React from 'react';
import ExperienceCard from '../common/ExperienceCard';
import SectionHeading from '../common/SectionHeading';

const Work = () => {
  return (
    <section id="work" className="min-h-screen py-20 flex flex-col items-center">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Work Experience" />
        
        <div className="mt-12 space-y-8">
          <ExperienceCard 
            title="Full-Stack Developer"
            company="Ardur Technology"
            location="Pune, India"
            period="April 2024 – Present"
            responsibilities={[
              "Optimized web applications, leading to significant performance gains and increased user satisfaction",
              "Designed and implemented new features, improving system functionality and reducing development time",
              "Collaborated with cross-functional teams to streamline development processes, boosting efficiency",
              "Developed advanced data extraction systems and role-based access control for better user management",
              "Prepared systems for scalable cloud deployment ensuring high reliability"
            ]}
          />
          
          {/* Add more experience cards as needed */}
        </div>
      </div>
    </section>
  );
};

export default Work;
