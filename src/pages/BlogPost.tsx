import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { MarkdownRenderer } from '../components/blog/MarkdownRenderer';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { BlogPostSummary } from '../components/blog/BlogCard';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

// This is needed for gray-matter to work in the browser
if (typeof window !== 'undefined') {
    (window as any).Buffer = Buffer;
}

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState('');
    const [metadata, setMetadata] = useState<BlogPostSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [thumbExists, setThumbExists] = useState<boolean | null>(null);

    useEffect(() => {
        const loadPost = async () => {
            try {
                setLoading(true);

                // 1. Fetch Markdown Content from /post/{slug}/content.md
                const res = await fetch(`/post/${slug}/content.md`);
                if (!res.ok) throw new Error("Markdown not found");
                
                // Check if the response is actually HTML (SPA fallback)
                const contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("text/html")) {
                     throw new Error("Markdown not found (SPA fallback)");
                }

                const text = await res.text();

                 // Double check content
                if (text.trim().startsWith("<!DOCTYPE html") || text.trim().startsWith("<html")) {
                     throw new Error("Markdown not found (SPA fallback content)");
                }

                // 2. Parse Frontmatter
                const { data, content: mdContent } = matter(text);
                
                // 3. Set content and metadata
                setContent(mdContent);
                setMetadata({
                    slug: slug || '',
                    title: data.title || slug?.replace(/-/g, ' '),
                    description: data.description || '',
                    thumbnail: `/post/${slug}/thumb.png`,
                    date: data.date || '',
                    tags: data.tags || [],
                    author: data.author || 'Luca Facchini',
                    authorAvatar: data.authorAvatar || `https://ui-avatars.com/api/?name=${data.author || 'Luca+Facchini'}`
                });

                // 4. Check if thumb.png exists
                const thumbRes = await fetch(`/post/${slug}/thumb.png`, { method: 'HEAD' });
                setThumbExists(thumbRes.ok);

            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (slug) loadPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="pt-32 pb-20 min-h-screen flex justify-center bg-white dark:bg-gray-900 transition-colors duration-200">
                <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || (!loading && !content)) {
        return <Navigate to="/404" replace />;
    }

    return (
        <article className="pt-32 pb-24 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <Layout className="max-w-4xl">
                <Link to="/blog" className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex gap-2 mb-4">
                        {metadata?.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {metadata?.title}
                    </h1>

                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-8">
                        <div className="flex items-center gap-4">
                            <img
                                src={metadata?.authorAvatar}
                                alt={metadata?.author}
                                className="w-12 h-12 rounded-full border border-gray-100 dark:border-gray-700"
                            />
                            <div>
                                <div className="font-bold text-gray-900 dark:text-white">{metadata?.author}</div>
                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                    <Calendar size={14} className="mr-1" />
                                    {metadata?.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-12 rounded-3xl overflow-hidden shadow-sm h-[400px] bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    {thumbExists ? (
                        <img src={metadata?.thumbnail} alt={metadata?.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200 dark:text-gray-700 font-bold text-4xl tracking-widest">
                            BLOG POST
                        </div>
                    )}
                </div>

                {/* Content */}
                <MarkdownRenderer content={content} />
            </Layout>
        </article>
    );
};

export default BlogPost;
