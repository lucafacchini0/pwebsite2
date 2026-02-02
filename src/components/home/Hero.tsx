import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Layout } from '../common/Layout';
import { Button } from '../common/Button';
import { DotsGridBackground } from '../common/DotsGridBackground';

export const Hero: React.FC = () => {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        aboutSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
            <DotsGridBackground />

            <Layout className="flex flex-col items-center z-10">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    I'm Luca Facchini
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-800 delay-100">
                    Creative Developer & UI/UX Enthusiast crafting digital experiences.
                </p>

                <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-6 duration-900 delay-200">
                    <Button variant="primary" onClick={scrollToAbout}>
                        View My Work
                    </Button>
                    <Button variant="secondary">
                        Contact Me
                    </Button>
                </div>
            </Layout>

            <div className="absolute bottom-10 animate-bounce cursor-pointer z-10" onClick={scrollToAbout}>
                <ArrowDown className="text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white transition-colors" size={32} />
            </div>
        </section>
    );
};
