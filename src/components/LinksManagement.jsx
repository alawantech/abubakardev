import React, { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    orderBy,
    query
} from 'firebase/firestore';
import { db } from '../firebase';
import {
    FaGlobe,
    FaServicestack,
    FaWhatsapp,
    FaLightbulb,
    FaBusinessTime,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaGithub,
    FaYoutube,
    FaEnvelope,
    FaPhone,
    FaLink,
    FaGraduationCap,
    FaSchool,
    FaBook,
    FaChalkboardTeacher,
    FaLaptopCode,
    FaCertificate,
    FaTrash,
    FaEdit,
    FaPlus,
    FaSave as FaSaveIcon,
    FaTimes as FaTimesIcon
} from 'react-icons/fa';
import './LinksManagement.css';

const ICON_OPTIONS = {
    FaGlobe: <FaGlobe />,
    FaServicestack: <FaServicestack />,
    FaWhatsapp: <FaWhatsapp />,
    FaLightbulb: <FaLightbulb />,
    FaBusinessTime: <FaBusinessTime />,
    FaFacebook: <FaFacebook />,
    FaTwitter: <FaTwitter />,
    FaInstagram: <FaInstagram />,
    FaLinkedin: <FaLinkedin />,
    FaGithub: <FaGithub />,
    FaYoutube: <FaYoutube />,
    FaEnvelope: <FaEnvelope />,
    FaPhone: <FaPhone />,
    FaLink: <FaLink />,
    FaGraduationCap: <FaGraduationCap />,
    FaSchool: <FaSchool />,
    FaBook: <FaBook />,
    FaChalkboardTeacher: <FaChalkboardTeacher />,
    FaLaptopCode: <FaLaptopCode />,
    FaCertificate: <FaCertificate />
};

