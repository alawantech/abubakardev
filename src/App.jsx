
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Courses from './components/Courses';
import CoursePage from './components/CoursePage';
import CourseLearning from './components/CourseLearning';
import CoursePricing from './components/CoursePricing';
import CourseSignUp from './components/CourseSignUp';
import CoursePayment from './components/CoursePayment';
import CourseDashboard from './components/CourseDashboard';
import Dashboard from './components/Dashboard';
import RenewPayment from './components/RenewPayment';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Links from './components/Links';
import Pricing from './components/Pricing';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import ExtendSubscription from './components/ExtendSubscription';
import './App.css';


function App() {
  return (
    <AuthProvider>
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
              <div className="course-content">
                <Header />
                <Courses />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/course/:courseId"
          element={
            <div className="App">
              <div className="course-content">
                <Header />
                <CoursePage />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/course/:courseId/learn"
          element={
            <div className="App">
              <CourseLearning />
            </div>
          }
        />
        <Route
          path="/course/:courseId/pricing"
          element={
            <div className="App">
              <div className="course-content">
                <Header />
                <CoursePricing />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/course/:courseId/signup"
          element={
            <div className="App">
              <div className="course-content">
                <Header />
                <CourseSignUp />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/course/:courseId/payment"
          element={
            <div className="App">
              <div className="course-content">
                <Header />
                <CoursePayment />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/course/:courseId/dashboard"
          element={
            <div className="App">
              <div className="course-content">
                <Header />
                <CourseDashboard />
              </div>
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
        <Route
          path="/pricing"
          element={
            <div className="App">
              <Header />
              <Pricing />
              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route 
          path="/dashboard" 
          element={
            <div className="App">
              <Header />
              <Dashboard />
              <Footer />
            </div>
          } 
        />
        <Route 
          path="/renew-payment" 
          element={
            <div className="App">
              <Header />
              <RenewPayment />
              <Footer />
            </div>
          } 
        />
        <Route 
          path="/extend-subscription" 
          element={
            <div className="App">
              <Header />
              <ExtendSubscription />
              <Footer />
            </div>
          } 
        />
      </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App