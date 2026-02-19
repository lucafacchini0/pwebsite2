import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { MarkdownRenderer } from '../components/common/MarkdownRenderer';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { BlogPostSummary } from '../components/blog/BlogCard';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

// This is needed for gray-matter to work in the browser
if (typeof window !== 'undefined') {
    (window as unknown as { Buffer: unknown }).Buffer = Buffer;
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
            <div className="pt-32 pb-20 min-h-screen flex justify-center bg-white dark:bg-black transition-colors duration-200">
                <div className="w-8 h-8 border-4 border-zinc-200 dark:border-zinc-800 border-t-black dark:border-t-white rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || (!loading && !content)) {
        return <Navigate to="/404" replace />;
    }

    return (
        <article className="pt-32 pb-24 bg-white dark:bg-black min-h-screen transition-colors duration-200">
            <Layout className="max-w-4xl">
                <Link to="/blog" className="inline-flex items-center text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
                        {metadata?.title}
                    </h1>

                    <p className="text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-4">
                        {metadata?.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-sm">
                            <Calendar size={14} className="mr-1" />
                            {metadata?.date}
                        </div>
                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                            <img
                                src={metadata?.authorAvatar}
                                alt={metadata?.author}
                                className="w-6 h-6 rounded-full"
                            />
                            {metadata?.author}
                        </div>
                    </div>

                    {metadata?.tags && metadata.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {metadata.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* Content */}
                <MarkdownRenderer content={content} />
            </Layout>
        </article>
    );
};

export default BlogPost;
