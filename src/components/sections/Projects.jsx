// Projects.jsx
import React from 'react';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from '../common/ProjectCard';
import project1Image from '../../assets/images/project1.avif';


const Projects = () => {
  return (
    <section id="project" className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Projects" />
        
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <ProjectCard 
            title="Employee Management & Collaboration System"
            period="2024 – Present"
            technologies={["Python", "Django", "PostgreSQL", "Celery", "Docker"]}
            description={[
              "Developed a comprehensive Employee Management System with advanced Role-Based Access Control (RBAC) spanning 5+ organizational roles and 20+ configurable permission levels",
              "Implemented intelligent attendance tracking, flexible leave calculation logic supporting multiple work models, and real-time WebSocket-based communication infrastructure",
              "Designed a scalable microservices architecture using Django, Celery, and Docker, implementing advanced security mechanisms including robust authentication and end-to-end encryption",
              "Optimized system performance through sophisticated task processing, comprehensive monitoring, and Redis-powered caching strategies"
            ]}
            imageUrl="/assets/images/project1.avif"
          />
          
          <ProjectCard 
            title="Data Operations Management"
            period="May - Dec 2024"
            technologies={["SpringAI", "React-Vite", "Tesseract", "SpringBoot", "JWT", "openCV", "Java"]}
            description={[
              "Developed a web-based data extraction and quality assurance system using Spring Boot and React Vite, improving workflow efficiency, tracking ongoing projects, and optimizing task management processes",
              "Implemented role-based access control (RBAC) with JWT for secure user management, enhancing data security", 
              "Integrated Tesseract OCR for automated data extraction, with plans to incorporate AI-driven quality checks to further enhance accuracy and efficiency over large datasets",
              "Prepared the software for future deployment on AWS, designing for reliability, scalability, and growth potential"
            ]}
            imageUrl="/assets/images/project-thumbnails/data-operations.jpg"
          />
          
          <ProjectCard 
            title="Fashion Website"
            period="Feb 2024 - Apr 2024"
            technologies={["Java", "MySQL", "React.js", "Spring Boot", "JWT", "API Development"]}
            description={[
              "Developed an e-commerce platform that seamlessly integrates Spring Boot backend with React frontend and MySQL database",
              "Implemented secure user authentication and authorization using JWT for protected shopping experiences",
              "Built comprehensive RESTful API endpoints for product management, user accounts, and order processing",
              "Designed for future integration with payment gateways to enhance transaction capabilities"
            ]}
            imageUrl="/assets/images/project-thumbnails/fashion-website.jpg"
          />
          
          <ProjectCard 
            title="Crop Disease Detection System"
            period="2023"
            technologies={["Python", "OpenCV", "YOLOv5", "PyTorch", "Raspberry Pi", "Roboflow"]}
            description={[
              "Developed a cost-effective crop disease detection system using YOLOv5 algorithm optimized for deployment on Raspberry Pi 4",
              "Trained custom computer vision models to identify multiple crop diseases with high accuracy in field conditions",
              "Implemented efficient image processing pipelines using OpenCV to handle various lighting and environmental conditions",
              "Created a lightweight deployment solution that balances detection accuracy with the hardware constraints of embedded systems"
            ]}
            imageUrl="/assets/images/project-thumbnails/crop-disease.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export default Projects;
