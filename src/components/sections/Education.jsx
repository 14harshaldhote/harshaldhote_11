// Education.jsx
import React from 'react';
import SectionHeading from '../common/SectionHeading';
import EducationCard from '../common/EducationCard';

const Education = () => {
  return (
    <section id="education" className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Education" />
        
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 space-y-6 sm:space-y-8 md:space-y-10">
          <EducationCard 
            institution="Centre for Development of Advanced Computing"
            degree="PG-Diploma in Advanced Computing"
            grade="A-Grade"
            period="September 2023 – February 2024"
            location="Nagpur, India"
          />
          
          <EducationCard 
            institution="G H Raisoni College Of Engineering"
            degree="B.Tech., Computer Science Engineering"
            grade="81.3%"
            period="2020 – 2023"
            location="Nagpur, India"
          />
          
          <EducationCard 
            institution="Shri Datta Meghe Polytechnic"
            degree="Diploma in Computer Technology"
            grade="77.8%"
            period="2018 – 2020"
            location="Nagpur, India"
          />
        </div>
        
        {/* Certifications Section
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6">Certifications</h3>
          <ul className="list-disc pl-4 sm:pl-5 md:pl-6 space-y-2 sm:space-y-3">
            <li className="text-sm sm:text-base md:text-lg">Post Graduate Diploma in Advanced Computing</li>
          </ul>
        </div>
        */}
      </div>
    </section>
  );
};

export default Education;