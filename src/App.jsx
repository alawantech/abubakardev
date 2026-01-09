
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Courses from './components/Courses';
import CoursePage from './components/CoursePage';
import CourseLearning from './components/CourseLearning';
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
                <div className="course-content">
                  <Header />
                  <Dashboard />
                </div>
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

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/2348156853636"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        style={{
          position: 'fixed',
          bottom: '98px',
          right: '2px',
          zIndex: 2147483647,
          pointerEvents: 'auto'
        }}
        aria-label="Contact us on WhatsApp"
      >
        <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 group">
          <svg className="w-8 h-8 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
        </div>
      </a>

    </AuthProvider>
  );
}

export default App