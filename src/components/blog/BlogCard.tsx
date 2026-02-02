import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

export interface BlogPostSummary {
    slug: string;
    title: string;
    description: string;
    thumbnail: string;
    date: string;
    tags: string[];
    author: string;
    authorAvatar: string;
}

interface BlogCardProps {
    post: BlogPostSummary;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <Link to={`/blog/${post.slug}`} className="group flex flex-col bg-white dark:bg-black rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-900">
            <div className="relative h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = "w-full h-full flex items-center justify-center text-zinc-300 dark:text-zinc-600 font-bold text-2xl uppercase tracking-widest";
                            fallback.innerText = "Blog Post";
                            parent.appendChild(fallback);
                        }
                    }}
                />
                <div className="absolute top-4 left-4 flex gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-xs font-bold text-zinc-900 dark:text-white rounded-full shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500 mb-3">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 transition-colors line-clamp-2 uppercase tracking-tight">
                    {post.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-300 mb-6 line-clamp-3 flex-grow font-light leading-relaxed">
                    {post.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-900 mt-auto">
                    <div className="flex items-center gap-3">
                        <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800" />
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">{post.author}</span>
                    </div>
                    <div className="flex items-center text-sm font-bold text-black dark:text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                        Read Post <ArrowRight size={16} className="ml-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};
