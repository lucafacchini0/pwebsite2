import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link
            to={`/blog/${post.slug}`}
            className="group block py-6 border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors duration-200"
        >
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">
                {post.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-3">
                {post.description}
            </p>
            {post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                    {post.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </Link>
    );
};
