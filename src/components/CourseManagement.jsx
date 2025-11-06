import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
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

      if (currentCourse) {
        // Update existing course
        await updateDoc(doc(db, 'courses', currentCourse.id), {
          title: courseData.title,
          description: courseData.description,
          visibility: courseData.visibility,
          featuredImage: courseData.featuredImage,
          introVideoUrl: courseData.introVideoUrl,
          pricingModel: courseData.pricingModel,
          price: courseData.price,
          whatYouWillLearn: courseData.whatYouWillLearn,
          targetAudience: courseData.targetAudience,
          courseDurationMonths: courseData.courseDurationMonths,
          materialsIncluded: courseData.materialsIncluded,
          requirements: courseData.requirements,
          updatedAt: serverTimestamp()
        });
        alert('Course updated successfully!');
        setView('list');
      } else {
        // Add new course
        const docRef = await addDoc(collection(db, 'courses'), {
          title: courseData.title,
          description: courseData.description,
          visibility: courseData.visibility,
          featuredImage: courseData.featuredImage,
          introVideoUrl: courseData.introVideoUrl,
          pricingModel: courseData.pricingModel,
          price: courseData.price,
          whatYouWillLearn: courseData.whatYouWillLearn,
          targetAudience: courseData.targetAudience,
          courseDurationMonths: courseData.courseDurationMonths,
          materialsIncluded: courseData.materialsIncluded,
          requirements: courseData.requirements,
          topics: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        alert('Course created successfully! Now you can add topics and lessons.');
        
        // After creating, redirect to manage curriculum
        const newCourse = {
          id: docRef.id,
          title: courseData.title,
          description: courseData.description,
          visibility: courseData.visibility,
          featuredImage: courseData.featuredImage,
          introVideoUrl: courseData.introVideoUrl,
          pricingModel: courseData.pricingModel,
          price: courseData.price,
          topics: []
        };
        setCurrentCourse(newCourse);
        setCourseData({ ...courseData, topics: [] });
        setView('manage-curriculum');
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
    setView('edit-course');
  };

  const handleManageCurriculum = (course) => {
    setCurrentCourse(course);
    setCourseData({
      title: course.title,
      description: course.description,
      visibility: course.visibility || 'public',
      featuredImage: course.featuredImage || '',
      introVideoUrl: course.introVideoUrl || '',
      pricingModel: course.pricingModel || 'free',
      price: course.price || 0,
      topics: course.topics || []
    });
    setView('manage-curriculum');
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
      price: 0,
      topics: []
    });
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

  const addLesson = (topicIndex) => {
    const updatedTopics = [...courseData.topics];
    updatedTopics[topicIndex].lessons.push({
      name: '',
      description: '',
      videoUrl: ''
    });
    setCourseData({ ...courseData, topics: updatedTopics });
  };

  const updateLesson = (topicIndex, lessonIndex, field, value) => {
    const updatedTopics = [...courseData.topics];
    updatedTopics[topicIndex].lessons[lessonIndex][field] = value;
    setCourseData({ ...courseData, topics: updatedTopics });
  };

  const deleteLesson = (topicIndex, lessonIndex) => {
    const updatedTopics = [...courseData.topics];
    updatedTopics[topicIndex].lessons = updatedTopics[topicIndex].lessons.filter(
      (_, index) => index !== lessonIndex
    );
    setCourseData({ ...courseData, topics: updatedTopics });
  };

  const handleSaveCurriculum = async () => {
    try {
      if (!currentCourse) return;
      
      await updateDoc(doc(db, 'courses', currentCourse.id), {
        topics: courseData.topics,
        updatedAt: serverTimestamp()
      });
      
      alert('Curriculum saved successfully!');
      fetchCourses();
    } catch (error) {
      console.error('Error saving curriculum:', error);
      alert('Error saving curriculum. Please try again.');
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
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
                        onClick={() => handleManageCurriculum(course)}
                      >
                        Manage Curriculum
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
                                    <path d="M8 5v14l11-7z"/>
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
                <label>Featured Image URL</label>
                <input
                  type="url"
                  value={courseData.featuredImage}
                  onChange={(e) => setCourseData({ ...courseData, featuredImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
                {courseData.featuredImage && (
                  <div className="image-preview">
                    <img src={courseData.featuredImage} alt="Featured" />
                  </div>
                )}
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
                  value={courseData.whatYouWillLearn.join('\n')}
                  onChange={(e) => setCourseData({ 
                    ...courseData, 
                    whatYouWillLearn: e.target.value.split('\n').filter(item => item.trim() !== '')
                  })}
                  placeholder="Master React fundamentals&#10;Build real-world applications&#10;Learn modern JavaScript ES6+&#10;Understand state management"
                  rows="6"
                />
              </div>

              <div className="form-group">
                <label>Target Audience *</label>
                <small className="field-hint">One line per target audience. Who will benefit most from this course?</small>
                <textarea
                  value={courseData.targetAudience.join('\n')}
                  onChange={(e) => setCourseData({ 
                    ...courseData, 
                    targetAudience: e.target.value.split('\n').filter(item => item.trim() !== '')
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
                  value={courseData.materialsIncluded.join('\n')}
                  onChange={(e) => setCourseData({ 
                    ...courseData, 
                    materialsIncluded: e.target.value.split('\n').filter(item => item.trim() !== '')
                  })}
                  placeholder="Downloadable code files&#10;Certificate of completion&#10;Lifetime access to course updates&#10;Project source code"
                  rows="5"
                />
              </div>

              <div className="form-group">
                <label>Requirements/Instructions</label>
                <small className="field-hint">Additional requirements or instructions for students (one per line).</small>
                <textarea
                  value={courseData.requirements.join('\n')}
                  onChange={(e) => setCourseData({ 
                    ...courseData, 
                    requirements: e.target.value.split('\n').filter(item => item.trim() !== '')
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

      {view === 'manage-curriculum' && currentCourse && (
        <div className="curriculum-container">
          <div className="form-header">
            <h3>Manage Curriculum: {currentCourse.title}</h3>
            <button className="btn-secondary" onClick={resetForm}>
              ← Back to Courses
            </button>
          </div>

          <div className="curriculum-card">
            <div className="topics-section">
              <div className="section-header">
                <h4>Topics & Lessons</h4>
                <button className="btn-secondary" onClick={addTopic}>
                  + Add Topic
                </button>
              </div>

              {courseData.topics.length === 0 ? (
                <div className="empty-state">
                  <p>No topics yet. Add your first topic to start building the curriculum.</p>
                </div>
              ) : (
                courseData.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="topic-card">
                    <div className="topic-header">
                      <input
                        type="text"
                        value={topic.title}
                        onChange={(e) => updateTopic(topicIndex, 'title', e.target.value)}
                        placeholder="Topic Title"
                        className="topic-title-input"
                      />
                      <button
                        className="btn-danger-small"
                        onClick={() => deleteTopic(topicIndex)}
                      >
                        Delete Topic
                      </button>
                    </div>

                    <div className="lessons-section">
                      <button
                        className="btn-secondary-small"
                        onClick={() => addLesson(topicIndex)}
                      >
                        + Add Lesson
                      </button>

                      {topic.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="lesson-card">
                          <div className="lesson-header">
                            <h5>Lesson {lessonIndex + 1}</h5>
                            <button
                              className="btn-danger-small"
                              onClick={() => deleteLesson(topicIndex, lessonIndex)}
                            >
                              Delete
                            </button>
                          </div>

                          <div className="form-group">
                            <label>Lesson Name *</label>
                            <input
                              type="text"
                              value={lesson.name}
                              onChange={(e) =>
                                updateLesson(topicIndex, lessonIndex, 'name', e.target.value)
                              }
                              placeholder="Enter lesson name"
                            />
                          </div>

                          <div className="form-group">
                            <label>Lesson Description</label>
                            <ReactQuill
                              theme="snow"
                              value={lesson.description}
                              onChange={(value) =>
                                updateLesson(topicIndex, lessonIndex, 'description', value)
                              }
                              modules={modules}
                              placeholder="Enter lesson description with rich text formatting"
                            />
                          </div>

                          <div className="form-group">
                            <label>YouTube Video URL</label>
                            <input
                              type="url"
                              value={lesson.videoUrl}
                              onChange={(e) =>
                                updateLesson(topicIndex, lessonIndex, 'videoUrl', e.target.value)
                              }
                              placeholder="https://www.youtube.com/watch?v=..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="form-footer">
              <button className="btn-secondary" onClick={resetForm}>
                Back to Courses
              </button>
              <button className="btn-primary" onClick={handleSaveCurriculum}>
                Save Curriculum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
