
// Education.jsx
import React from 'react';
import SectionHeading from '../common/SectionHeading';
import EducationCard from '../common/EducationCard';

const Education = () => {
  return (
    <section id="education" className="min-h-screen py-20 flex flex-col items-center">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Education" />
        
        <div className="mt-12 space-y-8">
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
        
        {/* <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Certifications</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Post Graduate Diploma in Advanced Computing</li>
            {/* Add more certifications as needed 
          </ul>
        </div> */}
      </div>
    </section>
  );
};

export default Education;