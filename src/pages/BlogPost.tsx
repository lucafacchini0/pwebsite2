import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { MarkdownRenderer } from '../components/blog/MarkdownRenderer';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { BlogPostSummary } from '../components/blog/BlogCard';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [content, setContent] = useState('');
    const [metadata, setMetadata] = useState<BlogPostSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadPost = async () => {
            try {
                setLoading(true);
                // 1. Fetch post metadata (optional, usually from posts.json or just inferred)
                // For simplicity, we'll try to find it in the posts.json to get the title/author etc.
                // If not found, we might just display generic headers.
                const postsRes = await fetch('/blog/posts.json');
                if (postsRes.ok) {
                    const posts: BlogPostSummary[] = await postsRes.json();
                    const post = posts.find(p => p.slug === slug);
                    if (post) setMetadata(post);
                }

                // 2. Fetch Markdown Content
                // Expected path: /blog/{slug}/{slug}.md or /blog/{slug}/tutorial1.md - prompt says "tutorial1.md -> Markdown content".
                // It seems the markdown filename matches the folder name OR is specific.
                // Let's assume the markdown filename is the same as the slug for consistency: /blog/{slug}/{slug}.md
                // If the prompt example is strictly /blog/tutorial1/tutorial1.md, then yes, slug.md.

                const res = await fetch(`/blog/${slug}/${slug}.md`);
                if (!res.ok) throw new Error("Markdown not found");
                const text = await res.text();
                setContent(text);

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
            <div className="pt-32 pb-20 min-h-screen flex justify-center">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !content) {
        return (
            <div className="pt-32 pb-20 min-h-screen">
                <Layout>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                        <p className="mb-8">The article you are looking for does not exist.</p>
                        <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog</Link>
                    </div>
                </Layout>
            </div>
        );
    }

    return (
        <article className="pt-32 pb-24 bg-white min-h-screen">
            <Layout className="max-w-4xl">
                <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex gap-2 mb-4">
                        {metadata?.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 text-xs font-bold text-gray-700 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {metadata?.title || slug?.replace(/-/g, ' ')}
                    </h1>

                    <div className="flex items-center justify-between border-b border-gray-100 pb-8">
                        <div className="flex items-center gap-4">
                            <img
                                src={metadata?.authorAvatar || "https://ui-avatars.com/api/?name=Luca+Facchini"}
                                alt={metadata?.author}
                                className="w-12 h-12 rounded-full border border-gray-100"
                            />
                            <div>
                                <div className="font-bold text-gray-900">{metadata?.author || "Luca Facchini"}</div>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <Calendar size={14} className="mr-1" />
                                    {metadata?.date || "Unknown Date"}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {metadata?.thumbnail && (
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-lg h-[400px]">
                        <img src={metadata.thumbnail} alt={metadata.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content */}
                <MarkdownRenderer content={content} />

            </Layout>
        </article>
    );
};

export default BlogPost;
