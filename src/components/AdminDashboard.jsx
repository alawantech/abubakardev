import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import CourseManagement from './CourseManagement';
import StudentManagement from './StudentManagement';
import InquiriesManagement from './SchoolInquiries';
import AdminProfile from './AdminProfile';
import LinksManagement from './LinksManagement';
import './SchoolInquiries.css';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
      else setSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return (
      <div className="admin-dashboard pt-32">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Will redirect
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-home">
            <div className="dashboard-greeting">
              <h2>Welcome back, <span className="admin-name">{currentUser?.displayName || 'Admin'}</span></h2>
              <p>Here's what's happening in your school today.</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon students">👥</div>
                <div className="stat-info">
                  <span className="label">Total Students</span>
                  <span className="value">Active</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon courses">📚</div>
                <div className="stat-info">
                  <span className="label">Courses</span>
                  <span className="value">Published</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon revenue">💰</div>
                <div className="stat-info">
                  <span className="label">Revenue</span>
                  <span className="value">Growth</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon inquiries">📩</div>
                <div className="stat-info">
                  <span className="label">New Inquiries</span>
                  <span className="value">Pending</span>
                </div>
              </div>
            </div>

            <div className="dashboard-actions">
              <h3>Quick Actions</h3>
              <div className="action-grid">
                <button onClick={() => setActiveTab('courses')} className="action-item">Manage Courses</button>
                <button onClick={() => setActiveTab('students')} className="action-item">View Students</button>
                <button onClick={() => setActiveTab('inquiries')} className="action-item">Respond to Inquiries</button>
              </div>
            </div>
          </div>
        );
      case 'courses':
        return <CourseManagement />;
      case 'students':
        return <StudentManagement />;
      case 'inquiries':
        return <InquiriesManagement />;
      case 'profile':
        return <AdminProfile />;
      case 'links':
        return <LinksManagement />;
      default:
        return (
          <div className="dashboard-home">
            <h2>Welcome to Admin Dashboard</h2>
          </div>
        );
    }
  };

  return (
    <div className={`admin-dashboard pt-32 ${isMobile ? 'mobile' : ''}`}>
      {isMobile && sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <button
            className="toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
        <nav className="sidebar-nav">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'courses', label: 'Courses', icon: '📚' },
            { id: 'students', label: 'Students', icon: '👥' },
            { id: 'inquiries', label: 'Inquiries', icon: '📩' },
            { id: 'profile', label: 'Profile', icon: '⚙️' },
            { id: 'links', label: 'Links', icon: '🔗' },
          ].map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                if (isMobile) setSidebarOpen(false);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {(sidebarOpen || !isMobile) && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          {isMobile && (
            <button
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>
          )}
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
