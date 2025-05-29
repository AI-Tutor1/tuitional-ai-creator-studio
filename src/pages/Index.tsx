
import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import QuestionBuilder from '../components/QuestionBuilder';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <QuestionBuilder />
      <Footer />
    </div>
  );
};

export default Index;
