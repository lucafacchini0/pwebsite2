import React, { useMemo } from 'react';
import { Layout } from '../components/common/Layout';
import { ArrowUpRight, Shield, Server, Brain, Lock, Folder } from 'lucide-react';
import { Link } from 'react-router-dom';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

// This is needed for gray-matter to work in the browser
if (typeof window !== 'undefined') {
    (window as unknown as { Buffer: unknown }).Buffer = Buffer;
}

interface Project {
    title: string;
    description: string;
    slug: string;
    icon: React.ReactNode;
    tags: string[];
}

const iconMap: Record<string, React.ReactNode> = {
    'aegis-scanner': <Shield size={20} />,
    'neuralguard': <Brain size={20} />,
    'vault-architecture': <Lock size={20} />,
    'hypernode': <Server size={20} />,
    'default': <Folder size={20} />
};

const ProjectCard: React.FC<Project> = ({ title, description, slug, icon, tags }) => (
    <Link to={`/projects/${slug}`} className="group relative bg-white dark:bg-black border border-zinc-100 dark:border-zinc-900 rounded-2xl p-8 hover:border-zinc-900 dark:hover:border-zinc-100 transition-all duration-500 flex flex-col h-full overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-500">
            <ArrowUpRight size={20} className="text-zinc-400" />
        </div>


        <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">{title}</h3>

        <p className="text-zinc-500 dark:text-zinc-500 text-sm font-light leading-relaxed mb-8 flex-grow">
            {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
            {tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-900 text-[10px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest rounded-md border border-zinc-200 dark:border-zinc-800">
                    {tag}
                </span>
            ))}
        </div>
    </Link>
);

const ProjectsPage: React.FC = () => {
    const projects = useMemo(() => {
        const modules = import.meta.glob('../projects/*.md', { as: 'raw', eager: true });

        return Object.entries(modules).map(([path, content]) => {
            const slug = path.split('/').pop()?.replace('.md', '') || '';
            const { data } = matter(content as string);

            return {
                title: data.title || slug,
                description: data.description || '',
                slug: slug,
                icon: iconMap[slug] || iconMap.default,
                tags: data.technologies || []
            };
        });
    }, []);

    return (
        <div className="pt-32 pb-24 bg-white dark:bg-black min-h-screen transition-colors duration-200">
            <Layout className="relative z-10">
                <header className="mb-24">
                    <span className="text-zinc-400 dark:text-zinc-600 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block animate-in fade-in duration-700">Portfolio</span>
                    <h1 className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter mb-4 animate-in fade-in slide-in-from-left-4 duration-700">
                        Selected Projects.
                    </h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div key={project.slug} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 100}ms` }}>
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>
            </Layout>
        </div>
    );
};

export default ProjectsPage;
