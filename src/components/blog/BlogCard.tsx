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
        <Link to={`/blog/${post.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative h-64 overflow-hidden bg-gray-100">
                {post.thumbnail ? (
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-2xl">
                        POST PREVIEW
                    </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                    {post.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                    <div className="flex items-center gap-3">
                        <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full" />
                        <span className="text-sm font-medium text-gray-900">{post.author}</span>
                    </div>
                    <div className="flex items-center text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 transition-transform">
                        Read Post <ArrowRight size={16} className="ml-1" />
                    </div>
                </div>
            </div>
        </Link>
    );
};
