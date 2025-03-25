// Projects.jsx
import React from 'react';
import SectionHeading from '../common/SectionHeading';
import ProjectCard from '../common/ProjectCard';

const Projects = () => {
  return (
    <section id="project" className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Projects" />
        
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <ProjectCard 
            title="APS Portal: Employee Management System"
            period="2024 – Present"
            technologies={["Python", "Django", "PostgreSQL", "Celery", "Docker"]}
            description={[
              "Designed and implemented a role-based access control (RBAC) system to streamline user management across Admin, Manager, HR, Employee, and Client roles",
              "Developed dynamic attendance and leave management systems, automating tracking and requests for improved employee oversight",
              "Utilized Celery for asynchronous notifications and task processing, paired with Docker for scalable, containerized deployment ensuring high availability",
              "Built a real-time chat system for personal and group communication with permission controls for secure collaboration, restricting group creation to Managers and Admins"
            ]}
            imageUrl="/assets/images/project-thumbnails/aps-portal.jpg"
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
        </div>
      </div>
    </section>
  );
};

export default Projects;
