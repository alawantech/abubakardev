import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FaTrash, FaCheck, FaEnvelope, FaWhatsapp, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const SchoolInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const q = query(collection(db, 'schoolInquiries'), orderBy('submittedAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const inquiryData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                submittedAt: doc.data().submittedAt?.toDate()
            }));
            setInquiries(inquiryData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, 'schoolInquiries', id), {
                status: newStatus
            });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                await deleteDoc(doc(db, 'schoolInquiries', id));
            } catch (error) {
                console.error('Error deleting inquiry:', error);
            }
        }
    };

    const filteredInquiries = inquiries.filter(inquiry => {
        const matchesSearch = inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' || inquiry.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="school-inquiries-container">
            <div className="inquiries-header">
                <div className="header-info">
                    <h2>School Contact Inquiries</h2>
                    <p>Manage admission inquiries from the ZedroTech Academy landing page.</p>
                </div>

                <div className="header-actions">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by name, email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className="filter-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="enrolled">Enrolled</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Fetching inquiries...</p>
                </div>
            ) : filteredInquiries.length === 0 ? (
                <div className="empty-state">
                    <FaEnvelope className="empty-icon" />
                    <h3>No inquiries found</h3>
                    <p>When students fill the school contact form, they will appear here.</p>
                </div>
            ) : (
                <div className="inquiries-list">
                    <AnimatePresence>
                        {filteredInquiries.map((inquiry) => (
                            <motion.div
                                key={inquiry.id}
                                className={`inquiry-card status-${inquiry.status}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                layout
                            >
                                <div className="card-header">
                                    <div className="sender-info">
                                        <h3>{inquiry.name}</h3>
                                        <div className="contact-links">
                                            <a href={`mailto:${inquiry.email}`} title="Email Student"><FaEnvelope /> {inquiry.email}</a>
                                            <a href={`https://wa.me/${inquiry.whatsapp}`} target="_blank" rel="noopener noreferrer" title="WhatsApp Student"><FaWhatsapp /> {inquiry.whatsapp}</a>
                                        </div>
                                    </div>
                                    <div className="submission-meta">
                                        <span><FaCalendarAlt /> {inquiry.submittedAt?.toLocaleString() || 'Recent'}</span>
                                        <span className={`status-pill ${inquiry.status}`}>{inquiry.status}</span>
                                    </div>
                                </div>

                                <div className="card-content">
                                    <div className="content-group">
                                        <label>Learning Goals</label>
                                        <p>{inquiry.message}</p>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <div className="status-buttons">
                                        <button
                                            className={`status-btn contact ${inquiry.status === 'contacted' ? 'active' : ''}`}
                                            onClick={() => handleStatusUpdate(inquiry.id, 'contacted')}
                                        >
                                            Mark as Contacted
                                        </button>
                                        <button
                                            className={`status-btn enroll ${inquiry.status === 'enrolled' ? 'active' : ''}`}
                                            onClick={() => handleStatusUpdate(inquiry.id, 'enrolled')}
                                        >
                                            Mark as Enrolled
                                        </button>
                                    </div>
                                    <button className="delete-btn" onClick={() => handleDelete(inquiry.id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default SchoolInquiries;
