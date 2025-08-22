import React from 'react'
import './ProjectSummary.css';

function ProjectSummary() {
    return (
        <section className="projectSummary-container" aria-label="Project Summary - Web & App Development Kano">
            <div style={{ width: '90%', margin: 'auto' }}>
                <h2 className="text-white text-center" style={{ fontWeight: '300', paddingTop: '40px' }}>
                    Some Fun Facts About Our Agency
                </h2>
            </div>
            <div className="row p-5">
                <div className="col-md-3 text-center">
                    <h2 className="text-white">300+</h2>
                    <h4 className="text-white" style={{fontWeight:'400'}}>PROJECT COMPLETE</h4>
                </div>
                <div className="col-md-3 text-center">
                    <h2 className="text-white">99%</h2>
                    <h4 className="text-white" style={{fontWeight:'400'}}>POSITIVE FEEDBACK</h4>
                </div>
                <div className="col-md-3 text-center">
                    <h2 className="text-white">4</h2>
                    <h4 className="text-white" style={{fontWeight:'400'}}>YEAR OF ACTION</h4>
                </div>
                <div className="col-md-3 text-center">
                    <h2 className="text-white">$35</h2>
                    <h4 className="text-white" style={{fontWeight:'400'}}>HOURLY RATE</h4>
                </div>
            </div>
        </section>
    )
}

export default ProjectSummary
   