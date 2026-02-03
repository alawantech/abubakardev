
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
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

// Eager load Home components
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Links from './components/Links';
import Chatbot from './components/chatbot/Chatbot';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import './App.css';


function App() {
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
              path="/chatbot"
              element={<Chatbot />}
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
        </React.Suspense>
        <FloatingWhatsApp />
      </Router>

    </AuthProvider>
  );
}

export default App