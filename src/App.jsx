import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react'

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Model from './components/Model';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';


const App = () => {
  // Initialize Lenis and define scroll behavior
  const lenis = useLenis(({ scroll }) => {
    // Add any scroll-related logic here if needed
  });

  // Optional: To make sure Lenis updates properly when the component mounts
  useEffect(() => {
    lenis?.start(); // Start Lenis scroll animation loop
    return () => {
      lenis?.stop(); // Clean up when component unmounts
    };
  }, [lenis]);

  return (
    <ReactLenis root>
      <main className="bg-black">
        <Navbar />
        <Hero />
        <Highlights />
        <Model />
        <Features />
        <HowItWorks />
        <Footer />
      </main>
    </ReactLenis>
  );
};

export default App;
