import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import SchoolHeader from './components/SchoolHeader';
import Footer from './components/Footer';
import SchoolFooter from './components/SchoolFooter';
import Contact from './components/Contact';
import SchoolContact from './components/SchoolContact';
import About from './components/About';
import SchoolAbout from './components/SchoolAbout';
import SchoolLanding from './components/SchoolLanding';
import Links from './components/Links';
import Chatbot from './components/chatbot/Chatbot';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import { isSchoolSubdomain } from './utils/hostname';
import './App.css';

// Lazy load pages for better performance
const Courses = React.lazy(() => import('./components/Courses'));
const CoursePage = React.lazy(() => import('./components/CoursePage'));
const CourseLearning = React.lazy(() => import('./components/CourseLearning'));
const CourseSignUp = React.lazy(() => import('./components/CourseSignUp'));
const CoursePayment = React.lazy(() => import('./components/CoursePayment'));
const CourseDashboard = React.lazy(() => import('./components/CourseDashboard'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const RenewPayment = React.lazy(() => import('./components/RenewPayment'));
const Pricing = React.lazy(() => import('./components/Pricing'));
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const ExtendSubscription = React.lazy(() => import('./components/ExtendSubscription'));

function App() {
  const isSchool = isSchoolSubdomain();
  const NavHeader = isSchool ? SchoolHeader : Header;
  const NavFooter = isSchool ? SchoolFooter : Footer;
  const NavContact = isSchool ? SchoolContact : Contact;
  const NavAbout = isSchool ? SchoolAbout : About;

  // School-only routes protector
  const SchoolRoute = ({ children }) => {
    if (!isSchool && !window.location.hostname.includes('localhost')) {
      // In production, redirect to school subdomain if trying to access school routes on main domain
      window.location.href = `https://school.zdrotech.com${window.location.pathname}`;
      return null;
    }
    return children;
  };

  return (
    <AuthProvider>
      <Router>
        <React.Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route
              path="/"
              element={
                <div className="App">
                  <NavHeader />
                  {isSchool ? <SchoolLanding /> : (
                    <>
                      <Hero />
                      <Services />
                      <Portfolio />
                      <About />
                      <Contact />
                    </>
                  )}
                  <NavFooter />
                </div>
              }
            />
            <Route
              path="/services"
              element={
                <div className="App">
                  <NavHeader />
                  <Services />
                  <NavFooter />
                </div>
              }
            />
            <Route
              path="/chatbot"
              element={<Chatbot />}
            />
            <Route
              path="/portfolio"
              element={
                <div className="App">
                  <NavHeader />
                  <Portfolio />
                  <NavFooter />
                </div>
              }
            />
            <Route
              path="/about"
              element={
                <div className="App">
                  <NavHeader />
                  <NavAbout />
                  <NavFooter />
                </div>
              }
            />
            <Route
              path="/courses"
              element={
                <SchoolRoute>
                  <div className="App">
                    <div className="course-content">
                      <NavHeader />
                      <Courses />
                    </div>
                    <NavFooter />
                  </div>
                </SchoolRoute>
              }
            />
            <Route
              path="/course/:courseId"
              element={
                <SchoolRoute>
                  <div className="App">
                    <div className="course-content">
                      <NavHeader />
                      <CoursePage />
                    </div>
                    <NavFooter />
                  </div>
                </SchoolRoute>
              }
            />
            <Route
              path="/course/:courseId/learn"
              element={
                <SchoolRoute>
                  <div className="App">
                    <CourseLearning />
                  </div>
                </SchoolRoute>
              }
            />
            <Route
              path="/course/:courseId/signup"
              element={
                <SchoolRoute>
                  <div className="App">
                    <div className="course-content">
                      <NavHeader />
                      <CourseSignUp />
                    </div>
                  </div>
                </SchoolRoute>
              }
            />
            <Route
              path="/course/:courseId/payment"
              element={
                <SchoolRoute>
                  <div className="App">
                    <div className="course-content">
                      <NavHeader />
                      <CoursePayment />
                    </div>
                  </div>
                </SchoolRoute>
              }
            />
            <Route
              path="/course/:courseId/dashboard"
              element={
                <SchoolRoute>
                  <div className="App">
                    <div className="course-content">
                      <NavHeader />
                      <CourseDashboard />
                    </div>
                  </div>
                </SchoolRoute>
              }
            />
            <Route
              path="/about"
              element={
                <div className="App">
                  <NavHeader />
                  <About />
                  <NavFooter />
                </div>
              }
            />
            <Route
              path="/contact"
              element={
                <div className="App">
                  <NavHeader />
                  <NavContact />
                  <NavFooter />
                </div>
              }
            />
            <Route path="/links" element={<Links />} />
            <Route
              path="/pricing"
              element={
                <div className="App">
                  <NavHeader />
                  <Pricing />
                  <NavFooter />
                </div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route
              path="/dashboard"
              element={
                <SchoolRoute>
                  <div className="App">
                    <div className="course-content">
                      <NavHeader />
                      <Dashboard />
                    </div>
                  </div>
                </SchoolRoute>
              }
            />
            <Route
              path="/renew-payment"
              element={
                <SchoolRoute>
                  <div className="App">
                    <NavHeader />
                    <RenewPayment />
                  </div>
                </SchoolRoute>
              }
            />
            <Route
              path="/extend-subscription"
              element={
                <SchoolRoute>
                  <div className="App">
                    <NavHeader />
                    <ExtendSubscription />
                  </div>
                </SchoolRoute>
              }
            />
          </Routes>
        </React.Suspense>
        <FloatingWhatsApp />
      </Router>
    </AuthProvider>
  );
}

export default App;