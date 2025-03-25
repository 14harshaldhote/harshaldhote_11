import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import VerticalNavigation from './components/VerticalNavigation';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/sections/Hero';
import Work from './components/sections/Work';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import About from './components/sections/About';
import ScrollToTopButton from './components/common/ScrollToTopButton';

function App() {
  return (
    <div className="relative w-full">
      <ThemeToggle />
      <VerticalNavigation />
      
      <section id="me" className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-8 lg:px-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-0">ME</h2>
        <Hero/>
      </section>

      <section id="about" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
        <About/>
      </section>
      
      <section id="work" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
        <Work/>
      </section>
      
      <section id="skill" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
        <Skills/>
      </section>
      
      <section id="project" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
        <Projects/>
      </section>
      
      <section id="education" className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16">
        <Education/>
      </section>

      <ScrollToTopButton/>
    </div>
  );
}

export default App;