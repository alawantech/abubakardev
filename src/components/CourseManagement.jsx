import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { MdDragIndicator } from 'react-icons/md';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CourseManagement.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState('list'); // 'list', 'create-course', 'edit-course', 'manage-curriculum'
  const [currentCourse, setCurrentCourse] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    visibility: 'public',
    featuredImage: '',
    introVideoUrl: '',
    pricingModel: 'free',
    price: '',
    topics: [],
    // New fields
    whatYouWillLearn: [],
    targetAudience: [],
    courseDurationMonths: 0,
    materialsIncluded: [],
    requirements: []
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'courses'));
      const coursesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSaveCourse = async () => {
    try {
      if (!courseData.title) {
        alert('Please enter a course title');
        return;
      }

      // Filter out empty lines before saving
      const cleanedData = {
        title: courseData.title,
        description: courseData.description,
        visibility: courseData.visibility,
        featuredImage: courseData.featuredImage,
        introVideoUrl: courseData.introVideoUrl,
        pricingModel: courseData.pricingModel,
        price: courseData.price,
        topics: courseData.topics, // Include topics/curriculum
        whatYouWillLearn: courseData.whatYouWillLearn.filter(item => item.trim() !== ''),
        targetAudience: courseData.targetAudience.filter(item => item.trim() !== ''),
        courseDurationMonths: courseData.courseDurationMonths,
        materialsIncluded: courseData.materialsIncluded.filter(item => item.trim() !== ''),
        requirements: courseData.requirements.filter(item => item.trim() !== '')
      };

      if (currentCourse) {
        // Update existing course
        await updateDoc(doc(db, 'courses', currentCourse.id), {
          ...cleanedData,
          updatedAt: serverTimestamp()
        });
        alert('Course updated successfully!');
        setView('list');
      } else {
        // Add new course
        await addDoc(collection(db, 'courses'), {
          ...cleanedData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        alert('Course created successfully!');
        setView('list');
      }

      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Error saving course. Please try again.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteDoc(doc(db, 'courses', courseId));
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const [activeTopicIndex, setActiveTopicIndex] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [tempLesson, setTempLesson] = useState({ name: '', videoUrl: '', description: '' });

  // ... existing fetchCourses, handleDeleteCourse ...

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setCourseData({
      title: course.title,
      description: course.description,
      visibility: course.visibility || 'public',
      featuredImage: course.featuredImage || '',
      introVideoUrl: course.introVideoUrl || '',
      pricingModel: course.pricingModel || 'free',
      price: course.price || '',
      topics: course.topics || [],
      whatYouWillLearn: course.whatYouWillLearn || [],
      targetAudience: course.targetAudience || [],
      courseDurationMonths: course.courseDurationMonths || 0,
      materialsIncluded: course.materialsIncluded || [],
      requirements: course.requirements || []
    });
    setImageFile(null);
    setUploadingImage(false);
    setView('edit-course');
  };

  const handleManageContent = (course) => {
    // Ensure all lessons have IDs for drag and drop
    const topicsWithIds = (course.topics || []).map(topic => ({
      ...topic,
      lessons: (topic.lessons || []).map(lesson => ({
        ...lesson,
        id: lesson.id || Date.now() + Math.random().toString(36).substr(2, 9)
      }))
    }));

    setCurrentCourse(course);
    setCourseData({
      ...course, // Keep all course data
      topics: topicsWithIds, // Ensure topics array exists and has IDs
    });
    setView('manage-curriculum');
  };

  const saveCurriculumChanges = async () => {
    try {
      if (!currentCourse) return;

      const courseRef = doc(db, 'courses', currentCourse.id);
      await updateDoc(courseRef, {
        topics: courseData.topics,
        updatedAt: serverTimestamp()
      });

      alert('Curriculum saved successfully!');
      // Update local courses state to reflect changes
      const updatedCourses = courses.map(c =>
        c.id === currentCourse.id ? { ...c, topics: courseData.topics } : c
      );
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error saving curriculum:', error);
      alert('Error saving curriculum. Please try again.');
    }
  };

  const openAddLessonModal = (topicIndex) => {
    setActiveTopicIndex(topicIndex);
    setTempLesson({ name: '', videoUrl: '', description: '' });
    setEditingLesson(null); // null means creating new
    setShowLessonModal(true);
  };

  const openEditLessonModal = (topicIndex, lesson, lessonIndex) => {
    setActiveTopicIndex(topicIndex);
    setEditingLesson(lessonIndex); // index of lesson being edited
    setTempLesson({ ...lesson });
    setShowLessonModal(true);
  };

  const saveLessonFromModal = () => {
    if (!tempLesson.name) {
      alert('Lesson name is required');
      return;
    }

    const updatedTopics = [...courseData.topics];

    if (editingLesson !== null) {
      // Update existing lesson
      updatedTopics[activeTopicIndex].lessons[editingLesson] = tempLesson;
    } else {
      // Add new lesson
      if (!updatedTopics[activeTopicIndex].lessons) {
        updatedTopics[activeTopicIndex].lessons = [];
      }
      updatedTopics[activeTopicIndex].lessons.push({
        ...tempLesson,
        id: Date.now() + Math.random().toString(36).substr(2, 9) // Generate ID for new lesson
      });
    }

    setCourseData({ ...courseData, topics: updatedTopics });
    setShowLessonModal(false);
  };

  const resetForm = () => {
    setCurrentCourse(null);
    setCourseData({
      title: '',
      description: '',
      visibility: 'public',
      featuredImage: '',
      introVideoUrl: '',
      pricingModel: 'free',
      price: '',
      topics: [],
      whatYouWillLearn: [],
      targetAudience: [],
      courseDurationMonths: 0,
      materialsIncluded: [],
      requirements: []
    });
    setImageFile(null);
    setUploadingImage(false);
    setView('list');
  };

  const addTopic = () => {
    setCourseData({
      ...courseData,
      topics: [...courseData.topics, { title: '', lessons: [] }]
    });
  };

  const updateTopic = (topicIndex, field, value) => {
    const updatedTopics = [...courseData.topics];
    updatedTopics[topicIndex][field] = value;
    setCourseData({ ...courseData, topics: updatedTopics });
  };

  const deleteTopic = (topicIndex) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      const updatedTopics = courseData.topics.filter((_, index) => index !== topicIndex);
      setCourseData({ ...courseData, topics: updatedTopics });
    }
  };

  const deleteLesson = (topicIndex, lessonIndex) => {
    const updatedTopics = [...courseData.topics];
    updatedTopics[topicIndex].lessons = updatedTopics[topicIndex].lessons.filter(
      (_, index) => index !== lessonIndex
    );
    setCourseData({ ...courseData, topics: updatedTopics });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePlayVideo = (courseId) => {
    setPlayingVideo(playingVideo === courseId ? null : courseId);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const fileName = `course-images/${timestamp}_${file.name}`;
      const storageRef = ref(storage, fileName);

      // Upload the file
      await uploadBytes(storageRef, file);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);

      // Update the course data with the new image URL
      setCourseData({ ...courseData, featuredImage: downloadURL });
      setImageFile(null);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(file);
    }
  };

  return (
    <div className="course-management">
      {view === 'list' && (
        <>
          <div className="course-header">
            <h2>Course Management</h2>
            <button className="btn-primary" onClick={() => setView('create-course')}>
              + Add New Course
            </button>
          </div>

          <div className="courses-list">
            {courses.length === 0 ? (
              <div className="empty-state">
                <p>No courses yet. Create your first course!</p>
              </div>
            ) : (
              courses.map((course) => (
                <div key={course.id} className="course-item">
                  <div className="course-item-header">
                    <div>
                      <h3>{course.title}</h3>
                      <span className={`badge badge-${course.visibility}`}>
                        {course.visibility}
                      </span>
                      <span className={`badge badge-${course.pricingModel}`}>
                        {course.pricingModel === 'paid' ? `₦${course.price}` : 'Free'}
                      </span>
                    </div>
                    <div className="course-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditCourse(course)}
                      >
                        Edit Course
                      </button>
                      <button
                        className="btn-curriculum"
                        onClick={() => handleManageContent(course)}
                      >
                        📚 Manage Content
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn-expand"
                        onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                      >
                        {expandedCourse === course.id ? '▼' : '▶'}
                      </button>
                    </div>
                  </div>

                  <div className="course-content">
                    {course.featuredImage && (
                      <div className="course-featured-image">
                        {playingVideo === course.id && course.introVideoUrl ? (
                          <div className="video-player">
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${getYouTubeVideoId(course.introVideoUrl)}?autoplay=1`}
                              title={course.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : (
                          <div className="video-thumbnail" onClick={() => course.introVideoUrl && handlePlayVideo(course.id)}>
                            <img src={course.featuredImage} alt={course.title} />
                            {course.introVideoUrl && (
                              <div className="play-button-overlay">
                                <div className="play-button">
                                  <svg viewBox="0 0 24 24" fill="white">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="course-info">
                      {course.description && (
                        <div
                          className="course-description"
                          dangerouslySetInnerHTML={{
                            __html: course.description.substring(0, 150) + '...'
                          }}
                        />
                      )}

                      <p className="course-meta">
                        {course.topics?.length || 0} Topics • {' '}
                        {course.topics?.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0) || 0} Lessons
                      </p>
                    </div>
                  </div>

                  {expandedCourse === course.id && (
                    <div className="course-details">
                      {course.topics?.length > 0 ? (
                        course.topics.map((topic, topicIdx) => (
                          <div key={topicIdx} className="topic-detail">
                            <h4>📖 {topic.title}</h4>
                            <div className="lessons-list">
                              {topic.lessons?.map((lesson, lessonIdx) => (
                                <div key={lessonIdx} className="lesson-detail">
                                  <strong>Lesson {lessonIdx + 1}: {lesson.name}</strong>
                                  {lesson.videoUrl && <span className="video-badge">📹 Video</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="no-curriculum">No curriculum added yet. Click "Manage Curriculum" to add topics and lessons.</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {(view === 'create-course' || view === 'edit-course') && (
        <div className="course-form-container">
          <div className="form-header">
            <h3>{view === 'edit-course' ? 'Edit Course' : 'Create New Course'}</h3>
            <button className="btn-secondary" onClick={resetForm}>
              ← Back to Courses
            </button>
          </div>

          <div className="course-form-card">
            <div className="form-body">
              <div className="form-group">
                <label>Course Title *</label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  placeholder="Enter course title"
                />
              </div>

              <div className="form-group">
                <label>Course Description *</label>
                <ReactQuill
                  theme="snow"
                  value={courseData.description}
                  onChange={(value) => setCourseData({ ...courseData, description: value })}
                  modules={modules}
                  placeholder="Enter a detailed course description with formatting"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Visibility *</label>
                  <select
                    value={courseData.visibility}
                    onChange={(e) => setCourseData({ ...courseData, visibility: e.target.value })}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Pricing Model *</label>
                  <select
                    value={courseData.pricingModel}
                    onChange={(e) => setCourseData({ ...courseData, pricingModel: e.target.value })}
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                {courseData.pricingModel === 'paid' && (
                  <div className="form-group">
                    <label>Price (₦) *</label>
                    <input
                      type="text"
                      value={courseData.price}
                      onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                      placeholder="0"
                      pattern="[0-9]*"
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Featured Image</label>
                <div className="image-upload-section">
                  <div className="upload-options">
                    <div className="upload-option">
                      <label className="upload-label">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          disabled={uploadingImage}
                          style={{ display: 'none' }}
                        />
                        <div className="upload-button">
                          {uploadingImage ? (
                            <>
                              <div className="upload-spinner"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              📁 Choose File
                            </>
                          )}
                        </div>
                      </label>
                      <small className="field-hint">Upload from your device (max 5MB)</small>
                    </div>

                    <div className="upload-option">
                      <span className="option-or">OR</span>
                    </div>

                    <div className="upload-option">
                      <input
                        type="url"
                        value={courseData.featuredImage}
                        onChange={(e) => setCourseData({ ...courseData, featuredImage: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                      />
                      <small className="field-hint">Enter image URL directly</small>
                    </div>
                  </div>

                  {courseData.featuredImage && (
                    <div className="image-preview">
                      <img src={courseData.featuredImage} alt="Featured" />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Intro Video URL (YouTube)</label>
                <input
                  type="url"
                  value={courseData.introVideoUrl}
                  onChange={(e) => setCourseData({ ...courseData, introVideoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <hr className="form-divider" />
              <h4 className="section-title">📚 Course Overview Information</h4>

              <div className="form-group">
                <label>What Will Students Learn? *</label>
                <small className="field-hint">Enter one benefit per line. Students will see key takeaways before enrolling.</small>
                <textarea
                  value={(courseData.whatYouWillLearn || []).join('\n')}
                  onChange={(e) => setCourseData({
                    ...courseData,
                    whatYouWillLearn: e.target.value.split('\n')
                  })}
                  placeholder="Master React fundamentals&#10;Build real-world applications&#10;Learn modern JavaScript ES6+&#10;Understand state management"
                  rows="6"
                />
              </div>

              <div className="form-group">
                <label>Target Audience *</label>
                <small className="field-hint">One line per target audience. Who will benefit most from this course?</small>
                <textarea
                  value={(courseData.targetAudience || []).join('\n')}
                  onChange={(e) => setCourseData({
                    ...courseData,
                    targetAudience: e.target.value.split('\n')
                  })}
                  placeholder="Beginner developers wanting to learn React&#10;Students with basic JavaScript knowledge&#10;Web developers looking to modernize their skills"
                  rows="5"
                />
              </div>

              <div className="form-group">
                <label>Course Duration (Months)</label>
                <input
                  type="number"
                  value={courseData.courseDurationMonths}
                  onChange={(e) => setCourseData({ ...courseData, courseDurationMonths: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                  min="0"
                  step="0.5"
                />
                <small className="field-hint">Enter duration in months (e.g., 1, 2.5, 3, 6, etc.)</small>
              </div>

              <div className="form-group">
                <label>Materials Included</label>
                <small className="field-hint">List assets provided to students (one per line). E.g., downloadable resources, certificates, etc.</small>
                <textarea
                  value={(courseData.materialsIncluded || []).join('\n')}
                  onChange={(e) => setCourseData({
                    ...courseData,
                    materialsIncluded: e.target.value.split('\n')
                  })}
                  placeholder="Downloadable code files&#10;Certificate of completion&#10;Access to course updates&#10;Project source code"
                  rows="5"
                />
              </div>

              <div className="form-group">
                <label>Requirements/Instructions</label>
                <small className="field-hint">Additional requirements or instructions for students (one per line).</small>
                <textarea
                  value={(courseData.requirements || []).join('\n')}
                  onChange={(e) => setCourseData({
                    ...courseData,
                    requirements: e.target.value.split('\n')
                  })}
                  placeholder="Basic understanding of HTML and CSS&#10;A computer with internet connection&#10;Text editor installed (VS Code recommended)"
                  rows="5"
                />
              </div>
            </div>

            <div className="form-footer">
              <button className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSaveCourse}>
                {view === 'edit-course' ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'manage-curriculum' && (
        <div className="curriculum-container">
          <div className="course-form-card">
            <div className="form-header">
              <h3>Manage Content: {courseData.title}</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-secondary" onClick={resetForm}>
                  ← Back to Courses
                </button>
                <button className="btn-primary" onClick={saveCurriculumChanges}>
                  💾 Save Changes
                </button>
              </div>
            </div>

            <div className="form-body">
              <div className="curriculum-actions" style={{ marginBottom: '20px' }}>
                <button type="button" className="btn-primary" onClick={addTopic}>
                  + Add New Topic
                </button>
              </div>

              {courseData.topics.length === 0 ? (
                <div className="empty-state">
                  <p>No topics yet. Start by adding a topic!</p>
                </div>
              ) : (
                <div className="topics-list">
                  {courseData.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="topic-card">
                      <div className="topic-header">
                        <div className="topic-title-group" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className="index-label">Topic {topicIndex + 1}:</span>
                          <input
                            type="text"
                            value={topic.title}
                            onChange={(e) => updateTopic(topicIndex, 'title', e.target.value)}
                            placeholder="Enter Topic Title (e.g. Introduction)"
                            className="topic-title-input"
                          />
                        </div>
                        <button
                          type="button"
                          className="btn-delete"
                          onClick={() => deleteTopic(topicIndex)}
                          style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                        >
                          Delete Topic
                        </button>
                      </div>

                      <div className="lessons-container">
                        <Reorder.Group
                          axis="y"
                          values={topic.lessons}
                          onReorder={(newOrder) => updateTopic(topicIndex, 'lessons', newOrder)}
                          className="lessons-reorder-group"
                        >
                          {topic.lessons.map((lesson, lessonIndex) => (
                            <Reorder.Item
                              key={lesson.id}
                              value={lesson}
                              className="lesson-card"
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: 'grab',
                                userSelect: 'none'
                              }}
                              whileDrag={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.1)", zIndex: 10 }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MdDragIndicator className="text-gray-400" size={20} style={{ cursor: 'grab' }} />
                                <div>
                                  <strong>{lessonIndex + 1}. {lesson.name}</strong>
                                  {lesson.videoUrl && <span className="video-badge" style={{ marginLeft: '10px' }}>Video</span>}
                                </div>
                              </div>
                              <div>
                                <button
                                  className="btn-edit"
                                  onClick={() => openEditLessonModal(topicIndex, lesson, lessonIndex)}
                                >
                                  Edit Lesson
                                </button>
                                <button
                                  className="btn-delete"
                                  onClick={() => deleteLesson(topicIndex, lessonIndex)}
                                >
                                  Delete
                                </button>
                              </div>
                            </Reorder.Item>
                          ))}
                        </Reorder.Group>

                        <div style={{ marginTop: '15px' }}>
                          <button
                            type="button"
                            className="btn-secondary-small"
                            onClick={() => openAddLessonModal(topicIndex)}
                          >
                            + Add Lesson to "{topic.title || `Topic ${topicIndex + 1}`}"
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-footer">
              <button className="btn-primary" onClick={saveCurriculumChanges}>
                💾 Save Curriculum Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {showLessonModal && (
        <div className="course-form-modal">
          <div className="course-form-card" style={{ width: '800px', maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div className="form-header">
              <h3>{editingLesson !== null ? 'Edit Lesson' : 'Add New Lesson'}</h3>
              <button className="close-btn" onClick={() => setShowLessonModal(false)}>×</button>
            </div>

            <div className="form-body">
              <div className="form-group">
                <label>Lesson Name *</label>
                <input
                  type="text"
                  value={tempLesson.name}
                  onChange={(e) => setTempLesson({ ...tempLesson, name: e.target.value })}
                  placeholder="e.g. Setting up the Environment"
                />
              </div>

              <div className="form-group">
                <label>Video URL (YouTube)</label>
                <input
                  type="url"
                  value={tempLesson.videoUrl}
                  onChange={(e) => setTempLesson({ ...tempLesson, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              <div className="form-group">
                <label>Lesson Content / Description / Links</label>
                <small className="field-hint" style={{ display: 'block', marginBottom: '5px' }}>
                  Use the editor below to add text, links, and formatted content for this lesson.
                </small>
                <ReactQuill
                  theme="snow"
                  value={tempLesson.description}
                  onChange={(value) => setTempLesson({ ...tempLesson, description: value })}
                  modules={modules}
                  style={{ height: '300px', marginBottom: '50px' }}
                />
              </div>
            </div>

            <div className="form-footer">
              <button className="btn-secondary" onClick={() => setShowLessonModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={saveLessonFromModal}>
                {editingLesson !== null ? 'Update Lesson' : 'Add Lesson'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
