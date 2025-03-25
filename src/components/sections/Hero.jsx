// Hero.jsx (ME section)
import React, { useState, useEffect } from 'react';
import img3 from '../../assets/images/img3.jpg';

const Hero = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  
  const openModal = () => {
    setShowContactInfo(true);
    setTimeout(() => {
      setModalAnimation(true);
    }, 10);
  };

  const closeModal = () => {
    setModalAnimation(false);
    setTimeout(() => {
      setShowContactInfo(false);
    }, 300); // Match this with the CSS transition duration
  };

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) closeModal();
    };
    
    if (showContactInfo) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showContactInfo]);

  return (
    <section id="me" 
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative py-12 sm:py-16 md:py-20"
    >
      <div className="container mx-auto max-w-4xl text-center lg:text-left lg:flex lg:items-center lg:justify-between relative z-10 gap-8">
        <div className="lg:w-1/2 space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-heading)]">
            Hi, I'm <span className="text-[var(--accent-primary)]">Harshal Dhote</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[var(--text-heading)]">Full-Stack Developer</h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-primary)]">
            Specialized in building user-friendly interfaces and scalable systems with expertise 
            in both front-end and back-end technologies.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
            <button 
              onClick={openModal}
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[var(--button-bg)] border-2 border-[var(--accent-primary)] text-[var(--text-heading)] rounded-lg hover:border-[var(--button-border-hover)] transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </button>
            <a 
              href="/assets/resume/Harshal_Dhote_Resume.pdf" 
              className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-transparent border-2 border-[var(--accent-primary)] text-[var(--text-heading)] rounded-lg hover:bg-[var(--button-bg)] hover:border-[var(--button-border-hover)] transition-all duration-300 hover:scale-105" 
              download
            >
              Download CV
            </a>
          </div>
        </div>

        {/* Image visible on all screens but repositioned */}
        <div className="mt-8 lg:mt-0 lg:w-2/5">
          <img 
            src={img3}
            alt="Harshal Dhote" 
            className="rounded-full w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 lg:w-64 lg:h-64 mx-auto object-cover border-4 border-[var(--accent-primary)] shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 flex gap-4 sm:gap-6 justify-center relative z-10">
        <a 
          href="mailto:dhoteharshal16@gmail.com" 
          aria-label="Email" 
          className="text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z"/>
          </svg>
        </a>
        <a 
          href="https://www.linkedin.com/in/harshal-dhote-6929b7211/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="LinkedIn" 
          className="text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h14c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z M9,17H6.477v-7H9V17z M7.694,8.717c-0.771,0-1.286-0.514-1.286-1.2s0.514-1.2,1.371-1.2c0.771,0,1.286,0.514,1.286,1.2S8.551,8.717,7.694,8.717z M18,17h-2.442v-3.826c0-1.058-0.651-1.302-0.895-1.302s-1.058,0.163-1.058,1.302c0,0.163,0,3.826,0,3.826h-2.523v-7h2.523v0.977C13.93,10.407,14.581,10,15.802,10C17.023,10,18,10.977,18,13.174V17z"/>
          </svg>
        </a>
        <a 
          href="https://github.com/14harshaldhote" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="GitHub"
          className="text-[var(--text-primary)] hover:text-[var(--accent-hover)] transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"/>
          </svg>
        </a>
      </div>

      {/* Contact Modal with smooth animations */}
      {showContactInfo && (
        <div 
          className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-50 flex items-center justify-center p-4 ${modalAnimation ? 'bg-opacity-50 backdrop-blur-sm' : 'bg-opacity-0'}`}
          onClick={closeModal}
        >
          <div 
            className={`bg-[var(--button-bg)] p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-500 ease-in-out ${modalAnimation ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-0 -rotate-3'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] flex items-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 mr-2 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                Connect With Me
              </h3>
              <button 
                onClick={closeModal}
                className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors p-2 rounded-full hover:bg-opacity-20 hover:bg-[var(--accent-primary)]"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center group p-2 sm:p-3 hover:bg-opacity-10 hover:bg-[var(--accent-primary)] rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="mr-3 sm:mr-4 p-2 sm:p-3 bg-[var(--accent-primary)] bg-opacity-10 rounded-full group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-heading)] text-sm sm:text-base">Phone</p>
                  <p className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors text-sm sm:text-base">+91 9657889839</p>
                </div>
              </div>

              <div className="flex items-center group p-2 sm:p-3 hover:bg-opacity-10 hover:bg-[var(--accent-primary)] rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="mr-3 sm:mr-4 p-2 sm:p-3 bg-[var(--accent-primary)] bg-opacity-10 rounded-full group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-heading)] text-sm sm:text-base">Email</p>
                  <a 
                    href="mailto:dhoteharshal16@gmail.com" 
                    className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors text-sm sm:text-base"
                  >
                    dhoteharshal16@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center group p-2 sm:p-3 hover:bg-opacity-10 hover:bg-[var(--accent-primary)] rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="mr-3 sm:mr-4 p-2 sm:p-3 bg-[var(--accent-primary)] bg-opacity-10 rounded-full group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-heading)] text-sm sm:text-base">GitHub</p>
                  <a 
                    href="https://github.com/14harshaldhote" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors flex items-center text-sm sm:text-base"
                  >
                    github.com/14harshaldhote
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex items-center group p-2 sm:p-3 hover:bg-opacity-10 hover:bg-[var(--accent-primary)] rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="mr-3 sm:mr-4 p-2 sm:p-3 bg-[var(--accent-primary)] bg-opacity-10 rounded-full group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[var(--text-heading)] text-sm sm:text-base">LinkedIn</p>
                  <a 
                    href="https://www.linkedin.com/in/harshal-dhote-6929b7211/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors flex items-center text-sm sm:text-base"
                  >
                    Harshal Dhote
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 text-center">
              <button
                onClick={closeModal}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-[var(--accent-primary)] text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center mx-auto"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;