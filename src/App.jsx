import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { isSchoolSubdomain } from './utils/hostname';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// Eager-load shell components (shown on almost every page)
import Header from './components/Header';
import Footer from './components/Footer';
import SchoolHeader from './components/SchoolHeader';
import SchoolFooter from './components/SchoolFooter';

// Eager-load school-critical components (prevents blank page on navigation)
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';

// Lazy load page content
const Contact = React.lazy(() => import('./components/Contact'));
const SchoolContact = React.lazy(() => import('./components/SchoolContact'));
const About = React.lazy(() => import('./components/About'));
const SchoolAbout = React.lazy(() => import('./components/SchoolAbout'));
const SchoolLanding = React.lazy(() => import('./components/SchoolLanding'));
const Links = React.lazy(() => import('./components/Links'));
const Chatbot = React.lazy(() => import('./components/chatbot/Chatbot'));
const FloatingWhatsApp = React.lazy(() => import('./components/FloatingWhatsApp'));
const Hero = React.lazy(() => import('./components/Hero'));
const Services = React.lazy(() => import('./components/Services'));
const AIAutomation = React.lazy(() => import('./components/AIAutomation'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const TrustBar = React.lazy(() => import('./components/TrustBar'));
const Process = React.lazy(() => import('./components/Process'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const CTABanner = React.lazy(() => import('./components/CTABanner'));
const BookCall = React.lazy(() => import('./pages/BookCall'));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));

const CoursePage = React.lazy(() => import('./components/CoursePage'));
const CourseLearning = React.lazy(() => import('./components/CourseLearning'));
const CourseSignUp = React.lazy(() => import('./components/CourseSignUp'));
const CoursePayment = React.lazy(() => import('./components/CoursePayment'));
const CourseDashboard = React.lazy(() => import('./components/CourseDashboard'));
const RenewPayment = React.lazy(() => import('./components/RenewPayment'));
const Pricing = React.lazy(() => import('./components/Pricing'));
const PricingInquiryForm = React.lazy(() => import('./pages/PricingInquiryForm'));
const Register = React.lazy(() => import('./components/Register'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const ExtendSubscription = React.lazy(() => import('./components/ExtendSubscription'));

// Prefetch map: track which imports have been triggered
const prefetched = new Set();
const prefetch = (importFn) => {
  const key = importFn.toString();
  if (!prefetched.has(key)) {
    prefetched.add(key);
    importFn().catch(() => {});
  }
};

// Prefetch on hover for nav links
function PrefetchLink({ to, children, className, onClick }) {
  const handleMouseEnter = () => {
    const routeMap = {
      '/pricing': () => import('./components/Pricing'),
      '/register': () => import('./components/Register'),
      '/contact': () => import('./components/Contact'),
      '/about': () => import('./components/About'),
      '/portfolio': () => import('./components/Portfolio'),
      '/services': () => import('./components/Services'),
      '/book': () => import('./pages/BookCall'),
      '/login': () => import('./components/Login'),
    };
    if (routeMap[to]) prefetch(routeMap[to]);
  };
  return (
    <Link to={to} className={className} onMouseEnter={handleMouseEnter} onClick={onClick}>
      {children}
    </Link>
  );
}

function RouteAwareFloatingWhatsApp() {
  const { pathname } = useLocation();
  if (pathname === '/book') return null;
  return (
    <React.Suspense fallback={null}>
      <FloatingWhatsApp />
    </React.Suspense>
  );
}

function App() {
  const isSchool = isSchoolSubdomain();
  const NavHeader = isSchool ? SchoolHeader : Header;
  const NavFooter = isSchool ? SchoolFooter : Footer;
  const NavContact = isSchool ? SchoolContact : Contact;
  const NavAbout = isSchool ? SchoolAbout : About;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isSchool) {
        prefetch(() => import('./components/CoursePage'));
        prefetch(() => import('./components/CourseLearning'));
        prefetch(() => import('./components/CourseSignUp'));
        prefetch(() => import('./components/CoursePayment'));
        prefetch(() => import('./components/CourseDashboard'));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isSchool]);

  const SchoolRoute = ({ children }) => {
    if (!isSchool && !window.location.hostname.includes('localhost')) {
      window.location.href = `https://school.zdrotech.com${window.location.pathname}`;
      return null;
    }
    return children;
  };

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <div className="App">
                <NavHeader />
                <React.Suspense fallback={null}>
                  {isSchool ? <SchoolLanding /> : (
                    <>
                      <Hero />
                      <TrustBar />
                      <Services />
                      <AIAutomation />
                      <Process />
                      <Portfolio />
                      <About />
                      <Testimonials />
                      <CTABanner />
                      <Contact />
                    </>
                  )}
                </React.Suspense>
                <NavFooter />
              </div>
            }
          />
          <Route
            path="/services"
            element={
              <div className="App">
                <NavHeader />
                <React.Suspense fallback={null}>
                  <Services />
                </React.Suspense>
                <NavFooter />
              </div>
            }
          />
          <Route
            path="/chatbot"
            element={
              <React.Suspense fallback={null}>
                <Chatbot />
              </React.Suspense>
            }
          />
          <Route
            path="/portfolio"
            element={
              <div className="App">
                <NavHeader />
                <React.Suspense fallback={null}>
                  <Portfolio />
                </React.Suspense>
                <NavFooter />
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <div className="App">
                <NavHeader />
                <React.Suspense fallback={null}>
                  <NavAbout />
                </React.Suspense>
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
                    <React.Suspense fallback={null}>
                      <CoursePage />
                    </React.Suspense>
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
                  <React.Suspense fallback={null}>
                    <CourseLearning />
                  </React.Suspense>
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
                    <React.Suspense fallback={null}>
                      <CourseSignUp />
                    </React.Suspense>
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
                    <React.Suspense fallback={null}>
                      <CoursePayment />
                    </React.Suspense>
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
                    <React.Suspense fallback={null}>
                      <CourseDashboard />
                    </React.Suspense>
                  </div>
                </div>
              </SchoolRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="App">
                <NavHeader />
                <React.Suspense fallback={null}>
                  <NavContact />
                </React.Suspense>
                <NavFooter />
              </div>
            }
          />
          <Route path="/links" element={
            <React.Suspense fallback={null}>
              <Links />
            </React.Suspense>
          } />
          <Route
            path="/pricing"
            element={
              <div className="App">
                <NavHeader />
                <React.Suspense fallback={null}>
                  <Pricing />
                </React.Suspense>
                <NavFooter />
              </div>
            }
          />
          <Route
            path="/pricing/inquire"
            element={
              <div className="App bc-chrome-hidden">
                <React.Suspense fallback={null}>
                  <PricingInquiryForm />
                </React.Suspense>
              </div>
            }
          />
          <Route path="/login" element={
            <div className="App">
              <NavHeader />
              <Login />
            </div>
          } />
          <Route
            path="/book"
            element={
              <div className="App bc-chrome-hidden">
                <React.Suspense fallback={null}>
                  <BookCall />
                </React.Suspense>
              </div>
            }
          />
          <Route
            path="/terms"
            element={
              <div className="App">
                <React.Suspense fallback={null}>
                  <TermsAndConditions />
                </React.Suspense>
              </div>
            }
          />
          <Route
            path="/privacy"
            element={
              <div className="App">
                <React.Suspense fallback={null}>
                  <PrivacyPolicy />
                </React.Suspense>
              </div>
            }
          />
          <Route path="/register" element={
            <React.Suspense fallback={null}>
              <Register />
            </React.Suspense>
          } />
          <Route path="/admin" element={
            <React.Suspense fallback={null}>
              <AdminDashboard />
            </React.Suspense>
          } />
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
                  <React.Suspense fallback={null}>
                    <RenewPayment />
                  </React.Suspense>
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
                  <React.Suspense fallback={null}>
                    <ExtendSubscription />
                  </React.Suspense>
                </div>
              </SchoolRoute>
            }
          />
        </Routes>
        <RouteAwareFloatingWhatsApp />
      </Router>
    </AuthProvider>
  );
}

export { PrefetchLink };
export default App;
