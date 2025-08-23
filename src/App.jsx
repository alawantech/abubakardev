
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Links from './components/Links';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Header />
              <Hero />
              <Services />
              <Portfolio />
              <About />
              <Contact />
              <Footer />
            </div>
          }
        />
        <Route
          path="/services"
          element={
            <div className="App">
              <Header />
              <Services />
              <Footer />
            </div>
          }
        />
        <Route
          path="/portfolio"
          element={
            <div className="App">
              <Header />
              <Portfolio />
              <Footer />
            </div>
          }
        />
        <Route
          path="/courses"
          element={
            <div className="App">
              <Header />
              <Courses />
              <Footer />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div className="App">
              <Header />
              <About />
              <Footer />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div className="App">
              <Header />
              <Contact />
              <Footer />
            </div>
          }
        />
        <Route path="/links" element={<Links />} />
      </Routes>
    </Router>
  );
}

export default App