const LinksManagement = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentLink, setCurrentLink] = useState(null);

    const [dragItemIndex, setDragItemIndex] = useState(null);
    const [dragOverItemIndex, setDragOverItemIndex] = useState(null);
    const [isReordering, setIsReordering] = useState(false);

    const [formData, setFormData] = useState({
        label: '',
        url: '',
        iconName: 'FaLink',
        description: ''
    });

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        setLoading(true);
        try {
            const q = collection(db, 'quick_links');
            const querySnapshot = await getDocs(q);
            const linksData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                order: doc.data().order !== undefined ? doc.data().order : 99999,
                ...doc.data()
            }));

            // Sort by order, then by createdAt to keep it consistent
            linksData.sort((a, b) => {
                if (a.order !== b.order) return a.order - b.order;
                const timeA = a.createdAt?.toMillis() || 0;
                const timeB = b.createdAt?.toMillis() || 0;
                return timeB - timeA;
            });

            setLinks(linksData);
        } catch (error) {
            console.error("Error fetching links:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleIconSelect = (iconName) => {
        setFormData(prev => ({ ...prev, iconName }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.label || !formData.url) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            if (isEditing && currentLink) {
                const linkRef = doc(db, 'quick_links', currentLink.id);
                await updateDoc(linkRef, {
                    ...formData,
                    updatedAt: serverTimestamp()
                });
                alert("Link updated successfully!");
            } else {
                await addDoc(collection(db, 'quick_links'), {
                    ...formData,
                    order: links.length,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                });
                alert("Link added successfully!");
            }

            resetForm();
            fetchLinks();
        } catch (error) {
            console.error("Error saving link:", error);
            alert("Error saving link. Please try again.");
        }
    };

    const handleEdit = (link) => {
        setCurrentLink(link);
        setFormData({
            label: link.label,
            url: link.url,
            iconName: link.iconName || 'FaLink',
            description: link.description || ''
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this link?")) {
            try {
                await deleteDoc(doc(db, 'quick_links', id));
                fetchLinks();
            } catch (error) {
                console.error("Error deleting link:", error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            label: '',
            url: '',
            iconName: 'FaLink',
            description: ''
        });
        setIsEditing(false);
        setCurrentLink(null);
    };

    const handleDragStart = (e, index) => {
        setDragItemIndex(index);
        e.dataTransfer.effectAllowed = "move";
        // Slightly delay to allow the ghost image to render before hiding the original item
        setTimeout(() => e.target.classList.add('dragging'), 0);
    };

    const handleDragEnter = (e, index) => {
        e.preventDefault();
        setDragOverItemIndex(index);
    };

    const handleDragEnd = async (e) => {
        e.preventDefault();
        e.target.classList.remove('dragging');

        if (dragItemIndex === null || dragOverItemIndex === null || dragItemIndex === dragOverItemIndex) {
            setDragItemIndex(null);
            setDragOverItemIndex(null);
            return;
        }

        const newLinks = [...links];
        const draggedItem = newLinks[dragItemIndex];
        newLinks.splice(dragItemIndex, 1);
        newLinks.splice(dragOverItemIndex, 0, draggedItem);

        setLinks(newLinks); // Optimistic UI update
        setDragItemIndex(null);
        setDragOverItemIndex(null);
        setIsReordering(true);

        try {
            // Update order in Firestore
            const updatePromises = newLinks.map((link, index) => {
                const linkRef = doc(db, 'quick_links', link.id);
                return updateDoc(linkRef, { order: index });
            });
            await Promise.all(updatePromises);
        } catch (error) {
            console.error("Error updating link order:", error);
            alert("Failed to save new order. Reverting...");
            fetchLinks(); // Revert on failure
        } finally {
            setIsReordering(false);
        }
    };

    return (
        <div className="links-management">
            <div className="management-header">
                <h2>Quick Links Management</h2>
                <p>Manage the links that appear on the /links page.</p>
            </div>

            <div className="management-grid">
                <div className="form-section">
                    <div className="card">
                        <h3>{isEditing ? "Edit Link" : "Add New Link"}</h3>
                        <form onSubmit={handleSubmit} className="link-form">
                            <div className="form-group">
                                <label>Label *</label>
                                <input
                                    type="text"
                                    name="label"
                                    value={formData.label}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Visit Our Website"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>URL *</label>
                                <input
                                    type="text"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleInputChange}
                                    placeholder="e.g., https://example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description (Optional)</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Explore our main digital home"
                                />
                            </div>

                            <div className="form-group">
                                <label>Select Icon</label>
                                <div className="icon-selector">
                                    {Object.keys(ICON_OPTIONS).map(iconName => (
                                        <button
                                            key={iconName}
                                            type="button"
                                            className={`icon-option ${formData.iconName === iconName ? 'active' : ''}`}
                                            onClick={() => handleIconSelect(iconName)}
                                            title={iconName}
                                        >
                                            {ICON_OPTIONS[iconName]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-save">
                                    {isEditing ? <><FaSaveIcon /> Update Link</> : <><FaPlus /> Add Link</>}
                                </button>
                                {isEditing && (
                                    <button type="button" className="btn-cancel" onClick={resetForm}>
                                        <FaTimesIcon /> Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="list-section">
                    <div className="card">
                        <h3>Current Links</h3>
                        {loading ? (
                            <div className="loading-state">Loading links...</div>
                        ) : links.length === 0 ? (
                            <div className="empty-state">No links found. Add your first link!</div>
                        ) : (
                            <div className={`links-admin-list ${isReordering ? 'reordering' : ''}`}>
                                {isReordering && <div className="reordering-overlay">Saving new order...</div>}
                                {links.map((link, index) => (
                                    <div
                                        key={link.id}
                                        className={`link-admin-item ${dragOverItemIndex === index ? 'drag-over' : ''}`}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragEnter={(e) => handleDragEnter(e, index)}
                                        onDragEnd={handleDragEnd}
                                        onDragOver={(e) => e.preventDefault()}
                                    >
                                        <div className="link-info-main">
                                            <div className="link-icon-preview drag-handle" title="Drag to reorder">
                                                <span className="drag-indicator">⋮⋮</span> {ICON_OPTIONS[link.iconName] || <FaLink />}
                                            </div>
                                            <div className="link-details">
                                                <span className="link-label">{link.label}</span>
                                                <span className="link-url">{link.url}</span>
                                            </div>
                                        </div>
                                        <div className="link-admin-actions">
                                            <button className="btn-icon-edit" onClick={() => handleEdit(link)}>
                                                <FaEdit />
                                            </button>
                                            <button className="btn-icon-delete" onClick={() => handleDelete(link.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinksManagement;
