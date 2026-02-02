import React from 'react';
import { Layout } from '../common/Layout';
import { Code, PenTool, Globe, ArrowRight } from 'lucide-react';
import { DotsGridBackground } from '../common/DotsGridBackground';

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link }) => (
    <div className="group p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:bg-black dark:hover:bg-white transition-colors duration-300">
        <div className="mb-6 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 group-hover:text-gray-300 dark:group-hover:text-gray-700 transition-colors leading-relaxed">
            {description}
        </p>
        {link && (
            <a href={link} className="inline-flex items-center text-sm font-medium text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors">
                Learn More <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
        )}
    </div>
);

export const WhatIDo: React.FC = () => {
    const services = [
        {
            icon: <Code size={32} />,
            title: "Web Development",
            description: "Building fast, responsive, and secure websites using modern technologies like React, Next.js, and Tailwind CSS.",
            link: "#"
        },
        {
            icon: <PenTool size={32} />,
            title: "UI/UX Design",
            description: "Designing intuitive and aesthetically pleasing user interfaces that provide seamless user experiences across all devices.",
            link: "#"
        },
        {
            icon: <Globe size={32} />,
            title: "SEO Optimization",
            description: "Optimizing websites for search engines to improve visibility and drive organic traffic through technical and content strategies.",
            link: "#"
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-gray-900 relative transition-colors duration-200">
            <DotsGridBackground />
            <Layout className="relative z-10">
                <div className="mb-16 md:flex md:justify-between md:items-end">
                    <div className="max-w-xl">
                        <span className="text-black dark:text-white font-semibold tracking-wider uppercase text-sm mb-2 block">My Services</span>
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">What I Do</h2>
                    </div>
                    {/* Optional description or link on the right */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </Layout>
        </section>
    );
};
