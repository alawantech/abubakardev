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
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
            <h2>Welcome to Admin Dashboard</h2>
            <p>You have admin access to this system.</p>
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
    <div className="admin-dashboard pt-32">
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
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon">📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            <span className="nav-icon">📚</span>
            {sidebarOpen && <span>Courses</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <span className="nav-icon">👥</span>
            {sidebarOpen && <span>Students</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <span className="nav-icon">📩</span>
            {sidebarOpen && <span>Inquiries</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="nav-icon">⚙️</span>
            {sidebarOpen && <span>Profile</span>}
          </button>
          <button
            className={`nav-item ${activeTab === 'links' ? 'active' : ''}`}
            onClick={() => setActiveTab('links')}
          >
            <span className="nav-icon">🔗</span>
            {sidebarOpen && <span>Links</span>}
          </button>
        </nav>
      </div>

      <div className="admin-main">
        <div className="admin-header">
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
