import React from 'react';
import { Layout } from '../common/Layout';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    subtitle: string;
    description: string;
    image?: string;
    link?: string;
    tags: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, subtitle, description, tags, link, image }) => (
    <a href={link} className="group block h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="aspect-video bg-gray-100 relative overflow-hidden">
            {image ? (
                <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-2xl">
                    PROJECT PREVIEW
                </div>
            )}
            <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={20} />
            </div>
        </div>
        <div className="p-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">{subtitle}</span>
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </a>
);

export const Projects: React.FC = () => {
    const projects = [
        {
            title: "E-Commerce Dashboard",
            subtitle: "Web Application",
            description: "A comprehensive dashboard for managing products, orders, and analytics for an online store. Built with React and TypeScript.",
            tags: ["React", "TypeScript", "Tailwind"],
            link: "#"
        },
        {
            title: "Travel Companion App",
            subtitle: "Mobile Design",
            description: "A mobile app concept designed to help travelers plan their trips, find local gems, and connect with other explorers.",
            tags: ["Figma", "UI/UX", "Prototyping"],
            link: "#"
        },
        {
            title: "AI Image Generator",
            subtitle: "Integration",
            description: "An interface allowing users to generate images from text prompts using OpenAI's DALL-E API.",
            tags: ["Next.js", "OpenAI API", "Node.js"],
            link: "#"
        }
    ];

    return (
        <section id="projects" className="py-24 bg-white">
            <Layout>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-black font-semibold tracking-wider uppercase text-sm mb-2 block">Portfolio</span>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
                    <p className="text-gray-600">
                        Here are some of the projects I've worked on. Each one was a unique challenge that helped me grow as a developer.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="https://github.com/lucafacchini" target="_blank" rel="noreferrer" className="inline-flex items-center font-medium text-gray-900 hover:text-gray-600 transition-colors border-b-2 border-black pb-0.5 hover:border-gray-600">
                        View GitHub Profile <ArrowUpRight size={16} className="ml-1" />
                    </a>
                </div>
            </Layout>
        </section>
    );
};
