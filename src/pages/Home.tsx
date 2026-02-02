import React from 'react';
import { Hero } from '../components/home/Hero';
import { AboutMe } from '../components/home/AboutMe';
import { WhatIDo } from '../components/home/WhatIDo';
import { Education } from '../components/home/Education';
import { Projects } from '../components/home/Projects';
import { ContactPreview } from '../components/home/ContactPreview';

const Home: React.FC = () => {
    // We use scroll restoration on main app usually, 
    // but to be safe for local link navigation (like #about), 
    // we might need an effect here if the router doesn't handle hash scroll automatically.
    // Tailwind smooth scrolling handles CSS part.

    return (
        <div className="animate-in fade-in duration-500">
            <Hero />
            <AboutMe />
            <WhatIDo />
            <Education />
            <Projects />
            <ContactPreview />
        </div>
    );
};

export default Home;
