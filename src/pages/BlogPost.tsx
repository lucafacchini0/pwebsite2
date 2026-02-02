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


    useEffect(() => {
        const loadPost = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                setError(false);

                const res = await fetch(`/post/${slug}/content.md`);

                // Check if response is ok and is actually markdown (not an HTML fallback)
                const contentType = res.headers.get('content-type');
                if (!res.ok || (contentType && contentType.includes('text/html'))) {
                    throw new Error("Post not found");
                }

                const text = await res.text();

                // Extra safety: if it looks like HTML, it's probably the SPA fallback
                const trimmed = text.trim();
                if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html') || trimmed.startsWith('<script')) {
                    throw new Error("Invalid post content");
                }

                const { data, content: mdContent } = matter(text);

                // If there's no real content and no title in frontmatter, it's likely invalid
                if (!mdContent.trim() && !data.title) {
                    throw new Error("Empty post content");
                }

                setContent(mdContent);
                setMetadata({
                    slug: slug,
                    title: data.title || slug.replace(/-/g, ' '),
                    description: data.description || '',
                    thumbnail: `/post/${slug}/thumb.png`,
                    date: data.date || '',
                    tags: data.tags || [],
                    author: data.author || 'Luca Facchini',
                    authorAvatar: data.authorAvatar || `https://ui-avatars.com/api/?name=${data.author || 'Luca+Facchini'}`
                });

            } catch (err) {
                console.error("Error loading blog post:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadPost();
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
                <div className="mb-12 rounded-3xl overflow-hidden shadow-sm h-[400px] bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 relative">
                    <img
                        src={metadata?.thumbnail}
                        alt={metadata?.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const parent = (e.target as HTMLImageElement).parentElement;
                            if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = "w-full h-full flex items-center justify-center text-gray-200 dark:text-gray-700 font-bold text-4xl tracking-widest";
                                fallback.innerText = "BLOG POST";
                                parent.appendChild(fallback);
                            }
                        }}
                    />
                </div>

                {/* Content */}
                <MarkdownRenderer content={content} />
            </Layout>
        </article>
    );
};

export default BlogPost;
