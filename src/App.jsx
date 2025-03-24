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
    <div className="relative">
      <ThemeToggle />
      <VerticalNavigation />
      
      <section id="me" className="min-h-screen flex items-center justify-center">
        <h2 className="text-4xl">ME</h2>
        {/* Your content here */}
        <Hero/>
      </section>
      <section id="about" className="min-h-screen flex items-center justify-center">
        {/* Your content here */}
        <About/>
      </section>
      
      <section id="work" className="min-h-screen flex items-center justify-center">
        {/* Your content here */}
        <Work/>
      </section>
      
      <section id="skill" className="min-h-screen flex items-center justify-center">
        {/* Your content here */}
        <Skills/>
      </section>
      
      <section id="project" className="min-h-screen flex items-center justify-center">
        {/* Your content here */}
        <Projects/>
      </section>
      
      <section id="education" className="min-h-screen flex items-center justify-center">
        {/* Your content here */}
        <Education/>
      </section>


      <ScrollToTopButton/>

      
      
    </div>
  );
}

export default App;