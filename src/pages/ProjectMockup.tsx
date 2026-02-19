import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { ArrowLeft, Github } from 'lucide-react';
import { MarkdownRenderer } from '../components/common/MarkdownRenderer';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

// This is needed for gray-matter to work in the browser
if (typeof window !== 'undefined') {
    (window as unknown as { Buffer: unknown }).Buffer = Buffer;
}

const ProjectMockup: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    const project = useMemo(() => {
        if (!slug) return null;

        try {
            const modules = import.meta.glob('../projects/*.md', { as: 'raw', eager: true });
            const path = `../projects/${slug}.md`;
            const content = modules[path];

            if (!content) return null;

            const { data, content: markdownBody } = matter(content as string);

            return {
                title: data.title || slug,
                description: data.description || '',
                technologies: data.technologies || [],
                github: data.github || '',
                content: markdownBody
            };
        } catch (err) {
            console.error(err);
            return null;
        }
    }, [slug]);

    if (!project) {
        return <Navigate to="/projects" />;
    }

    return (
        <div className="pt-32 pb-24 bg-white dark:bg-black min-h-screen transition-colors duration-200">
            <Layout className="max-w-3xl">
                <Link to="/projects" className="inline-flex items-center text-zinc-400 hover:text-black dark:hover:text-white transition-colors mb-20 text-xs font-bold uppercase tracking-widest group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                </Link>

                <div className="space-y-24">
                    {/* Header & Technologies */}
                    <div>
                        <header className="mb-12 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                            <div className="flex-grow">
                                <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight mb-8">
                                    {project.title}
                                </h1>
                                <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                                    {project.description}
                                </p>
                            </div>

                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300 group shadow-sm bg-white dark:bg-black"
                                    title="View Source on GitHub"
                                >
                                    <Github size={24} className="text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white" />
                                </a>
                            )}
                        </header>

                        {/* Technologies */}
                        <section>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-6">Technologies used</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech: string, i: number) => (
                                    <div key={i} className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md">
                                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Overview / Markdown Content */}
                    <section className="pt-12 border-t border-zinc-100 dark:border-zinc-900">
                        <MarkdownRenderer
                            content={project.content}
                            className="prose-h2:text-3xl prose-h2:font-bold prose-h2:tracking-tight prose-h3:text-xl prose-h3:font-bold prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed"
                        />
                    </section>

                    <footer className="pt-12 border-t border-zinc-100 dark:border-zinc-900">
                        {/* Removed GitHub and Contact from here per request */}
                    </footer>
                </div>
            </Layout>
        </div>
    );
};

export default ProjectMockup;
