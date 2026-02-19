import React, { useMemo } from 'react';
import { Layout } from '../common/Layout';
import { ArrowUpRight, Shield, Server, Brain, Lock, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

// This is needed for gray-matter to work in the browser
if (typeof window !== 'undefined') {
    (window as unknown as { Buffer: unknown }).Buffer = Buffer;
}

interface ProjectCardProps {
    title: string;
    description: string;
    link: string;
    tags: string[];
    slug: string;
}

const iconMap: Record<string, React.ReactNode> = {
    'aegis-scanner': <Shield size={18} />,
    'neuralguard': <Brain size={18} />,
    'vault-architecture': <Lock size={18} />,
    'hypernode': <Server size={18} />,
    'default': <Folder size={18} />
};

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link }) => (
    <Link to={link} className="group relative block h-full bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-500 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
        <div className="absolute top-8 right-8 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
            <ArrowUpRight size={20} />
        </div>

        <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-3 transition-colors duration-300 pr-8">
            {title}
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 mb-2 line-clamp-3 font-medium leading-relaxed text-sm">
            {description}
        </p>
    </Link>
);

export const Projects: React.FC = () => {
    const featuredProjects = useMemo(() => {
        try {
            const modules = import.meta.glob('../../projects/*.md', { as: 'raw', eager: true });

            return Object.entries(modules).slice(0, 3).map(([path, content]) => {
                const slug = path.split('/').pop()?.replace('.md', '') || '';
                const { data } = matter(content as string);

                return {
                    title: data.title || slug,
                    description: data.description || '',
                    tags: data.technologies || [],
                    link: `/projects/${slug}`,
                    slug: slug
                };
            });
        } catch (err) {
            console.error(err);
            return [];
        }
    }, []);

    return (
        <section id="projects" className="h-screen flex items-center bg-white dark:bg-zinc-950 transition-colors duration-200">
            <Layout>
                {/* Header aligned with MySkills */}
                <div className="mb-14">
                    <span className="text-black dark:text-white font-semibold tracking-[0.2em] uppercase text-sm mb-2 block">
                        Work
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        Featured Projects
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>

                <div className="flex justify-between items-center pt-8">
                    <Link to="/projects" className="px-6 py-3 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95">
                        View Full Portfolio
                    </Link>
                    <a href="https://github.com/lucafacchini" target="_blank" rel="noreferrer" className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">
                        Explore GitHub
                    </a>
                </div>
            </Layout>
        </section>
    );
};
