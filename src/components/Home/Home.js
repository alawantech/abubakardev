import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from './Toolsbar/Navbar/Navbar'
import Toolsbar from './Toolsbar/Toolsbar';
import './Home.css'
import Slider from './Slider/Slider';
import Features from './Features/Features';
import About from './About/About';
import Services from './Services/Services';
import SkillSet from './SkillSet/SkillSet';
import Team from './Team/Team';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import Blogs from './Blogs/Blogs';
import ProjectSummary from './ProjectSummary/ProjectSummary';
import Projects from './Projects/Projects';

function Home() {
    return (
        <div>
            <Helmet>
                <title>AbubakarDev | Web Design, Software & App Development in Kano, Nigeria</title>
                <meta name="description" content="AbubakarDev is a software, web, and app development company in Kano, Nigeria. We build websites, mobile apps, and custom software solutions. We also run web development schools, software development courses, and app development training programs." />
                <meta name="keywords" content="web design Kano, web development Kano, app development Nigeria, software development Kano, IT company Nigeria, tech company Kano, web development school Nigeria, app development school Kano, software development training Nigeria, coding school Kano, web development courses, app development courses, software development courses" />
                <meta property="og:title" content="AbubakarDev | Web Design, Software & App Development in Kano, Nigeria" />
                <meta property="og:description" content="Professional software, web, and app development company in Kano, Nigeria. Offering IT services, web design, mobile app development, and software development training courses." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://abubakardev.dev/" />
                <meta property="og:image" content="/logo192.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="AbubakarDev | Web & App Development | Kano, Nigeria" />
                <meta name="twitter:description" content="We are a software, web, and app development company in Kano, Nigeria. Also offering web development school, software training, and app development courses." />
                <meta name="twitter:image" content="/logo192.png" />
            </Helmet>
            <header className="nav-header">
                <Toolsbar />
                <Navbar />
                <Slider />
            </header>
            <main>
                <h1 style={{display:'none'}}>AbubakarDev | Web Design, Software & App Development in Kano, Nigeria</h1>
                <Services />
                <About />
                <Features />
                <Projects />
                <ProjectSummary />
                <SkillSet />
                <Team />
                <Contact />
                <Blogs />
            </main>
            <Footer />
        </div>
    )
}

export default Home
